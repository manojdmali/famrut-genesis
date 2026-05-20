import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { OnboardingState, CATEGORIES, ALL_MODULES } from "./types";
import { Header, Legend, PrimaryCTA, SecondaryCTA } from "./Step1Company";

interface Props { data: OnboardingState; setData: (s: OnboardingState) => void; onNext: () => void; onBack: () => void }

export function Step3Modules({ data, setData, onNext, onBack }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>(Object.fromEntries(CATEGORIES.map(c => [c.id, true])));
  const toggle = (id: string) => {
    const m = data.modules.includes(id) ? data.modules.filter(x => x !== id) : [...data.modules, id];
    setData({ ...data, modules: m });
  };
  const total = ALL_MODULES.filter(m => data.modules.includes(m.id)).reduce((s, m) => s + m.price, 0);

  return (
    <div className="pb-32">
      <Header step={3} title="Choose your platform modules" sub="Enable only what you need — add more anytime from the admin console." />

      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="size-3.5 text-primary" />
        AI-recommended modules based on your organization type are pre-selected.
      </div>

      <div className="mt-8 space-y-4">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button onClick={() => setOpen({ ...open, [cat.id]: !open[cat.id] })} className="w-full flex items-center justify-between p-5 hover:bg-accent/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 grid place-items-center text-xl">{cat.icon}</div>
                <div className="text-left">
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.modules.filter(m => data.modules.includes(m.id)).length} of {cat.modules.length} enabled</div>
                </div>
              </div>
              <ChevronDown className={`size-5 text-muted-foreground transition-transform ${open[cat.id] ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open[cat.id] && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5 pt-0">
                    {cat.modules.map(m => {
                      const on = data.modules.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          onClick={() => toggle(m.id)}
                          className={`group relative text-left rounded-xl border p-4 transition-all ${
                            on ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-foreground/20 hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-sm">{m.name}</div>
                                {m.recommended && <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gradient-primary text-primary-foreground font-medium">AI pick</span>}
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">{m.description}</p>
                              <div className="mt-2 text-[11px] font-mono text-foreground/70">${m.price}/mo</div>
                            </div>
                            <div className={`shrink-0 size-6 rounded-md border-2 grid place-items-center transition-all ${
                              on ? "bg-primary border-primary scale-110" : "border-border bg-card"
                            }`}>
                              {on && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="size-3.5 text-primary-foreground" /></motion.div>}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-[440px] z-40 glass border-t border-border">
        <div className="mx-auto max-w-3xl px-5 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Modules</div>
              <div className="text-lg font-bold tabular-nums">{data.modules.length}</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Est. monthly</div>
              <div className="text-lg font-bold tabular-nums text-gradient">${total}<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SecondaryCTA onClick={onBack}>Back</SecondaryCTA>
            <PrimaryCTA onClick={onNext}>Generate my platform</PrimaryCTA>
          </div>
        </div>
      </div>
    </div>
  );
}
