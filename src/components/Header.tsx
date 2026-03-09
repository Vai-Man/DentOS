import { useDentOSStore } from '@/lib/store';
import { evaluateCompliance, getComplianceScore, getOverallStatus } from '@/lib/compliance-engine';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, ShieldAlert, Shield, RotateCcw, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const state = useDentOSStore();
  const rules = evaluateCompliance(state);
  const score = getComplianceScore(rules);
  const overall = getOverallStatus(rules);
  const navigate = useNavigate();

  const statusMap = {
    compliant: { icon: ShieldCheck, color: 'text-success', label: 'All Clear' },
    partial: { icon: ShieldAlert, color: 'text-warning', label: 'Incomplete' },
    'non-compliant': { icon: Shield, color: 'text-muted-foreground', label: 'Pending' },
  };

  const { icon: StatusIcon, color, label } = statusMap[overall];

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Activity className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-foreground">
              Dent<span className="text-gradient">OS</span>
            </h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5">A DentoVate product</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            key={overall}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <StatusIcon className={`w-4 h-4 ${color}`} />
            <span className={`text-xs font-medium ${color}`}>{label}</span>
            <span className="text-xs font-mono text-muted-foreground">
              {score}%
            </span>
          </motion.div>

          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 h-7"
            onClick={() => state.resetAll()}
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
          <Button
            size="sm"
            className="text-xs gap-1.5 h-7 gradient-primary text-primary-foreground border-0 hover:opacity-90"
            onClick={() => navigate('/triage')}
          >
            <Stethoscope className="w-3 h-3" />
            Triage
          </Button>
        </div>
      </div>
    </header>
  );
}
