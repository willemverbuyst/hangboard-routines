import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
  const { countdown, name, routine, total } = useAppState();
  const {
    updateName,
    updateCountdown,
    updateHang,
    updateRest,
    updateRecovery,
    addSet,
    remove,
    addRecovery,
  } = useActions();

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <IonGrid className="ion-padding">
        <IonRow className="ion-padding">
          <IonCol size="12">
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

        <IonCard>
          <IonCardHeader>COUNTDOWN</IonCardHeader>
          <IonCardContent>
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
          </IonCardContent>
        </IonCard>

        {routine.map((routine, index) =>
          "recovery" in routine ? (
            <IonCard key={index}>
              <IonCardHeader>{index + 1} RECOVERY</IonCardHeader>
              <IonCardContent>
                <IonRow>
                  {[10, 20, 30, 40, 50, 60].map((time) => (
                    <IonButton
                      color={routine.recovery === time ? "success" : "light"}
                      size="small"
                      onClick={() => updateRecovery({ index, value: time })}
                    >
                      {time}
                    </IonButton>
                  ))}
                  <IonButton
                    color={routine.recovery !== 0 ? "danger" : "light"}
                    size="small"
                    onClick={() => updateRecovery({ index, value: 0 })}
                  >
                    x
                  </IonButton>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonButton
                      size="small"
                      color="danger"
                      onClick={() => remove({ index })}
                    >
                      Delete
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonCard>
              <IonCardHeader>{index + 1} SET</IonCardHeader>
              <IonCardContent>
                <IonRow>
                  <IonCol size="12">
                    <IonLabel>Hang</IonLabel>
                  </IonCol>
                  <IonCol size="12">
                    {[10, 20, 30, 40, 50, 60].map((time) => (
                      <IonButton
                        color={routine.hang === time ? "success" : "light"}
                        size="small"
                        onClick={() => updateHang({ index, value: time })}
                      >
                        {time}
                      </IonButton>
                    ))}
                    <IonButton
                      color={routine.hang !== 0 ? "danger" : "light"}
                      size="small"
                      onClick={() => updateHang({ index, value: 0 })}
                    >
                      x
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonLabel>Rest</IonLabel>
                  </IonCol>
                  <IonCol size="12">
                    {[10, 20, 30, 40, 50, 60].map((time) => (
                      <IonButton
                        color={routine.rest === time ? "success" : "light"}
                        size="small"
                        onClick={() => updateRest({ index, value: time })}
                      >
                        {time}
                      </IonButton>
                    ))}
                    <IonButton
                      color={routine.rest !== 0 ? "danger" : "light"}
                      size="small"
                      onClick={() => updateRest({ index, value: 0 })}
                    >
                      x
                    </IonButton>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonButton
                      size="small"
                      color="danger"
                      onClick={() => remove({ index })}
                    >
                      Delete
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ),
        )}
        <IonRow className="ion-padding">
          <IonCol size="12">
            <IonButton size="small" color="secondary" onClick={addSet}>
              + Set
            </IonButton>
            <IonButton size="small" color="secondary" onClick={addRecovery}>
              + Recovery
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol size="12">
            <IonText color="medium">{total}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
