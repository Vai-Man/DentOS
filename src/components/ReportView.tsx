import { useDentOSStore } from '@/lib/store';
import { evaluateCompliance, getComplianceScore, getOverallStatus } from '@/lib/compliance-engine';
import { motion } from 'framer-motion';
import { FileDown, Printer, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportView() {
  const state = useDentOSStore();
  const rules = evaluateCompliance(state);
  const score = getComplianceScore(rules);
  const overall = getOverallStatus(rules);

  const timestamp = new Date().toLocaleString();

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Procedure Summary Report</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Auto-generated • {timestamp}</p>
        </div>
        <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => window.print()}>
          <Printer className="w-3.5 h-3.5" /> Print
        </Button>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3 rounded-md bg-muted/30 border border-border">
        <div className="text-[11px]">
          <span className="text-muted-foreground">Patient: </span>
          <span className="text-foreground font-medium">{state.patientName || '—'}</span>
        </div>
        <div className="text-[11px]">
          <span className="text-muted-foreground">Age: </span>
          <span className="text-foreground font-medium">{state.patientAge ?? '—'}</span>
        </div>
        <div className="text-[11px]">
          <span className="text-muted-foreground">Tooth: </span>
          <span className="text-foreground font-medium">#{state.selectedTooth ?? '—'}</span>
        </div>
        <div className="text-[11px]">
          <span className="text-muted-foreground">Procedure: </span>
          <span className="text-foreground font-medium">Simple Extraction</span>
        </div>
        <div className="text-[11px]">
          <span className="text-muted-foreground">Anesthesia: </span>
          <span className="text-foreground font-medium">{state.anesthesiaType || '—'}</span>
        </div>
        <div className="text-[11px]">
          <span className="text-muted-foreground">Allergies: </span>
          <span className="text-foreground font-medium">{state.allergies.join(', ') || '—'}</span>
        </div>
      </div>

      {/* Compliance Summary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-foreground">Compliance Audit</span>
          <span className={`text-xs font-mono font-bold ${
            overall === 'compliant' ? 'text-success' : overall === 'partial' ? 'text-warning' : 'text-destructive'
          }`}>
            {score}% — {overall.toUpperCase()}
          </span>
        </div>
        <div className="space-y-1">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 text-[11px]">
              {rule.status === 'pass' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-destructive" />
              )}
              <span className="text-foreground">{rule.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Steps */}
      <div>
        <span className="text-xs font-medium text-foreground mb-2 block">Workflow Steps Completed</span>
        <div className="space-y-1">
          {state.workflowSteps.map((step) => (
            <div key={step.id} className="flex items-center gap-2 text-[11px]">
              {step.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              <span className={step.completed ? 'text-foreground' : 'text-muted-foreground'}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
