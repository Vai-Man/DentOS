import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LandingPage from "@/components/LandingPage";
import SymptomWizard from "@/components/SymptomWizard";
import AnalysisAnimation from "@/components/AnalysisAnimation";
import ResultsDashboard from "@/components/ResultsDashboard";
import LifestylePredictor from "@/components/LifestylePredictor";
import { SymptomData, TriageResult, triageSymptoms } from "@/lib/triageEngine";

type Screen = "landing" | "wizard" | "analyzing" | "results" | "lifestyle";

const Triage = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("landing");
  const [symptoms, setSymptoms] = useState<SymptomData | null>(null);
  const [result, setResult] = useState<TriageResult | null>(null);

  const handleWizardComplete = useCallback((data: SymptomData) => {
    setSymptoms(data);
    setScreen("analyzing");
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    if (symptoms) {
      setResult(triageSymptoms(symptoms));
      setScreen("results");
    }
  }, [symptoms]);

  return (
    <div className="triage-root dark">
      {/* Back to DentOS button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card/80 backdrop-blur-sm text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to DentOS
      </motion.button>

      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <LandingPage
            onStart={() => setScreen("wizard")}
          />
        )}
        {screen === "wizard" && (
          <SymptomWizard onComplete={handleWizardComplete} />
        )}
        {screen === "analyzing" && (
          <AnalysisAnimation onComplete={handleAnalysisComplete} />
        )}
        {screen === "results" && result && symptoms && (
          <ResultsDashboard
            result={result}
            symptoms={symptoms}
            onLifestyle={() => setScreen("lifestyle")}
            onRestart={() => {
              setScreen("landing");
              setSymptoms(null);
              setResult(null);
            }}
          />
        )}
        {screen === "lifestyle" && (
          <LifestylePredictor onBack={() => setScreen("results")} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Triage;
