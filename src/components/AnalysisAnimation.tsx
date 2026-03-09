import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Circle, Loader2 } from "lucide-react";

const analysisSteps = [
  "Analyzing symptom patterns",
  "Cross-referencing clinical guidelines",
  "Calculating risk score",
  "Evaluating urgency level",
  "Generating recommendations",
  "Preparing your report",
];

const AnalysisAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-subtle">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-elevated p-12 max-w-md w-full text-center"
      >
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            className="w-24 h-24 rounded-full"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 size={32} className="text-primary-foreground animate-spin" />
          </div>
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-primary/50"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <h2 className="text-xl font-display font-bold text-foreground mb-2">
          Triage Analysis
        </h2>
        <p className="text-sm text-muted-foreground mb-6">Processing your symptoms against clinical protocols</p>

        <div className="space-y-3 text-left">
          {analysisSteps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={i <= currentStep ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {i < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-teal flex items-center justify-center"
                >
                  <Check size={12} className="text-primary-foreground" />
                </motion.div>
              ) : i === currentStep ? (
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center"
                  animate={{ borderColor: ["hsl(var(--primary))", "hsl(var(--teal))", "hsl(var(--primary))"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Circle size={6} className="text-primary" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted" />
              )}
              <span className={`text-sm ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisAnimation;
