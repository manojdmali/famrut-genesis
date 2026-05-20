import { useState } from "react";
import { ArrowRight, Building2, Mail, Phone, User, MapPin, Globe2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { OnboardingState, OrgType } from "./types";
import { FloatField } from "./FloatField";

const ORG_TYPES: { id: OrgType; icon: string; desc: string }[] = [
  { id: "FPO", icon: "🌾", desc: "Farmer Producer Org" },
  { id: "Agri Startup", icon: "🚀", desc: "Agri-tech company" },
  { id: "Government", icon: "🏛️", desc: "Public agency" },
  { id: "Cooperative", icon: "🤝", desc: "Member-owned" },
  { id: "Bank/NBFC", icon: "🏦", desc: "Financial inst." },
  { id: "Enterprise", icon: "🏢", desc: "Large corporate" },
];

interface Props { data: OnboardingState; setData: (s: OnboardingState) => void; onNext: () => void }

export function Step1Company({ data, setData, onNext }: Props) {
  const [saved, setSaved] = useState(false);
  const c = data.company;
  const update = (k: keyof typeof c, v: string) => {
    setData({ ...data, company: { ...c, [k]: v } });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };
  const valid = c.name && c.type && c.email && c.contact;

  return (
    <div>
      <Header step={1} title="Let's build your agriculture ecosystem" sub="Start by setting up your organization details. We'll auto-save as you go." saved={saved} />

      <div className="mt-10 space-y-8">
        <section>
          <Legend>Organization type</Legend>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ORG_TYPES.map((t, i) => (
              <motion.button
                key={t.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => update("type", t.id)}
                className={`group relative text-left rounded-xl border p-4 transition-all ${
                  c.type === t.id
                    ? "border-primary bg-primary/5 shadow-elegant"
                    : "border-border bg-card hover:border-foreground/20 hover:-translate-y-0.5"
                }`}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-medium text-sm">{t.id}</div>
                <div className="text-[11px] text-muted-foreground">{t.desc}</div>
                {c.type === t.id && (
                  <motion.div layoutId="org-pick" className="absolute top-3 right-3 size-5 rounded-full bg-primary grid place-items-center">
                    <svg viewBox="0 0 24 24" className="size-3 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <Legend>Company details</Legend>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatField label="Company name" icon={<Building2 className="size-4" />} value={c.name} onChange={(e) => update("name", e.target.value)} />
            <FloatField label="Contact person" icon={<User className="size-4" />} value={c.contact} onChange={(e) => update("contact", e.target.value)} />
            <FloatField label="Email address" type="email" icon={<Mail className="size-4" />} value={c.email} onChange={(e) => update("email", e.target.value)} />
            <FloatField label="Phone number" icon={<Phone className="size-4" />} value={c.phone} onChange={(e) => update("phone", e.target.value)} />
            <FloatField label="Country" icon={<Globe2 className="size-4" />} value={c.country} onChange={(e) => update("country", e.target.value)} />
            <FloatField label="State / Region" icon={<MapPin className="size-4" />} value={c.state} onChange={(e) => update("state", e.target.value)} />
            <div className="sm:col-span-2">
              <FloatField as="textarea" label="Company address" value={c.address} onChange={(e) => update("address", e.target.value)} />
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Sparkles className="size-3.5 text-primary" />
            AI will suggest defaults based on your organization type.
          </div>
          <PrimaryCTA disabled={!valid} onClick={onNext}>Continue setup</PrimaryCTA>
        </div>
      </div>
    </div>
  );
}

export function Header({ step, title, sub, saved }: { step: number; title: string; sub: string; saved?: boolean }) {
  return (
    <header>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Step {step} of 5
        </div>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] text-primary">Auto-saved ✓</motion.div>
        )}
      </div>
      <h1 className="mt-3 font-poppins text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground max-w-xl">{sub}</p>
    </header>
  );
}

export function Legend({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">{children}</div>;
}

export function PrimaryCTA({ children, onClick, disabled, icon = true }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; icon?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-elegant disabled:cursor-not-allowed"
    >
      {children}
      {icon && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}

export function SecondaryCTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent">
      {children}
    </button>
  );
}
