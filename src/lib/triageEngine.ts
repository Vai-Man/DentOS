export interface SymptomData {
  painType: string;
  painSeverity: number; // 0-10
  painDuration: string;
  swelling: boolean;
  bleeding: boolean;
  toothTrauma: boolean;
  sensitivity: string;
  fever: boolean;
  jawStiffness: boolean;
  recentProcedure: boolean;
}

export interface LifestyleData {
  brushingFrequency: string;
  sugarIntake: string;
  flossing: string;
  lastDentalVisit: string;
}

export type UrgencyLevel = "Emergency" | "Urgent" | "Routine";

export interface TriageResult {
  urgency: UrgencyLevel;
  riskScore: number;
  possibleConditions: string[];
  recommendedAction: string;
  estimatedTimeToSee: string;
  immediateSteps: string[];
  preventiveRecommendations: string[];
  reasoning: string[];
  references: { source: string; detail: string }[];
}

export interface LifestyleResult {
  toothHealthScore: number;
  riskFactors: string[];
  recommendations: string[];
}

const REFERENCES = {
  ada: { source: "American Dental Association", detail: "ADA Emergency Dental Care Guidelines – recommends immediate care for avulsed teeth, uncontrolled bleeding, and facial swelling with fever." },
  nhs: { source: "NHS Dental Triage Protocol", detail: "NHS urgent dental care pathway classifies conditions into Emergency (within 1hr), Urgent (within 24hr), and Routine categories." },
  who: { source: "WHO Oral Health Report", detail: "WHO Global Oral Health Status Report emphasizes preventive care and early intervention for dental conditions." },
  ida: { source: "Indian Dental Association", detail: "IDA guidelines for dental emergencies in the Indian context, including referral pathways and teledentistry protocols." },
};

export function calculateRiskScore(data: SymptomData): number {
  const raw =
    (data.painSeverity * 3) +
    (data.swelling ? 20 : 0) +
    (data.bleeding ? 15 : 0) +
    (data.fever ? 25 : 0) +
    (data.toothTrauma ? 30 : 0);

  // Max possible: 30 + 20 + 15 + 25 + 30 = 120
  return Math.min(100, Math.round((raw / 120) * 100));
}

