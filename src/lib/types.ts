export interface Tooth {
  id: number;
  name: string;
  quadrant: 'upper-right' | 'upper-left' | 'lower-left' | 'lower-right';
  type: 'molar' | 'premolar' | 'canine' | 'incisor';
  status: 'healthy' | 'selected' | 'treated' | 'missing';
}

export interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  icon: string;
  required: boolean;
  completed: boolean;
  order: number;
}

export interface ComplianceRule {
  id: string;
  label: string;
  description: string;
  category: 'pre-op' | 'intra-op' | 'post-op';
  status: 'pass' | 'fail' | 'pending';
  check: (state: ProcedureState) => boolean;
}

export interface ProcedureState {
  selectedTooth: number | null;
  patientName: string;
  patientAge: number | null;
  allergies: string[];
  medicalHistory: string[];
  anesthesiaType: string | null;
  consentSigned: boolean;
  xrayTaken: boolean;
  vitalsSigned: boolean;
  workflowSteps: WorkflowStep[];
  procedureNotes: string;
  postOpInstructions: boolean;
  followUpScheduled: boolean;
}

export type ComplianceStatus = 'compliant' | 'non-compliant' | 'partial';
