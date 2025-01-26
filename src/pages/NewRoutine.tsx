import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import NewRoutineContainer from "../components/NewRoutineContainer";
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
        <NewRoutineContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewRoutine;
