import { WorkflowStep } from './types';

export const EXTRACTION_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'review-history',
    label: 'Review Medical History',
    description: 'Check patient medical records and allergies',
    icon: 'ClipboardList',
    required: true,
    completed: false,
    order: 1,
  },
  {
    id: 'radiograph',
    label: 'Take Radiograph',
    description: 'Capture and review pre-operative X-ray',
    icon: 'ScanLine',
    required: true,
    completed: false,
    order: 2,
  },
  {
    id: 'consent',
    label: 'Obtain Consent',
    description: 'Review risks and obtain signed consent',
    icon: 'FileCheck',
    required: true,
    completed: false,
    order: 3,
  },
  {
    id: 'anesthesia',
    label: 'Administer Anesthesia',
    description: 'Select and administer local anesthesia',
    icon: 'Syringe',
    required: true,
    completed: false,
    order: 4,
  },
  {
    id: 'extraction',
    label: 'Perform Extraction',
    description: 'Elevate and extract the tooth',
    icon: 'Wrench',
    required: true,
    completed: false,
    order: 5,
  },
  {
    id: 'hemostasis',
    label: 'Achieve Hemostasis',
    description: 'Control bleeding and place gauze',
    icon: 'Heart',
    required: true,
    completed: false,
    order: 6,
  },
  {
    id: 'post-op',
    label: 'Post-Op Instructions',
    description: 'Provide care instructions and prescriptions',
    icon: 'FileText',
    required: true,
    completed: false,
    order: 7,
  },
];

export const AVAILABLE_STEPS = EXTRACTION_WORKFLOW_STEPS;
