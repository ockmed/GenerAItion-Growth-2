import React, { useState } from "react";

/* ---------- Inline icons (no external deps) ---------- */
const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l2.2 4.8L19 9l-4.8 2.2L12 16l-2.2-4.8L5 9l4.8-2.2L12 2zM4 18l1.1 2.4L8 21l-2.4 1.1L4 24l-1.1-2.4L0 21l2.4-1.1L4 18zm16 0l1.1 2.4L24 21l-2.4 1.1L20 24l-1.1-2.4L16 21l2.4-1.1L20 18z"/>
  </svg>
);
const Bolt = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"/>
  </svg>
);
const Shield = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l8 4v6c0 5-3.4 9.7-8 10-4.6-.3-8-5-8-10V6l8-4z"/>
  </svg>
);
const Chart = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 3h2v18H3V3zm16 8h2v10h-2V11zM11 7h2v14h-2V7z"/>
  </svg>
);
const Star = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
  </svg>
);
const Message = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4 4h16v12H7l-3 3V4z"/>
  </svg>
);
const Check = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z"/>
  </svg>
);

/* ---------------------- Helpers ---------------------- */
const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80 backdrop-blur">
    {children}
  </span>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
    <div className="mb-10">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-white/70 leading-relaxed">{subtitle}</p>
      )}
    </div>
    {children}
  </section>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-white/10 p-3 text-white">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="mt-3 text-sm text-white/70 leading-relaxed">{desc}</p>
  </div>
);

const PriceCard = ({ name, price, features, highlight }) => (
  <div
    className={`relative rounded-2xl border ${
      highlight ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5"
    } p-6`}
  >
    {highlight && (
      <div className="absolute -top-3 right-4 rounded-full bg-teal-400 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
        Best Value
      </div>
    )}
    <h4 className="text-xl font-semibold text-white">{name}</h4>
    <div className="mt-3 flex items-end gap-1">
      <span className="text-4xl font-extrabold text-white">${price}</span>
      <span className="text-white/60">/month</span>
    </div>
    <ul className="mt-5 space-y-2 text-sm">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-white/80">
          <Check className="mt-0.5 h-5 w-5" /> {f}
        </li>
      ))}
    </ul>
    <a
      href="#contact"
      className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-teal-400 px-4 py-3 font-semibold text-slate-900 transition hover:opacity-90"
    >
      Get Started
    </a>
  </div>
);

