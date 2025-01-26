import { IonGrid, IonInput, IonLabel, IonRow, IonText } from "@ionic/react";
import "./NewRoutineContainer.css";

interface ContainerProps {}

const NewRoutineContainer: React.FC<ContainerProps> = () => {
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <IonGrid className="ion-padding">
        <IonRow className="ion-padding">
          <IonText>
            <h2>Create a Routine</h2>
          </IonText>
        </IonRow>
        <IonRow className="ion-padding">
          <IonLabel>Set 1</IonLabel>
        </IonRow>
        <IonRow className="ion-padding">
          <IonInput
            label="Hang"
            type="number"
            placeholder="0"
            min="0"
            step="10"
            labelPlacement="floating"
            fill="outline"
          />
        </IonRow>
        <IonRow className="ion-padding">
          <IonInput
            label="Break"
            type="number"
            placeholder="0"
            min="0"
            step="10"
            labelPlacement="floating"
            fill="outline"
          ></IonInput>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
