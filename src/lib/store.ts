import { create } from 'zustand';
import { ProcedureState, WorkflowStep } from './types';
import { EXTRACTION_WORKFLOW_STEPS } from './workflow-data';

interface DentOSStore extends ProcedureState {
  // Actions
  setSelectedTooth: (id: number | null) => void;
  setPatientName: (name: string) => void;
  setPatientAge: (age: number | null) => void;
  setAllergies: (allergies: string[]) => void;
  setMedicalHistory: (history: string[]) => void;
  setAnesthesiaType: (type: string | null) => void;
  setConsentSigned: (signed: boolean) => void;
  setXrayTaken: (taken: boolean) => void;
  setVitalsSigned: (signed: boolean) => void;
  setWorkflowSteps: (steps: WorkflowStep[]) => void;
  toggleStepCompleted: (stepId: string) => void;
  setProcedureNotes: (notes: string) => void;
  setPostOpInstructions: (given: boolean) => void;
  setFollowUpScheduled: (scheduled: boolean) => void;
  resetAll: () => void;
}

const initialState: ProcedureState = {
  selectedTooth: null,
  patientName: '',
  patientAge: null,
  allergies: [],
  medicalHistory: [],
  anesthesiaType: null,
  consentSigned: false,
  xrayTaken: false,
  vitalsSigned: false,
  workflowSteps: EXTRACTION_WORKFLOW_STEPS,
  procedureNotes: '',
  postOpInstructions: false,
  followUpScheduled: false,
};

export const useDentOSStore = create<DentOSStore>((set) => ({
  ...initialState,
  setSelectedTooth: (id) => set({ selectedTooth: id }),
  setPatientName: (name) => set({ patientName: name }),
  setPatientAge: (age) => set({ patientAge: age }),
  setAllergies: (allergies) => set({ allergies }),
  setMedicalHistory: (history) => set({ medicalHistory: history }),
  setAnesthesiaType: (type) => set({ anesthesiaType: type }),
  setConsentSigned: (signed) => set({ consentSigned: signed }),
  setXrayTaken: (taken) => set({ xrayTaken: taken }),
  setVitalsSigned: (signed) => set({ vitalsSigned: signed }),
  setWorkflowSteps: (steps) => set({ workflowSteps: steps }),
  toggleStepCompleted: (stepId) =>
    set((state) => ({
      workflowSteps: state.workflowSteps.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      ),
    })),
  setProcedureNotes: (notes) => set({ procedureNotes: notes }),
  setPostOpInstructions: (given) => set({ postOpInstructions: given }),
  setFollowUpScheduled: (scheduled) => set({ followUpScheduled: scheduled }),
  resetAll: () => set(initialState),
}));
