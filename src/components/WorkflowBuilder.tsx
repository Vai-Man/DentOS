import { useDentOSStore } from '@/lib/store';
import { motion } from 'framer-motion';
import {
  ClipboardList, ScanLine, FileCheck, Syringe, Wrench, Heart, FileText,
  GripVertical, Check
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ClipboardList, ScanLine, FileCheck, Syringe, Wrench, Heart, FileText,
};

export default function WorkflowBuilder() {
  const { workflowSteps, toggleStepCompleted } = useDentOSStore();

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Extraction Workflow</h3>
        <span className="text-xs text-muted-foreground font-mono">
          {workflowSteps.filter(s => s.completed).length}/{workflowSteps.length} steps
        </span>
      </div>
      
      <div className="space-y-2">
        {workflowSteps.map((step, i) => {
          const Icon = ICON_MAP[step.icon] || ClipboardList;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => toggleStepCompleted(step.id)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                step.completed
                  ? 'bg-primary/5 border-primary/30 hover:bg-primary/10'
                  : 'bg-muted/30 border-border hover:bg-muted/60 hover:border-muted-foreground/20'
              }`}
            >
              <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
              
              <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                step.completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {step.completed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium transition-colors ${
                  step.completed ? 'text-primary line-through' : 'text-foreground'
                }`}>
                  {step.order}. {step.label}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {step.description}
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                step.completed ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary/50'
              }`}>
                {step.completed && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
