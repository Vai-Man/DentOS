import { motion } from "framer-motion";

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-muted-foreground">
        <span className="font-medium">Question {current} of {total}</span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--teal)))" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
