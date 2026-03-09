import { motion } from "framer-motion";
import { Stethoscope, BarChart3, Activity, BookOpen, ClipboardList, Cpu, FileText, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  { icon: Stethoscope, title: "Smart Triage", desc: "AI-powered symptom analysis using clinical guidelines" },
  { icon: BarChart3, title: "Risk Scoring", desc: "Evidence-based risk assessment on a 0–100 scale" },
  { icon: Activity, title: "Health Predictor", desc: "Lifestyle-based dental health score & recommendations" },
  { icon: BookOpen, title: "Explainable AI", desc: "Transparent reasoning with research references" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen gradient-bg-subtle overflow-hidden">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-6xl mx-auto px-4 py-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}>
            <Activity size={18} className="text-primary-foreground" />
          </div>
          <div>
            <span className="font-display font-bold text-xl text-foreground">DentTriage</span>
            <p className="text-[10px] text-muted-foreground -mt-0.5">A DentoVate product</p>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal/10 text-teal ml-1">India</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-primary-foreground"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}
          >
            Start Triage
          </motion.button>
        </div>
      </motion.nav>

      <section className="container max-w-6xl mx-auto px-4 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse-glow" />
            Evidence-based dental triage for India
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            <span className="text-foreground">Dental Emergency</span>
            <br />
            <span className="gradient-text">Triage Assistant</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Determine the urgency of your dental symptoms in minutes. Powered by clinical guidelines from ADA, NHS, WHO & IDA.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-lg text-primary-foreground neon-glow"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--teal)))" }}
          >
            Start Free Triage
            <ArrowRight size={20} />
          </motion.button>

          <p className="text-sm text-muted-foreground mt-4">
            No signup required · Takes 2 minutes · 100% private
          </p>
        </motion.div>

        <div className="relative mt-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card-elevated p-8 rounded-3xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-4 rounded-2xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-primary/10">
                    <f.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container max-w-4xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to understand your dental symptoms</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Describe Symptoms", desc: "Answer guided questions about your dental condition", icon: ClipboardList },
            { step: "02", title: "AI Analysis", desc: "Our engine cross-references clinical protocols", icon: Cpu },
            { step: "03", title: "Get Results", desc: "Receive urgency level, risk score & next steps", icon: FileText },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 text-center relative"
            >
              <span className="absolute top-4 left-4 text-xs font-bold text-primary/30 font-display">{item.step}</span>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-primary/10">
                <item.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">This tool is for informational purposes only. Always consult a qualified dentist for medical advice.</p>
          <p>Built for India · References: ADA, NHS, WHO, IDA Guidelines</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
