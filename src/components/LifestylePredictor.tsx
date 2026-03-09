import { useState } from "react";
import { motion } from "framer-motion";
import { LifestyleData, calculateLifestyleScore, LifestyleResult } from "@/lib/triageEngine";
import QuestionCard from "./QuestionCard";
import RiskGauge from "./RiskGauge";
import { AlertTriangle, Lightbulb, ArrowLeft, ArrowRight, Check } from "lucide-react";

interface LifestylePredictorProps {
  onBack: () => void;
}

const LifestylePredictor = ({ onBack }: LifestylePredictorProps) => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<LifestyleResult | null>(null);
  const [data, setData] = useState<LifestyleData>({
    brushingFrequency: "",
    sugarIntake: "",
    flossing: "",
    lastDentalVisit: "",
  });

  const update = (field: keyof LifestyleData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const OptionButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
        selected ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <span className={`font-medium ${selected ? "text-primary" : "text-foreground"}`}>{label}</span>
    </motion.button>
  );

  const handleSubmit = () => {
    setResult(calculateLifestyleScore(data));
  };

  if (result) {
    const scoreColor = result.toothHealthScore >= 70 ? "routine" : result.toothHealthScore >= 40 ? "urgent" : "emergency";
    return (
      <div className="min-h-screen gradient-bg-subtle py-8 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container max-w-3xl mx-auto space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Tooth Health Score</h1>
            <p className="text-muted-foreground">Based on your lifestyle factors</p>
          </div>

          <div className="glass-card-elevated p-8 flex flex-col items-center">
            <RiskGauge score={result.toothHealthScore} />
            <span className={`badge-${scoreColor} mt-4 text-lg`}>
              {result.toothHealthScore >= 70 ? "Good" : result.toothHealthScore >= 40 ? "Moderate Risk" : "High Risk"}
            </span>
          </div>

          {result.riskFactors.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-urgent" />
                Risk Factors
              </h3>
              <ul className="space-y-2">
                {result.riskFactors.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-urgent mt-2 flex-shrink-0" />
                    <span className="text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-teal" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-teal mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-center pb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border text-foreground hover:border-primary/30"
            >
              <ArrowLeft size={16} />
              Back to Results
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const steps = [
    <QuestionCard key="brush" question="How often do you brush your teeth?">
      {[
        { v: "twice", l: "Twice daily" },
        { v: "once", l: "Once daily" },
        { v: "rarely", l: "Rarely / Irregularly" },
      ].map((o) => (
        <OptionButton key={o.v} label={o.l} selected={data.brushingFrequency === o.v} onClick={() => update("brushingFrequency", o.v)} />
      ))}
    </QuestionCard>,
    <QuestionCard key="sugar" question="How would you describe your sugar intake?">
      {[
        { v: "low", l: "Low – Minimal sweets & sugary drinks" },
        { v: "moderate", l: "Moderate – Some sweets daily" },
        { v: "high", l: "High – Frequent sugary foods & drinks" },
      ].map((o) => (
        <OptionButton key={o.v} label={o.l} selected={data.sugarIntake === o.v} onClick={() => update("sugarIntake", o.v)} />
      ))}
    </QuestionCard>,
    <QuestionCard key="floss" question="How often do you floss?">
      {[
        { v: "daily", l: "Daily" },
        { v: "sometimes", l: "Sometimes" },
        { v: "never", l: "Never" },
      ].map((o) => (
        <OptionButton key={o.v} label={o.l} selected={data.flossing === o.v} onClick={() => update("flossing", o.v)} />
      ))}
    </QuestionCard>,
    <QuestionCard key="visit" question="When was your last dental visit?">
      {[
        { v: "less_than_6_months", l: "Less than 6 months ago" },
        { v: "6_12_months", l: "6–12 months ago" },
        { v: "1_2_years", l: "1–2 years ago" },
        { v: "more_than_2_years", l: "More than 2 years ago" },
      ].map((o) => (
        <OptionButton key={o.v} label={o.l} selected={data.lastDentalVisit === o.v} onClick={() => update("lastDentalVisit", o.v)} />
      ))}
    </QuestionCard>,
  ];

  return (
    <div className="min-h-screen gradient-bg-subtle flex flex-col">
      <div className="container max-w-2xl mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
            <span>Question {step + 1} of {steps.length}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--teal)))" }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full">{steps[step]}</div>
        </div>

        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (step > 0 ? setStep(step - 1) : onBack())}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (step < steps.length - 1 ? setStep(step + 1) : handleSubmit())}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-primary-foreground"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}
          >
            {step === steps.length - 1 ? "Calculate Score" : "Next"}
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LifestylePredictor;
