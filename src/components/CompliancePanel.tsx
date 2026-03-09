import { motion } from 'framer-motion';
import { useDentOSStore } from '@/lib/store';
import { evaluateCompliance, getComplianceScore, getOverallStatus } from '@/lib/compliance-engine';
import { CheckCircle2, XCircle, Clock, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function CompliancePanel() {
  const state = useDentOSStore();
  const rules = evaluateCompliance(state);
  const score = getComplianceScore(rules);
  const overall = getOverallStatus(rules);

  const statusConfig = {
    compliant: { icon: ShieldCheck, label: 'Compliant', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', glow: 'glow-success' },
    partial: { icon: ShieldAlert, label: 'Partial', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', glow: 'glow-warning' },
    'non-compliant': { icon: Shield, label: 'Non-Compliant', color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', glow: 'glow-destructive' },
  };

  const config = statusConfig[overall];
  const StatusIcon = config.icon;

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Compliance Status</h3>
        <motion.div
          key={overall}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </motion.div>
      </div>

      {/* Score bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-muted-foreground">Compliance Score</span>
          <span className={`text-base font-mono font-bold ${config.color}`}>{score}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              overall === 'compliant' ? 'bg-success' : overall === 'partial' ? 'bg-warning' : 'bg-destructive'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Rules list */}
      <div className="space-y-1.5">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors ${
              rule.status === 'pass'
                ? 'bg-success/5 border border-success/20'
                : rule.status === 'fail'
                ? 'bg-destructive/5 border border-destructive/20'
                : 'bg-muted/50 border border-border'
            }`}
          >
            {rule.status === 'pass' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            ) : rule.status === 'fail' ? (
              <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <span className={`font-medium ${
                rule.status === 'pass' ? 'text-success-foreground' :
                rule.status === 'fail' ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {rule.label}
              </span>
              <span className="ml-1.5 text-muted-foreground hidden xl:inline">
                — {rule.description}
              </span>
            </div>
            <span className={`text-xs font-mono uppercase ${
              rule.status === 'pass' ? 'text-success' :
              rule.status === 'fail' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {rule.category}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
