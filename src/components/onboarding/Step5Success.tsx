import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ExternalLink, Users, Settings2, Download, Sparkles } from "lucide-react";
import { OnboardingState, ALL_MODULES } from "./types";

export function Step5Success({ data }: { data: OnboardingState }) {
  const slug = (data.company.name.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourbrand");
  const url = `https://${slug}.famrut.ai`;
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t); }, []);

  const initials = (data.company.name || "Famrut").slice(0, 2).toUpperCase();
  const enabled = ALL_MODULES.filter(m => data.modules.includes(m.id));

  return (
    <div className="relative">
      {/* Confetti-ish particles */}
      {show && [...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-2 rounded-full pointer-events-none"
          style={{
            left: `${50 + (Math.cos(i) * 35)}%`,
            top: `${20 + (Math.sin(i * 1.3) * 15)}%`,
            background: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--primary-glow)" : "var(--earth)",
          }}
          initial={{ scale: 0, y: 0, opacity: 1 }}
          animate={{ scale: [0, 1, 0.6], y: [-20, 120], opacity: [1, 1, 0] }}
          transition={{ duration: 2.4, delay: i * 0.04 }}
        />
      ))}

      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto size-20 rounded-full bg-gradient-primary grid place-items-center shadow-glow animate-pulse-glow"
        >
          <Check className="size-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary">
            <Sparkles className="size-3.5" /> Ecosystem ready
          </div>
          <h1 className="mt-3 font-poppins text-4xl sm:text-5xl font-bold tracking-tight">
            Welcome to your <span className="text-gradient">Famrut</span> ecosystem.
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Your branded agriculture platform is live and ready to onboard farmers, partners, and your team.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 rounded-2xl border border-border bg-card shadow-soft overflow-hidden"
      >
        <div className="p-6 bg-gradient-mesh">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-xl shadow-elegant">{initials}</div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Tenant</div>
              <div className="font-poppins text-xl font-bold truncate">{data.company.name || "Your Brand"}</div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-background/80 backdrop-blur border border-border px-4 py-3">
            <Globe2Mini />
            <code className="font-mono text-sm text-primary flex-1 truncate">{url}</code>
            <button
              onClick={() => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            { l: "Modules", v: enabled.length },
            { l: "Admin user", v: data.company.contact || data.company.email || "—" },
            { l: "Region", v: "ap-south-1" },
          ].map(s => (
            <div key={s.l} className="p-5">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="mt-1 text-sm font-semibold truncate">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Activated modules</div>
          <div className="flex flex-wrap gap-2">
            {enabled.map(m => (
              <span key={m.id} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium px-3 py-1">
                <Check className="size-3" /> {m.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <a href={url} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:shadow-glow hover:-translate-y-0.5">
          Launch dashboard <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-medium hover:bg-accent transition-colors">
          <Users className="size-4" /> Invite team
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-medium hover:bg-accent transition-colors">
          <Settings2 className="size-4" /> Configure more
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-medium hover:bg-accent transition-colors">
          <Download className="size-4" /> Download summary
        </button>
      </motion.div>
    </div>
  );
}

function Globe2Mini() {
  return <svg viewBox="0 0 24 24" className="size-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" strokeLinecap="round" /></svg>;
}
