// /api/lead.js — runs on Vercel as a serverless function
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, business, niche, source } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Forward to Zapier Catch Hook (server-to-server = no CORS)
    const zapUrl = process.env.ZAPIER_HOOK_URL;
    if (!zapUrl) {
      return res.status(500).json({ error: "Missing ZAPIER_HOOK_URL env var" });
    }

    const r = await fetch(zapUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, business, niche, source })
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