export function triageSymptoms(data: SymptomData): TriageResult {
  const riskScore = calculateRiskScore(data);
  const reasoning: string[] = [];
  const refs: { source: string; detail: string }[] = [];
  let urgency: UrgencyLevel = "Routine";
  const conditions: string[] = [];
  let action = "";
  let timeToSee = "";
  const immediateSteps: string[] = [];
  const preventive: string[] = [];

  // Emergency conditions
  if (data.toothTrauma) {
    urgency = "Emergency";
    conditions.push("Tooth avulsion / fracture");
    reasoning.push("Tooth trauma detected – knocked out or fractured teeth require immediate dental intervention within 30 minutes for best prognosis.");
    refs.push(REFERENCES.ada);
    action = "Visit the nearest dental emergency clinic or hospital immediately.";
    timeToSee = "Within 30 minutes";
    immediateSteps.push("If tooth is knocked out, hold it by the crown (not root)");
    immediateSteps.push("Place tooth in milk or saline solution");
    immediateSteps.push("Do not scrub or clean the tooth");
    immediateSteps.push("Call your nearest dental hospital – many govt hospitals in India have 24/7 dental emergency");
  }

  if (data.swelling && data.fever) {
    urgency = "Emergency";
    conditions.push("Dental abscess with systemic infection");
    reasoning.push("Swelling combined with fever indicates possible spreading infection (cellulitis or abscess) which can become life-threatening.");
    refs.push(REFERENCES.nhs);
    refs.push(REFERENCES.ada);
    action = "Seek emergency dental care immediately. This may require antibiotics and drainage.";
    timeToSee = "Within 1 hour";
    immediateSteps.push("Take paracetamol for fever (as per dosage)");
    immediateSteps.push("Do not apply heat to swollen area");
    immediateSteps.push("Rinse gently with warm salt water");
  }

  if (data.bleeding && data.painSeverity >= 8) {
    urgency = "Emergency";
    conditions.push("Severe dental trauma / Hemorrhage");
    reasoning.push("Heavy bleeding with severe pain suggests significant trauma requiring immediate professional intervention.");
    refs.push(REFERENCES.ada);
    action = "Apply firm pressure with clean gauze and go to emergency dental care.";
    timeToSee = "Within 1 hour";
  }

  // Urgent conditions
  if (urgency !== "Emergency") {
    if (data.painDuration === "more_than_48h" || data.painSeverity >= 6) {
      urgency = "Urgent";
      conditions.push("Possible pulpitis or advanced decay");
      reasoning.push("Persistent pain beyond 48 hours or high severity suggests irreversible pulpitis or deep caries requiring prompt treatment.");
      refs.push(REFERENCES.nhs);
      action = "Schedule an appointment within 24 hours. Use over-the-counter pain relief.";
      timeToSee = "Within 24 hours";
      immediateSteps.push("Take ibuprofen or paracetamol for pain");
      immediateSteps.push("Avoid very hot or cold foods");
      immediateSteps.push("Apply clove oil on affected area for temporary relief");
    }

    if (data.swelling && !data.fever) {
      urgency = "Urgent";
      conditions.push("Localized dental abscess");
      reasoning.push("Swelling without fever suggests a localized infection that needs treatment before it spreads.");
      refs.push(REFERENCES.nhs);
      action = "See a dentist within 24 hours.";
      timeToSee = "Within 24 hours";
    }

    if (data.jawStiffness && data.painSeverity >= 5) {
      urgency = "Urgent";
      conditions.push("TMJ disorder / Pericoronitis");
      reasoning.push("Jaw stiffness with moderate-to-severe pain may indicate TMJ dysfunction or pericoronitis (common with wisdom teeth).");
      refs.push(REFERENCES.who);
      action = "Visit a dentist within 24-48 hours.";
      timeToSee = "Within 24-48 hours";
    }
  }

  // Routine conditions
  if (urgency === "Routine") {
    if (data.sensitivity === "mild") {
      conditions.push("Dentin hypersensitivity");
      reasoning.push("Mild sensitivity is commonly caused by exposed dentin or early enamel erosion.");
    }
    if (data.painType === "dull" && data.painSeverity <= 3) {
      conditions.push("Early caries / Gingivitis");
      reasoning.push("Low-grade dull pain often indicates early-stage decay or gum inflammation.");
    }
    if (data.recentProcedure) {
      conditions.push("Post-procedure discomfort");
      reasoning.push("Mild symptoms following a recent dental procedure are usually normal and self-limiting.");
    }
    if (conditions.length === 0) {
      conditions.push("Minor dental concern");
      reasoning.push("Symptoms appear mild and non-urgent based on the information provided.");
    }

    refs.push(REFERENCES.who);
    refs.push(REFERENCES.ida);
    action = "Schedule a routine dental check-up at your convenience.";
    timeToSee = "Within 1-2 weeks";
    immediateSteps.push("Maintain regular brushing twice daily");
    immediateSteps.push("Use a fluoride toothpaste");
    immediateSteps.push("Rinse with warm salt water if uncomfortable");
  }

  preventive.push("Brush twice daily with fluoride toothpaste");
  preventive.push("Floss at least once daily");
  preventive.push("Visit your dentist every 6 months for check-ups");
  preventive.push("Limit sugary foods and acidic beverages");
  preventive.push("Consider dental sealants for cavity-prone teeth");
  preventive.push("Use a mouthguard during sports activities");

  return {
    urgency,
    riskScore,
    possibleConditions: conditions,
    recommendedAction: action,
    estimatedTimeToSee: timeToSee,
    immediateSteps,
    preventiveRecommendations: preventive,
    reasoning,
    references: refs,
  };
}

export function calculateLifestyleScore(data: LifestyleData): LifestyleResult {
  let score = 100;
  const risks: string[] = [];
  const recs: string[] = [];

  // Brushing
  if (data.brushingFrequency === "once") {
    score -= 15;
    risks.push("Brushing only once daily increases plaque buildup");
    recs.push("Brush at least twice daily – morning and before bed");
  } else if (data.brushingFrequency === "rarely") {
    score -= 35;
    risks.push("Infrequent brushing significantly increases decay risk");
    recs.push("Establish a twice-daily brushing routine immediately");
  }

  // Sugar
  if (data.sugarIntake === "moderate") {
    score -= 10;
    risks.push("Moderate sugar consumption contributes to cavity formation");
    recs.push("Reduce sugary snacks; rinse mouth after consuming sweets");
  } else if (data.sugarIntake === "high") {
    score -= 25;
    risks.push("High sugar intake is a major risk factor for dental caries");
    recs.push("Significantly reduce sugar intake; choose sugar-free alternatives");
  }

  // Flossing
  if (data.flossing === "sometimes") {
    score -= 10;
    risks.push("Inconsistent flossing leaves interdental areas vulnerable");
    recs.push("Floss daily to remove plaque between teeth");
  } else if (data.flossing === "never") {
    score -= 20;
    risks.push("Not flossing allows plaque to accumulate between teeth");
    recs.push("Start flossing daily – it prevents gum disease and cavities");
  }

  // Last dental visit
  if (data.lastDentalVisit === "6_12_months") {
    score -= 5;
  } else if (data.lastDentalVisit === "1_2_years") {
    score -= 15;
    risks.push("Delayed dental visits miss early signs of problems");
    recs.push("Schedule a dental check-up within the next month");
  } else if (data.lastDentalVisit === "more_than_2_years") {
    score -= 30;
    risks.push("Prolonged gap since last dental visit – issues may go undetected");
    recs.push("Visit a dentist as soon as possible for a comprehensive check-up");
  }

  return {
    toothHealthScore: Math.max(0, score),
    riskFactors: risks,
    recommendations: recs,
  };
}
