import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OnboardingState, initialState } from "./types";
import { LeftRail } from "./LeftRail";
import { Step1Company } from "./Step1Company";
import { Step2Brand } from "./Step2Brand";
import { Step3Modules } from "./Step3Modules";
import { Step4Generate } from "./Step4Generate";
import { Step5Success } from "./Step5Success";

const STEPS = [
  { id: 1, name: "Company", desc: "Organization details" },
  { id: 2, name: "Brand", desc: "Visual identity" },
  { id: 3, name: "Modules", desc: "Platform features" },
  { id: 4, name: "Provision", desc: "AI generation" },
  { id: 5, name: "Launch", desc: "Ecosystem ready" },
];

export function Wizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingState>(initialState);

  const next = () => setStep(s => Math.min(5, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen w-full bg-background lg:grid lg:grid-cols-[440px_1fr]">
      <LeftRail steps={STEPS} current={step} data={data} />

      <main className="relative flex min-h-screen flex-col">
        <div className="lg:hidden sticky top-0 z-30 glass border-b border-border px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground font-bold">F</div>
            <span className="font-semibold tracking-tight">Famrut</span>
          </div>
          <div className="text-xs text-muted-foreground tabular-nums">Step {step}/5</div>
        </div>

        <div className="flex-1 px-5 py-8 sm:px-10 lg:px-16 lg:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-3xl"
            >
              {step === 1 && <Step1Company data={data} setData={setData} onNext={next} />}
              {step === 2 && <Step2Brand data={data} setData={setData} onNext={next} onBack={prev} />}
              {step === 3 && <Step3Modules data={data} setData={setData} onNext={next} onBack={prev} />}
              {step === 4 && <Step4Generate onDone={next} />}
              {step === 5 && <Step5Success data={data} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
