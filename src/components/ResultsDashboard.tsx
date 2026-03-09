import { motion } from "framer-motion";
import { TriageResult, SymptomData } from "@/lib/triageEngine";
import RiskGauge from "./RiskGauge";
import TeethDiagram from "./TeethDiagram";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { AlertTriangle, AlertCircle, CheckCircle2, Clock, Search, BarChart3, Target, Bandage, Shield, Brain, BookOpen, ArrowRight, RotateCcw } from "lucide-react";

interface ResultsDashboardProps {
  result: TriageResult;
  symptoms: SymptomData;
  onLifestyle: () => void;
  onRestart: () => void;
}

const urgencyConfig = {
  Emergency: { badge: "badge-emergency", icon: AlertTriangle, label: "Emergency" },
  Urgent: { badge: "badge-urgent", icon: AlertCircle, label: "Urgent" },
  Routine: { badge: "badge-routine", icon: CheckCircle2, label: "Routine" },
};

const ResultsDashboard = ({ result, symptoms, onLifestyle, onRestart }: ResultsDashboardProps) => {
  const config = urgencyConfig[result.urgency];
  const UrgencyIcon = config.icon;

  const symptomChartData = [
    { name: "Pain", value: symptoms.painSeverity * 10 },
    { name: "Swelling", value: symptoms.swelling ? 80 : 0 },
    { name: "Bleeding", value: symptoms.bleeding ? 70 : 0 },
    { name: "Fever", value: symptoms.fever ? 90 : 0 },
    { name: "Trauma", value: symptoms.toothTrauma ? 100 : 0 },
  ];

  const pieData = [
    { name: "Risk", value: result.riskScore },
    { name: "Safe", value: 100 - result.riskScore },
  ];

  const pieColors = [
    result.riskScore >= 70 ? "hsl(var(--emergency))" : result.riskScore >= 40 ? "hsl(var(--urgent))" : "hsl(var(--routine))",
    "hsl(var(--muted))",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen gradient-bg-subtle py-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container max-w-5xl mx-auto space-y-6"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Triage Results
          </h1>
          <p className="text-muted-foreground">Your dental symptom analysis is ready</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glass-card-elevated p-8 text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-primary/10">
              <UrgencyIcon size={28} className={`text-${result.urgency === "Emergency" ? "emergency" : result.urgency === "Urgent" ? "urgent" : "routine"}`} />
            </div>
            <span className={`${config.badge} text-lg`}>{result.urgency}</span>
            <h3 className="text-xl font-display font-bold text-foreground mt-4">{result.recommendedAction}</h3>
            <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
              <Clock size={16} />
              See a dentist: <strong>{result.estimatedTimeToSee}</strong>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card-elevated p-8 flex flex-col items-center justify-center">
            <RiskGauge score={result.riskScore} />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Search size={18} className="text-primary" />
              Possible Conditions
            </h3>
            <ul className="space-y-2">
              {result.possibleConditions.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TeethDiagram painType={symptoms.painType} />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" />
              Symptom Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={symptomChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {symptomChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.value >= 70 ? "hsl(var(--emergency))" : entry.value >= 40 ? "hsl(var(--urgent))" : "hsl(var(--routine))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target size={18} className="text-primary" />
              Risk Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {result.immediateSteps.length > 0 && (
          <motion.div variants={itemVariants} className="glass-card-elevated p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bandage size={18} className="text-primary" />
              Immediate Steps
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {result.immediateSteps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                >
                  <span className="text-primary font-bold text-sm">{i + 1}</span>
                  <span className="text-sm text-foreground">{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            Preventive Recommendations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {result.preventiveRecommendations.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" /> {r}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card-elevated p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain size={18} className="text-primary" />
            Explainability Panel
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Here is how we arrived at your triage classification:
          </p>
          <div className="space-y-3 mb-6">
            {result.reasoning.map((r, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/50 text-sm text-foreground">
                {r}
              </div>
            ))}
          </div>

          <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <BookOpen size={16} className="text-primary" />
            Research References
          </h4>
          <div className="space-y-2">
            {result.references.map((ref, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-card">
                <p className="font-semibold text-sm text-primary">{ref.source}</p>
                <p className="text-xs text-muted-foreground mt-1">{ref.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLifestyle}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}
          >
            Check Dental Health Score
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border text-foreground hover:border-primary/30 transition-all"
          >
            <RotateCcw size={16} />
            Start New Triage
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsDashboard;
