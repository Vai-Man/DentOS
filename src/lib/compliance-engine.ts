import { ComplianceRule, ProcedureState, ComplianceStatus } from './types';

export const COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'patient-id',
    label: 'Patient Identification',
    description: 'Patient name and age must be recorded',
    category: 'pre-op',
    status: 'pending',
    check: (state) => !!state.patientName && !!state.patientAge,
  },
  {
    id: 'consent',
    label: 'Informed Consent',
    description: 'Patient consent form must be signed before procedure',
    category: 'pre-op',
    status: 'pending',
    check: (state) => state.consentSigned,
  },
  {
    id: 'xray',
    label: 'Radiographic Assessment',
    description: 'Pre-operative X-ray must be taken and reviewed',
    category: 'pre-op',
    status: 'pending',
    check: (state) => state.xrayTaken,
  },
  {
    id: 'tooth-selection',
    label: 'Tooth Identification',
    description: 'Target tooth must be selected on dental chart',
    category: 'pre-op',
    status: 'pending',
    check: (state) => state.selectedTooth !== null,
  },
  {
    id: 'allergy-check',
    label: 'Allergy Verification',
    description: 'Patient allergies must be documented',
    category: 'pre-op',
    status: 'pending',
    check: (state) => state.allergies.length > 0 || state.medicalHistory.includes('No Known Allergies'),
  },
  {
    id: 'anesthesia',
    label: 'Anesthesia Protocol',
    description: 'Anesthesia type must be selected for extraction',
    category: 'intra-op',
    status: 'pending',
    check: (state) => !!state.anesthesiaType,
  },
  {
    id: 'post-op',
    label: 'Post-Op Instructions',
    description: 'Post-operative care instructions must be provided',
    category: 'post-op',
    status: 'pending',
    check: (state) => state.postOpInstructions,
  },
];

export function evaluateCompliance(state: ProcedureState): ComplianceRule[] {
  return COMPLIANCE_RULES.map(rule => ({
    ...rule,
    status: rule.check(state) ? 'pass' : (
      // Check if any prerequisite data exists
      state.patientName || state.selectedTooth !== null ? 'fail' : 'pending'
    ),
  }));
}

export function getOverallStatus(rules: ComplianceRule[]): ComplianceStatus {
  const passed = rules.filter(r => r.status === 'pass').length;
  if (passed === rules.length) return 'compliant';
  if (passed > 0) return 'partial';
  return 'non-compliant';
}

export function getComplianceScore(rules: ComplianceRule[]): number {
  const passed = rules.filter(r => r.status === 'pass').length;
  return Math.round((passed / rules.length) * 100);
}
