import { motion } from 'framer-motion';
import { useDentOSStore } from '@/lib/store';

const TEETH_UPPER = [
  { id: 18, x: 30, y: 50, type: 'molar' },
  { id: 17, x: 65, y: 38, type: 'molar' },
  { id: 16, x: 100, y: 28, type: 'molar' },
  { id: 15, x: 135, y: 22, type: 'premolar' },
  { id: 14, x: 168, y: 18, type: 'premolar' },
  { id: 13, x: 200, y: 16, type: 'canine' },
  { id: 12, x: 230, y: 15, type: 'incisor' },
  { id: 11, x: 258, y: 14, type: 'incisor' },
  { id: 21, x: 290, y: 14, type: 'incisor' },
  { id: 22, x: 318, y: 15, type: 'incisor' },
  { id: 23, x: 348, y: 16, type: 'canine' },
  { id: 24, x: 380, y: 18, type: 'premolar' },
  { id: 25, x: 413, y: 22, type: 'premolar' },
  { id: 26, x: 448, y: 28, type: 'molar' },
  { id: 27, x: 483, y: 38, type: 'molar' },
  { id: 28, x: 518, y: 50, type: 'molar' },
];

const TEETH_LOWER = [
  { id: 48, x: 30, y: 170, type: 'molar' },
  { id: 47, x: 65, y: 182, type: 'molar' },
  { id: 46, x: 100, y: 192, type: 'molar' },
  { id: 45, x: 135, y: 198, type: 'premolar' },
  { id: 44, x: 168, y: 202, type: 'premolar' },
  { id: 43, x: 200, y: 204, type: 'canine' },
  { id: 42, x: 230, y: 205, type: 'incisor' },
  { id: 41, x: 258, y: 206, type: 'incisor' },
  { id: 31, x: 290, y: 206, type: 'incisor' },
  { id: 32, x: 318, y: 205, type: 'incisor' },
  { id: 33, x: 348, y: 204, type: 'canine' },
  { id: 34, x: 380, y: 202, type: 'premolar' },
  { id: 35, x: 413, y: 198, type: 'premolar' },
  { id: 36, x: 448, y: 192, type: 'molar' },
  { id: 37, x: 483, y: 182, type: 'molar' },
  { id: 38, x: 518, y: 170, type: 'molar' },
];

function getToothSize(type: string) {
  switch (type) {
    case 'molar': return 22;
    case 'premolar': return 18;
    case 'canine': return 16;
    case 'incisor': return 15;
    default: return 18;
  }
}

export default function ToothMap() {
  const { selectedTooth, setSelectedTooth } = useDentOSStore();

  const renderTooth = (tooth: { id: number; x: number; y: number; type: string }) => {
    const size = getToothSize(tooth.type);
    const isSelected = selectedTooth === tooth.id;

    return (
      <motion.g
        key={tooth.id}
        onClick={() => setSelectedTooth(isSelected ? null : tooth.id)}
        className="cursor-pointer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <rect
          x={tooth.x - size / 2}
          y={tooth.y - size / 2}
          width={size}
          height={size}
          rx={4}
          className={`transition-all duration-200 ${
            isSelected
              ? 'fill-primary stroke-primary'
              : 'fill-secondary stroke-muted-foreground/30 hover:fill-accent hover:stroke-primary/50'
          }`}
          strokeWidth={isSelected ? 2 : 1}
        />
        {isSelected && (
          <motion.rect
            x={tooth.x - size / 2 - 3}
            y={tooth.y - size / 2 - 3}
            width={size + 6}
            height={size + 6}
            rx={6}
            fill="none"
            className="stroke-primary"
            strokeWidth={1.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <text
          x={tooth.x}
          y={tooth.y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-[9px] font-mono font-medium pointer-events-none select-none ${
            isSelected ? 'fill-primary-foreground' : 'fill-muted-foreground'
          }`}
        >
          {tooth.id}
        </text>
      </motion.g>
    );
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Dental Chart</h3>
        {selectedTooth && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
          >
            Tooth #{selectedTooth}
          </motion.span>
        )}
      </div>
      <svg viewBox="0 0 548 220" className="w-full">
        {/* Arch lines */}
        <path
          d="M 30 80 Q 274 -20 518 80"
          fill="none"
          className="stroke-border"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <path
          d="M 30 140 Q 274 240 518 140"
          fill="none"
          className="stroke-border"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        {/* Labels */}
        <text x="274" y="8" textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">UPPER</text>
        <text x="274" y="218" textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">LOWER</text>
        <line x1="274" y1="95" x2="274" y2="125" className="stroke-border" strokeWidth={1} />
        
        {TEETH_UPPER.map(renderTooth)}
        {TEETH_LOWER.map(renderTooth)}
      </svg>
      <p className="text-[11px] text-muted-foreground text-center mt-2">
        Click a tooth to select for extraction
      </p>
    </div>
  );
}
