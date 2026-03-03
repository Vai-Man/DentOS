import { useDentOSStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

const ALLERGY_OPTIONS = ['Penicillin', 'Latex', 'Lidocaine', 'Ibuprofen', 'No Known Allergies'];
const ANESTHESIA_OPTIONS = ['Lidocaine 2%', 'Articaine 4%', 'Mepivacaine 3%', 'Bupivacaine 0.5%'];

export default function PatientPanel() {
  const store = useDentOSStore();
  const [allergyInput, setAllergyInput] = useState('');

  const addAllergy = (allergy: string) => {
    if (!store.allergies.includes(allergy)) {
      store.setAllergies([...store.allergies, allergy]);
      if (allergy === 'No Known Allergies') {
        store.setMedicalHistory([...store.medicalHistory, 'No Known Allergies']);
      }
    }
  };

  const removeAllergy = (allergy: string) => {
    store.setAllergies(store.allergies.filter(a => a !== allergy));
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Patient Information</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Patient Name</label>
          <Input
            placeholder="John Doe"
            value={store.patientName}
            onChange={(e) => store.setPatientName(e.target.value)}
            className="h-8 text-xs bg-muted/50"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Age</label>
          <Input
            type="number"
            placeholder="35"
            value={store.patientAge ?? ''}
            onChange={(e) => store.setPatientAge(e.target.value ? Number(e.target.value) : null)}
            className="h-8 text-xs bg-muted/50"
          />
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="text-[11px] text-muted-foreground font-medium mb-1.5 block">Allergies</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {store.allergies.map((a) => (
            <Badge key={a} variant="secondary" className="text-[10px] gap-1 pr-1">
              {a}
              <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeAllergy(a)} />
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALLERGY_OPTIONS.filter(a => !store.allergies.includes(a)).map((a) => (
            <button
              key={a}
              onClick={() => addAllergy(a)}
              className="text-[10px] px-2 py-1 rounded-md bg-muted hover:bg-accent border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              + {a}
            </button>
          ))}
        </div>
      </div>

      {/* Anesthesia */}
      <div>
        <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Anesthesia Type</label>
        <Select value={store.anesthesiaType ?? ''} onValueChange={store.setAnesthesiaType}>
          <SelectTrigger className="h-8 text-xs bg-muted/50">
            <SelectValue placeholder="Select anesthesia" />
          </SelectTrigger>
          <SelectContent>
            {ANESTHESIA_OPTIONS.map((a) => (
              <SelectItem key={a} value={a} className="text-xs">{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Checkbox checked={store.consentSigned} onCheckedChange={(c) => store.setConsentSigned(!!c)} />
          <span className="text-foreground">Informed consent signed</span>
        </label>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Checkbox checked={store.xrayTaken} onCheckedChange={(c) => store.setXrayTaken(!!c)} />
          <span className="text-foreground">Pre-operative X-ray taken</span>
        </label>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Checkbox checked={store.postOpInstructions} onCheckedChange={(c) => store.setPostOpInstructions(!!c)} />
          <span className="text-foreground">Post-op instructions provided</span>
        </label>
      </div>
    </div>
  );
}
