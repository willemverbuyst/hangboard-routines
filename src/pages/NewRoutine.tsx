import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const NewRoutine: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Hangboard App | New Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewRoutine;
