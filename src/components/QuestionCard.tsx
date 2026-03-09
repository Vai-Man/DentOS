import { motion } from "framer-motion";

interface QuestionCardProps {
  question: string;
  description?: string;
  children: React.ReactNode;
}

const QuestionCard = ({ question, description, children }: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass-card-elevated p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">{question}</h2>
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
};

export default QuestionCard;
