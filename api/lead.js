// api/lead.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Parse body safely (handles both JSON and form-encoded)
    let body = {};
    const ct = (req.headers["content-type"] || "").toLowerCase();

    if (ct.includes("application/json")) {
      body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    } else {
      // Read raw body stream and try to parse
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      try {
        body = JSON.parse(raw || "{}");
      } catch {
        // Fallback: treat as form data (name=value&...)
        body = Object.fromEntries(new URLSearchParams(raw));
      }
    }

    const { name, email, business, niche, source } = body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields: name, email" });
    }

    const zapUrl = process.env.ZAPIER_HOOK_URL;
    if (!zapUrl) {
      return res.status(500).json({ error: "Missing ZAPIER_HOOK_URL env var" });
    }

    // Forward to Zapier (server-to-server, no CORS)
    const r = await fetch(zapUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, business, niche, source }),
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: "Zapier error", detail: txt });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: err?.message });
  }
}
