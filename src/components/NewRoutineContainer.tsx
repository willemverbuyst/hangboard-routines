import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import React from "react";
import { useActions, useAppState } from "../overmind";
import "./NewRoutineContainer.css";

interface ContainerProps {}

const NewRoutineContainer: React.FC<ContainerProps> = () => {
  const { countdown, name, sets, total } = useAppState();
  const {
    updateName,
    updateCountdown,
    updateSetHang,
    updateSetRest,
    updateSetIterations,
    updateSetRecovery,
    addSet,
  } = useActions();

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <IonGrid className="ion-padding">
        <IonRow className="ion-padding">
          <IonCol size="10">
            <IonInput
              type="text"
              fill="outline"
              value={name}
              onIonChange={(e) => updateName({ value: e.detail.value! })}
              label="name of routine"
              labelPlacement="floating"
            />
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding">
          <IonCol size="12">
            <IonLabel>Countdown</IonLabel>
          </IonCol>
          <IonCol size="12">
            {[10, 20, 30, 40, 50, 60].map((time) => (
              <IonButton
                color={countdown === time ? "success" : "light"}
                size="small"
                onClick={() => updateCountdown({ value: time })}
              >
                {time}
              </IonButton>
            ))}
            <IonButton
              color={countdown !== 0 ? "danger" : "light"}
              size="small"
              onClick={() => updateCountdown({ value: 0 })}
            >
              x
            </IonButton>
          </IonCol>
        </IonRow>

        {sets.map((set, index) => (
          <IonRow className="ion-padding" key={index}>
            <IonCol size="12">
              <IonLabel>Set {index + 1}</IonLabel>
            </IonCol>
            <IonCol size="12">
              <IonLabel>Hang</IonLabel>
            </IonCol>
            <IonCol size="12">
              {[10, 20, 30, 40, 50, 60].map((time) => (
                <IonButton
                  color={set.hang === time ? "success" : "light"}
                  size="small"
                  onClick={() => updateSetHang({ index, value: time })}
                >
                  {time}
                </IonButton>
              ))}
              <IonButton
                color={set.hang !== 0 ? "danger" : "light"}
                size="small"
                onClick={() => updateSetHang({ index, value: 0 })}
              >
                x
              </IonButton>
            </IonCol>
            <IonCol size="12">
              <IonLabel>Rest</IonLabel>
            </IonCol>
            <IonCol size="12">
              {[10, 20, 30, 40, 50, 60].map((time) => (
                <IonButton
                  color={set.rest === time ? "success" : "light"}
                  size="small"
                  onClick={() => updateSetRest({ index, value: time })}
                >
                  {time}
                </IonButton>
              ))}
              <IonButton
                color={set.rest !== 0 ? "danger" : "light"}
                size="small"
                onClick={() => updateSetRest({ index, value: 0 })}
              >
                x
              </IonButton>
            </IonCol>
            <IonCol size="12">
              <IonLabel>Iterations</IonLabel>
            </IonCol>
            <IonCol size="12">
              {[1, 2, 3, 4, 5, 6].map((time) => (
                <IonButton
                  color={set.iterations === time ? "success" : "light"}
                  size="small"
                  onClick={() => updateSetIterations({ index, value: time })}
                >
                  {time}
                </IonButton>
              ))}
              <IonButton
                color={set.iterations !== 1 ? "danger" : "light"}
                size="small"
                onClick={() => updateSetIterations({ index, value: 1 })}
              >
                x
              </IonButton>
            </IonCol>
            <IonCol size="12">
              <IonLabel>Recovery</IonLabel>
            </IonCol>
            <IonCol size="12">
              {[10, 20, 30, 40, 50, 60].map((time) => (
                <IonButton
                  color={set.recovery === time ? "success" : "light"}
                  size="small"
                  onClick={() => updateSetRecovery({ index, value: time })}
                >
                  {time}
                </IonButton>
              ))}
              <IonButton
                color={set.recovery !== 0 ? "danger" : "light"}
                size="small"
                onClick={() => updateSetRecovery({ index, value: 0 })}
              >
                x
              </IonButton>
            </IonCol>
          </IonRow>
        ))}
        <IonRow className="ion-padding">
          <IonCol size="12">
            <IonButton size="small" color="secondary" onClick={addSet}>
              + Set
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol size="12">
            <IonText color="medium">{total}</IonText>;
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
