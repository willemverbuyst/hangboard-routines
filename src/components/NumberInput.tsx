import { IonInput } from "@ionic/react";

const NumberInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => {
  return (
    <IonInput
      label={label}
      type="number"
      placeholder="0"
      min="0"
      step="10"
      labelPlacement="floating"
      fill="outline"
      value={value}
      onIonChange={(e) => onChange(parseInt(e.detail.value!))}
    />
  );
};

export default NumberInput;
