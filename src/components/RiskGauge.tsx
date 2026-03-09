import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number;
  size?: number;
}

const RiskGauge = ({ score, size = 200 }: RiskGaugeProps) => {
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius; // semicircle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return "hsl(var(--emergency))";
    if (score >= 40) return "hsl(var(--urgent))";
    return "hsl(var(--routine))";
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc */}
        <path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <motion.path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        {/* Score text */}
        <motion.text
          x={size / 2}
          y={size / 2 - 5}
          textAnchor="middle"
          className="font-display font-bold"
          fill={getColor()}
          fontSize="36"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.text>
        <text
          x={size / 2}
          y={size / 2 + 18}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="12"
        >
          Risk Score
        </text>
      </svg>
    </div>
  );
};

export default RiskGauge;
