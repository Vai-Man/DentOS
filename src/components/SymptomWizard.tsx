import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SymptomData } from "@/lib/triageEngine";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

interface SymptomWizardProps {
  onComplete: (data: SymptomData) => void;
}

const SymptomWizard = ({ onComplete }: SymptomWizardProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SymptomData>({
    painType: "",
    painSeverity: 0,
    painDuration: "",
    swelling: false,
    bleeding: false,
    toothTrauma: false,
    sensitivity: "none",
    fever: false,
    jawStiffness: false,
    recentProcedure: false,
  });

  const totalSteps = 10;

  const update = (field: keyof SymptomData, value: SymptomData[keyof SymptomData]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const next = useCallback(() => {
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else onComplete(data);
  }, [step, data, onComplete]);

  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const OptionButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <span className={`font-medium ${selected ? "text-primary" : "text-foreground"}`}>{label}</span>
    </motion.button>
  );

  const BoolButton = ({ label, value, field }: { label: string; value: boolean; field: keyof SymptomData }) => (
    <div className="flex gap-3">
      <OptionButton label="Yes" selected={value === true} onClick={() => { update(field, true); }} />
      <OptionButton label="No" selected={value === false && data[field] !== undefined} onClick={() => { update(field, false); }} />
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <QuestionCard question="What type of pain are you experiencing?" description="Select the option that best describes your dental pain.">
            {["sharp", "dull", "throbbing", "none"].map((t) => (
              <OptionButton key={t} label={t === "none" ? "No pain" : `${t.charAt(0).toUpperCase() + t.slice(1)} pain`} selected={data.painType === t} onClick={() => update("painType", t)} />
            ))}
          </QuestionCard>
        );
      case 1:
        return (
          <QuestionCard question="How severe is your pain?" description="Rate from 0 (no pain) to 10 (worst pain ever).">
            <div className="px-2">
              <input
                type="range"
                min={0}
                max={10}
                value={data.painSeverity}
                onChange={(e) => update("painSeverity", parseInt(e.target.value))}
                className="w-full accent-primary h-2 rounded-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>0 - No pain</span>
                <span className="text-2xl font-display font-bold text-primary">{data.painSeverity}</span>
                <span>10 - Severe</span>
              </div>
            </div>
          </QuestionCard>
        );
      case 2:
        return (
          <QuestionCard question="How long have you had this pain?" description="Duration helps us assess urgency.">
            {[
              { v: "less_than_24h", l: "Less than 24 hours" },
              { v: "24_48h", l: "24–48 hours" },
              { v: "more_than_48h", l: "More than 48 hours" },
              { v: "none", l: "No pain" },
            ].map((o) => (
              <OptionButton key={o.v} label={o.l} selected={data.painDuration === o.v} onClick={() => update("painDuration", o.v)} />
            ))}
          </QuestionCard>
        );
      case 3:
        return (
          <QuestionCard question="Do you have any swelling?" description="Swelling in the face, jaw, or gums.">
            <BoolButton label="Swelling" value={data.swelling} field="swelling" />
          </QuestionCard>
        );
      case 4:
        return (
          <QuestionCard question="Is there any bleeding?" description="Bleeding from gums, tooth socket, or mouth.">
            <BoolButton label="Bleeding" value={data.bleeding} field="bleeding" />
          </QuestionCard>
        );
      case 5:
        return (
          <QuestionCard question="Have you experienced tooth trauma?" description="E.g., knocked out tooth, cracked/broken tooth, injury to mouth.">
            <BoolButton label="Trauma" value={data.toothTrauma} field="toothTrauma" />
          </QuestionCard>
        );
      case 6:
        return (
          <QuestionCard question="Do you have tooth sensitivity?" description="Sensitivity to hot, cold, or sweet foods/drinks.">
            {["none", "mild", "moderate", "severe"].map((s) => (
              <OptionButton key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} selected={data.sensitivity === s} onClick={() => update("sensitivity", s)} />
            ))}
          </QuestionCard>
        );
      case 7:
        return (
          <QuestionCard question="Do you have a fever?" description="Body temperature above 100.4°F (38°C).">
            <BoolButton label="Fever" value={data.fever} field="fever" />
          </QuestionCard>
        );
      case 8:
        return (
          <QuestionCard question="Do you have jaw stiffness?" description="Difficulty opening mouth or jaw locking.">
            <BoolButton label="Jaw stiffness" value={data.jawStiffness} field="jawStiffness" />
          </QuestionCard>
        );
      case 9:
        return (
          <QuestionCard question="Have you had a recent dental procedure?" description="Any dental work in the past 2 weeks.">
            <BoolButton label="Recent procedure" value={data.recentProcedure} field="recentProcedure" />
          </QuestionCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg-subtle flex flex-col">
      <div className="container max-w-2xl mx-auto px-4 py-8 flex-1 flex flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <ProgressBar current={step + 1} total={totalSteps} />
        </motion.div>

        <div className="flex-1 flex items-center">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <div key={step}>{renderStep()}</div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prev}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium disabled:opacity-30 transition-all hover:border-primary/30"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={next}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-primary-foreground transition-all"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}
          >
            {step === totalSteps - 1 ? "Analyze Symptoms" : "Next"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SymptomWizard;
