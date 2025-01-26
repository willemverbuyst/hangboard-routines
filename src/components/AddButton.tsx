import { IonButton } from "@ionic/react";

const AddButton = ({ label, onAdd }: { label: string; onAdd: () => void }) => {
  return (
    <IonButton size="small" color="secondary" onClick={onAdd}>
      + {label}
    </IonButton>
  );
};

export default AddButton;
