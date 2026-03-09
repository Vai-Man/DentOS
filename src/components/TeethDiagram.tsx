import { motion } from "framer-motion";

interface TeethDiagramProps {
  painType: string;
  affectedArea?: string;
}

const TeethDiagram = ({ painType }: TeethDiagramProps) => {
  const getHighlightColor = () => {
    if (painType === "sharp" || painType === "throbbing") return "hsl(var(--emergency))";
    if (painType === "dull") return "hsl(var(--urgent))";
    return "hsl(var(--routine))";
  };

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">Pain Region Indicator</h3>
      <div className="relative flex justify-center">
        <svg viewBox="0 0 300 200" className="w-full max-w-[300px]">
          {/* Upper jaw */}
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={`upper-${i}`}
              x={40 + i * 28}
              y={30}
              width={22}
              height={35}
              rx={4}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth={1.5}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ fill: getHighlightColor(), scale: 1.1 }}
              style={{ cursor: "pointer" }}
            />
          ))}
          {/* Lower jaw */}
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={`lower-${i}`}
              x={40 + i * 28}
              y={80}
              width={22}
              height={35}
              rx={4}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth={1.5}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ fill: getHighlightColor(), scale: 1.1 }}
              style={{ cursor: "pointer" }}
            />
          ))}
          {/* Highlight random teeth for visual effect */}
          {painType && (
            <>
              <motion.rect
                x={96} y={30} width={22} height={35} rx={4}
                fill={getHighlightColor()}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.rect
                x={124} y={80} width={22} height={35} rx={4}
                fill={getHighlightColor()}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
          {/* Labels */}
          <text x={150} y={20} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">Upper Jaw</text>
          <text x={150} y={130} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">Lower Jaw</text>
        </svg>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Hover over teeth to highlight • Pulsing teeth indicate possible pain region
      </p>
    </div>
  );
};

export default TeethDiagram;
