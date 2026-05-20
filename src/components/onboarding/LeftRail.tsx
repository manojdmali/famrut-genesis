import { motion } from "framer-motion";
import { Check, Leaf, Sparkles } from "lucide-react";
import { OnboardingState } from "./types";

interface Props {
  steps: { id: number; name: string; desc: string }[];
  current: number;
  data: OnboardingState;
}

export function LeftRail({ steps, current, data }: Props) {
  return (
    <aside className="relative hidden lg:flex lg:flex-col bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 size-80 rounded-full bg-primary-glow/15 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col p-10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Leaf className="size-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-poppins text-lg font-bold tracking-tight">Famrut</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/50">AI Agri Cloud</div>
          </div>
        </div>

        <div className="mt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/40 px-3 py-1 text-[11px] backdrop-blur">
            <Sparkles className="size-3 text-primary-glow" />
            <span>Provisioning in ~4 minutes</span>
          </div>
          <h2 className="mt-6 font-poppins text-3xl font-bold leading-tight">
            Build your <span className="text-gradient">intelligent</span><br />
            agriculture ecosystem.
          </h2>
          <p className="mt-3 text-sm text-sidebar-foreground/60 max-w-xs">
            A white-label platform for FPOs, agri-companies, banks & governments — provisioned in real time.
          </p>
        </div>

        <ol className="mt-12 space-y-1">
          {steps.map((s, i) => {
            const done = s.id < current;
            const active = s.id === current;
            return (
              <li key={s.id} className="relative pl-12 py-3">
                {i < steps.length - 1 && (
                  <div className="absolute left-[18px] top-10 h-full w-px bg-sidebar-border">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: done ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                      className="w-full bg-primary-glow"
                    />
                  </div>
                )}
                <div className={`absolute left-0 top-3 size-9 rounded-full grid place-items-center border transition-colors ${
                  done ? "bg-primary border-primary text-primary-foreground"
                  : active ? "bg-sidebar-accent border-primary-glow text-primary-glow"
                  : "bg-sidebar border-sidebar-border text-sidebar-foreground/40"
                }`}>
                  {done ? <Check className="size-4" /> : <span className="text-xs font-semibold tabular-nums">{s.id}</span>}
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-primary-glow"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                <div className={`text-sm font-medium ${active ? "text-sidebar-foreground" : done ? "text-sidebar-foreground/80" : "text-sidebar-foreground/40"}`}>
                  {s.name}
                </div>
                <div className="text-[11px] text-sidebar-foreground/40">{s.desc}</div>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/30 p-4 backdrop-blur">
            <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/50">Tenant preview</div>
            <div className="mt-1 font-mono text-sm text-primary-glow truncate">
              {(data.company.name.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourbrand")}.famrut.ai
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-sidebar-foreground/50">
              <span>{data.modules.length} modules selected</span>
              <span>Auto-saved</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
