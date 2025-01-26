import { IonButton, IonText } from "@ionic/react";
import "./ExploreContainer.css";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <IonText>
        <h2>Let's get started</h2>
      </IonText>
      <IonButton routerLink="/new-routine" color="secondary">
        New Routine
      </IonButton>
      <IonButton routerLink="/my-routines">My Routines</IonButton>
    </div>
  );
};

export default ExploreContainer;
