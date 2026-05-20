import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Sun, Moon } from "lucide-react";
import { OnboardingState } from "./types";
import { Header, Legend, PrimaryCTA, SecondaryCTA } from "./Step1Company";

const PRESETS = [
  { p: "#2E7D32", a: "#4CAF50", name: "Forest" },
  { p: "#0F766E", a: "#14B8A6", name: "Teal" },
  { p: "#1E40AF", a: "#3B82F6", name: "Indigo" },
  { p: "#A1887F", a: "#D7A86E", name: "Earth" },
  { p: "#7C2D12", a: "#EA580C", name: "Harvest" },
  { p: "#581C87", a: "#A855F7", name: "Royal" },
];

const FONTS = ["Inter", "Poppins", "DM Sans", "Plus Jakarta"];

interface Props { data: OnboardingState; setData: (s: OnboardingState) => void; onNext: () => void; onBack: () => void }

export function Step2Brand({ data, setData, onNext, onBack }: Props) {
  const b = data.brand;
  const set = (patch: Partial<typeof b>) => setData({ ...data, brand: { ...b, ...patch } });
  const initials = (data.company.name || "Famrut").slice(0, 2).toUpperCase();

  return (
    <div>
      <Header step={2} title="Customize your brand experience" sub="Make the platform look unmistakably like your organization." />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <Legend>Logos</Legend>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { label: "Light logo", id: "logo" },
                { label: "Dark logo", id: "darkLogo" },
                { label: "Favicon", id: "favicon" },
              ].map(l => (
                <label key={l.id} className="group cursor-pointer rounded-xl border border-dashed border-border bg-card aspect-square grid place-items-center p-3 text-center transition-colors hover:border-primary hover:bg-primary/5">
                  <input type="file" className="hidden" onChange={(e) => set({ logoName: e.target.files?.[0]?.name || b.logoName })} />
                  <Upload className="size-5 text-muted-foreground group-hover:text-primary mb-1.5" />
                  <div className="text-[11px] font-medium text-foreground">{l.label}</div>
                  <div className="text-[10px] text-muted-foreground">PNG · SVG</div>
                </label>
              ))}
            </div>
            {b.logoName && <div className="mt-2 text-[11px] text-primary">Uploaded: {b.logoName}</div>}
          </section>

          <section>
            <Legend>Brand color</Legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {PRESETS.map(pr => (
                <button
                  key={pr.name}
                  onClick={() => set({ primary: pr.p, accent: pr.a })}
                  className={`group relative rounded-xl border p-2 text-left transition-all ${
                    b.primary === pr.p ? "border-foreground shadow-soft" : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div className="flex gap-1">
                    <div className="h-10 flex-1 rounded-lg" style={{ background: pr.p }} />
                    <div className="h-10 flex-1 rounded-lg" style={{ background: pr.a }} />
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium">{pr.name}</div>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                Custom
                <input type="color" value={b.primary} onChange={(e) => set({ primary: e.target.value })} className="size-8 rounded cursor-pointer border border-border" />
              </label>
              <code className="text-xs font-mono px-2 py-1 rounded bg-muted text-foreground">{b.primary}</code>
            </div>
          </section>

          <section>
            <Legend>Typography</Legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {FONTS.map(f => (
                <button
                  key={f}
                  onClick={() => set({ font: f })}
                  style={{ fontFamily: f }}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    b.font === f ? "border-primary bg-primary/5" : "border-border hover:border-foreground/20"
                  }`}
                >
                  <div className="text-base font-semibold">{f}</div>
                  <div className="text-[11px] text-muted-foreground">The quick brown fox</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <Legend>Appearance</Legend>
            <div className="mt-3 inline-flex rounded-xl border border-border bg-card p-1">
              {(["light", "dark"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => set({ mode: m })}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    b.mode === m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  {m === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-3">
          <Legend>Live preview</Legend>
          <motion.div
            key={b.mode + b.primary + b.font}
            initial={{ opacity: 0.6, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-3 rounded-2xl border border-border overflow-hidden shadow-soft"
            style={{ background: b.mode === "dark" ? "#0F172A" : "#F8FAF7", fontFamily: b.font }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: b.mode === "dark" ? "#1e293b" : "#e2e8f0" }}>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg grid place-items-center text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${b.primary}, ${b.accent})` }}>{initials[0]}</div>
                <div className="font-semibold text-sm" style={{ color: b.mode === "dark" ? "#fff" : "#0F172A" }}>{data.company.name || "Your Brand"}</div>
              </div>
              <div className="flex items-center gap-3 text-[11px]" style={{ color: b.mode === "dark" ? "#94a3b8" : "#64748b" }}>
                <span>Dashboard</span><span>Farmers</span><span>Market</span>
                <span className="rounded-md px-2.5 py-1 text-white" style={{ background: b.primary }}>Action</span>
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] min-h-[280px]">
              <div className="border-r p-3 space-y-1" style={{ borderColor: b.mode === "dark" ? "#1e293b" : "#e2e8f0" }}>
                {["Overview", "Farmers", "Advisory", "Market", "Reports"].map((n, i) => (
                  <div key={n} className="px-3 py-2 rounded-lg text-xs" style={{
                    background: i === 0 ? `${b.primary}1a` : "transparent",
                    color: i === 0 ? b.primary : (b.mode === "dark" ? "#94a3b8" : "#64748b"),
                    fontWeight: i === 0 ? 600 : 400,
                  }}>{n}</div>
                ))}
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider" style={{ color: b.mode === "dark" ? "#94a3b8" : "#64748b" }}>Welcome back</div>
                <div className="text-2xl font-bold mt-1" style={{ color: b.mode === "dark" ? "#fff" : "#0F172A", fontFamily: b.font }}>
                  {data.company.contact?.split(" ")[0] || "Admin"} 👋
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[{ l: "Farmers", v: "12,480" }, { l: "Active crops", v: "34" }, { l: "Revenue", v: "₹4.2L" }].map(s => (
                    <div key={s.l} className="rounded-xl p-3 border" style={{ borderColor: b.mode === "dark" ? "#1e293b" : "#e2e8f0", background: b.mode === "dark" ? "#1e293b" : "#fff" }}>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: b.mode === "dark" ? "#94a3b8" : "#64748b" }}>{s.l}</div>
                      <div className="mt-1 text-lg font-bold" style={{ color: b.mode === "dark" ? "#fff" : "#0F172A" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl p-4" style={{ background: `linear-gradient(135deg, ${b.primary}, ${b.accent})` }}>
                  <div className="text-xs text-white/80">AI insight</div>
                  <div className="text-sm text-white font-medium mt-0.5">Recommend wheat sowing in 12 districts this week.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <SecondaryCTA onClick={onBack}>Back</SecondaryCTA>
        <PrimaryCTA onClick={onNext}>Continue to modules</PrimaryCTA>
      </div>
    </div>
  );
}
