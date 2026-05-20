import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Cpu, Database, Cloud, Shield, Globe, Sparkles, Boxes, Workflow, Zap } from "lucide-react";

const TASKS = [
  { id: "brand", label: "Brand configuration", icon: Sparkles, lines: ["→ tokens.css → 142 vars synced", "→ assets cdn-pushed"] },
  { id: "tenant", label: "Tenant workspace created", icon: Boxes, lines: ["→ tenant_id: tn_8f24kx", "→ namespace allocated"] },
  { id: "db", label: "Database provisioning", icon: Database, lines: ["→ postgres-15 region: ap-south-1", "→ replicas: 2 · RLS enabled"] },
  { id: "ai", label: "AI services initialization", icon: Cpu, lines: ["→ vector store ready · 1536d", "→ multilingual NLU loaded (12)"] },
  { id: "modules", label: "Module deployment", icon: Workflow, lines: ["→ k8s apply 8 services", "→ rolling update: 100%"] },
  { id: "infra", label: "Cloud infrastructure setup", icon: Cloud, lines: ["→ edge nodes: 14 regions", "→ autoscale 2→20 pods"] },
  { id: "sec", label: "Security configuration", icon: Shield, lines: ["→ TLS 1.3 · HSTS preload", "→ SOC2 controls applied"] },
  { id: "domain", label: "Domain mapping", icon: Globe, lines: ["→ CNAME *.famrut.ai", "→ cert issued · auto-renew"] },
  { id: "opt", label: "Final optimization", icon: Zap, lines: ["→ cache warmed · 98ms TTFB", "→ ready for traffic"] },
];

export function Step4Generate({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{ t: string; msg: string; type: "info" | "ok" }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idx >= TASKS.length) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const task = TASKS[idx];
    const stamp = () => new Date().toLocaleTimeString([], { hour12: false });
    setLogs(l => [...l, { t: stamp(), msg: `▸ ${task.label}...`, type: "info" }]);
    task.lines.forEach((line, i) => {
      setTimeout(() => setLogs(l => [...l, { t: stamp(), msg: line, type: "info" }]), 250 + i * 300);
    });
    const dur = 1100 + Math.random() * 700;
    const start = Date.now();
    const startProg = progress;
    const target = Math.round(((idx + 1) / TASKS.length) * 100);
    const tick = setInterval(() => {
      const k = Math.min(1, (Date.now() - start) / dur);
      setProgress(Math.round(startProg + (target - startProg) * k));
      if (k >= 1) {
        clearInterval(tick);
        setLogs(l => [...l, { t: stamp(), msg: `✓ ${task.label} complete`, type: "ok" }]);
        setIdx(i => i + 1);
      }
    }, 50);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  return (
    <div className="relative -mx-5 sm:-mx-10 lg:-mx-16 -my-8 lg:-my-14 min-h-screen lg:min-h-[calc(100vh)] bg-gradient-dark text-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-1 rounded-full bg-primary-glow/60"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative z-10 px-5 sm:px-10 lg:px-16 py-12 lg:py-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/50">
          <span className="size-1.5 rounded-full bg-primary-glow animate-pulse" />
          Step 4 of 5 · Provisioning
        </div>
        <h1 className="mt-3 font-poppins text-3xl sm:text-5xl font-bold tracking-tight">
          Your platform is being <span className="text-gradient">created</span>.
        </h1>
        <p className="mt-3 text-white/60 max-w-xl">Please wait while we configure your intelligent agriculture ecosystem across the global edge.</p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/50">Overall progress</div>
              <div className="font-poppins text-5xl font-bold tabular-nums mt-1">
                {progress}<span className="text-2xl text-white/40">%</span>
              </div>
            </div>
            <div className="text-right text-xs text-white/60">
              <div className="font-mono">tn_8f24kx</div>
              <div className="mt-1">ap-south-1 · edge</div>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ width: `${progress}%`, backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ width: { duration: 0.3 }, backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" } }}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="text-[11px] uppercase tracking-wider text-white/50 mb-4">Pipeline</div>
            <ul className="space-y-1">
              {TASKS.map((t, i) => {
                const done = i < idx;
                const active = i === idx;
                const pending = i > idx;
                const Icon = t.icon;
                return (
                  <li key={t.id} className="flex items-center gap-3 py-2">
                    <div className={`size-8 rounded-lg grid place-items-center transition-colors ${
                      done ? "bg-primary/20 text-primary-glow" : active ? "bg-primary-glow/20 text-primary-glow" : "bg-white/5 text-white/30"
                    }`}>
                      {done ? <Check className="size-4" /> : active ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4" />}
                    </div>
                    <div className={`flex-1 text-sm ${done ? "text-white/80" : active ? "text-white" : "text-white/40"}`}>{t.label}</div>
                    {active && <span className="text-[10px] font-mono text-primary-glow">running…</span>}
                    {done && <span className="text-[10px] font-mono text-white/40">done</span>}
                    {pending && <span className="text-[10px] font-mono text-white/30">queued</span>}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="text-[11px] font-mono text-white/50">deploy.famrut.ai</div>
              <div className="text-[11px] font-mono text-primary-glow">● live</div>
            </div>
            <div ref={logRef} className="h-[280px] overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed">
              <AnimatePresence initial={false}>
                {logs.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${l.type === "ok" ? "text-primary-glow" : "text-white/70"}`}
                  >
                    <span className="text-white/30 shrink-0">{l.t}</span>
                    <span className="whitespace-pre-wrap">{l.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {idx < TASKS.length && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-primary-glow">▎</motion.span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-white/40">
          Tip: you can safely keep this tab open · estimated completion in under a minute
        </div>
      </div>
    </div>
  );
}
