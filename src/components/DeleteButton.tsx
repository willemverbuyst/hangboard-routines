import { IonButton } from "@ionic/react";

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <IonButton color="danger" size="small" onClick={onDelete}>
      x
    </IonButton>
  );
};

export default DeleteButton;