/* ----------------------- App ------------------------ */
export default function App() {
  const [brand] = useState("NextGen Growth");

  const handleBook = () => window.open("https://calendly.com/nextgengrowth1/30min", "_blank");


  const handleAudit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const payload = {
    name: data.get("name"),
    email: data.get("email"),
    business: data.get("business"),
    niche: data.get("niche"),
    // capture the page URL for attribution
    source: window.location.href
  };

  try {
    const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      window.gtag && window.gtag("event", "generate_lead", { method: "formspree" });
      alert("Thanks! We’ll reach out within 24 hours.");
      e.currentTarget.reset();
    } else {
      alert("Hmm, couldn’t send. Try again or email us directly.");
    }
  } catch {
    alert("Network error — please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkle className="h-6 w-6 text-teal-300" />
            <span className="font-bold tracking-tight">{brand}</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex text-sm text-white/80">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#case-studies" className="hover:text-white">Results</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <button
              onClick={handleBook}
              className="rounded-xl bg-teal-400 px-4 py-2 font-semibold text-slate-900 hover:opacity-90"
            >
              Book Audit
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(45,212,191,0.25),transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <Pill>
              <Sparkle className="h-4 w-4" /> AI Marketing for Local Businesses
            </Pill>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              Turn traffic into customers — on autopilot
            </h1>
            <p className="mt-4 max-w-xl text-white/80 leading-relaxed">
              We combine intelligent automations with human strategy to grow bookings, reviews, and revenue for restaurants, gyms, salons, auto shops, and more.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={handleBook}
                className="rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-900 hover:opacity-90"
              >
                Book Free AI Audit
              </button>
              <a
                href="#features"
                className="rounded-xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/10"
              >
                See How It Works
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" /> 4.9/5 Avg. Client Rating
              </div>
              <div className="flex items-center gap-2">
                <Chart className="h-4 w-4" /> +38% Avg. Monthly Leads
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <div className="mb-4 flex items-center justify-between text-xs text-white/60">
                  <span>Live Demo — AI Chat Inbox</span>
                  <span>Auto-Reply: ON</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="rounded-lg bg-white/10 p-2">
                      <Message className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3 text-sm">
                      Do you have openings for a full detail this Friday at 2pm?
                    </div>
                  </div>
                  <div className="ml-10 rounded-2xl bg-teal-400/20 p-3 text-sm">
                    Our AI: We have 2pm and 3:30pm available Friday. Would you like me to book 2pm under your name?
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-lg bg-white/10 p-2">
                      <Message className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3 text-sm">
                      Yes, 2pm works — name is Taylor.
                    </div>
                  </div>
                  <div className="ml-10 rounded-2xl bg-teal-400/20 p-3 text-sm">
                    Booked! You’ll receive a confirmation email/text. See you Friday at 2pm.
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-white/70">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-bold">+27%</div>Bookings
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-bold">+41%</div>Reviews
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-bold">-32%</div>Response Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <Section
        id="features"
        title="Everything local businesses need to grow"
        subtitle="We bundle proven tools and automations into one simple plan—so owners can focus on serving customers."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Sparkle className="h-6 w-6" />}
            title="AI Content Studio"
            desc="Done-for-you posts, captions, and promos tailored to your niche. 20–30 assets/mo scheduled across platforms."
          />
          <FeatureCard
            icon={<Message className="h-6 w-6" />}
            title="24/7 Chat & DM Automation"
            desc="Capture leads from web chat, Instagram, and SMS. Auto-answers FAQs and books appointments."
          />
          <FeatureCard
            icon={<Star className="h-6 w-6" />}
            title="Review Engine"
            desc="Automated review requests post-visit + smart replies that boost your Google ranking."
          />
          <FeatureCard
            icon={<Chart className="h-6 w-6" />}
            title="Reports that matter"
            desc="Traffic, leads, and revenue insights with simple action steps—no fluff dashboards."
          />
          <FeatureCard
            icon={<Bolt className="h-6 w-6" />}
            title="Promo Campaigns"
            desc="AI drafts monthly offers and email/SMS blasts; you approve and we launch."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="White-glove Setup"
            desc="We connect your listings, pages, and inboxes in week one. Cancel anytime."
          />
        </div>
      </Section>

      {/* NICHE STRIPES */}
      <div className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4 text-xs text-white/70">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">Restaurants</div>
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">Gyms & Studios</div>
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">Auto Services</div>
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">Salons & Spas</div>
        </div>
      </div>

      {/* PRICING */}
      <Section id="pricing" title="Simple pricing" subtitle="Start small, scale as you grow. No contracts.">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PriceCard
            name="Starter"
            price="500"
            features={["12–16 social posts/mo", "Review request automation", "Monthly promo email", "Basic analytics report"]}
          />
          <PriceCard
            name="Growth"
            price="1000"
            highlight
            features={[
              "Everything in Starter",
              "24/7 chat/DM bot",
              "2 promo campaigns/mo",
              "Lead capture + CRM setup",
              "Advanced report w/ insights",
            ]}
          />
          <PriceCard
            name="Premium"
            price="1500"
            features={[
              "Everything in Growth",
              "Ad management (FB/IG/Google)",
              "A/B creative testing",
              "Quarterly strategy workshop",
            ]}
          />
        </div>
        <p className="mt-6 text-sm text-white/60">Custom plans for multi-location brands available.</p>
      </Section>

      {/* CASE STUDIES */}
      <Section
        id="case-studies"
        title="Sample results"
        subtitle="Illustrative outcomes from our playbooks—yours may vary, but the system is consistent."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Auto Detailer", "Pilates Studio", "Neighborhood Bistro"].map((name, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/60">{name}</div>
              <div className="mt-2 text-2xl font-extrabold">+{[36, 42, 28][i]}% Leads</div>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <Check className="h-5 w-5" /> 24/7 booking bot reduced response time
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5" /> Review engine lifted Google rating
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5" /> Monthly promo calendar drove repeat visits
                </li>
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        title="Book your free AI Marketing Audit"
        subtitle="We’ll identify quick wins in under 20 minutes—no pressure, no jargon."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <form onSubmit={handleAudit} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-white/70">Name</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder="Taylor Smith"
                />
              </div>
              <div>
                <label className="text-xs text-white/70">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder="taylor@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-white/70">Business</label>
                <input
                  name="business"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder="Shine Auto Detail"
                />
              </div>
              <div>
                <label className="text-xs text-white/70">Niche</label>
                <input
                  name="niche"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder="Auto / Restaurant / Gym..."
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-teal-400 px-4 py-3 font-semibold text-slate-900 hover:opacity-90"
            >
              Request Audit via Email
            </button>
            <p className="mt-3 text-xs text-white/60">
              Prefer a calendar?{" "}
              <button type="button" onClick={handleBook} className="underline">
                Pick a time
              </button>
              .
            </p>
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h4 className="text-lg font-semibold">What happens on the audit?</h4>
            <ul className="mt-3 space-y-3 text-sm text-white/80">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5" /> Quick scan of your Google profile & socials
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5" /> Identify 3 fast wins for next 30 days
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5" /> Show an AI bot booking a real appointment
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-white/70">
              <div className="font-semibold text-white">Pro Tip</div>
              Swap the <code>hello@yourdomain.com</code> in the form handler for your business email, or route to Formspree/Zapier for CRM capture.
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="flex items-center gap-2 text-white/70">
            <Sparkle className="h-5 w-5 text-teal-300" /> {brand} © {new Date().getFullYear()}
          </div>
          <div className="text-xs text-white/60">Built with intelligent automations + human strategy</div>
        </div>
      </footer>
    </div>
  );
}
