import {
  IonButton,
  IonGrid,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { Fragment, useMemo, useState } from "react";
import "./NewRoutineContainer.css";

interface ContainerProps {}

type Set = Map<"hang" | "break", number>;
type Routine = Set[];

const NewRoutineContainer: React.FC<ContainerProps> = () => {
  const defaultSet: Set = useMemo(
    () =>
      new Map([
        ["hang", 0],
        ["break", 0],
      ]),
    []
  );

  const [routine, setRoutine] = useState<Routine>([defaultSet]);

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <IonGrid className="ion-padding">
        <IonRow className="ion-padding">
          <IonText>
            <h2>Create a Routine</h2>
          </IonText>
        </IonRow>
        {routine.map((set, index) => (
          <Fragment key={index}>
            <IonRow className="ion-padding">
              <IonLabel>Set {index + 1}</IonLabel>
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
                value={set.get("hang")}
                onIonChange={(e) => {
                  const newRoutine = [...routine];
                  newRoutine[index].set("hang", parseInt(e.detail.value!));
                  setRoutine(newRoutine);
                }}
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
                value={set.get("break")}
                onIonChange={(e) => {
                  const newRoutine = [...routine];
                  newRoutine[index].set("break", parseInt(e.detail.value!));
                  setRoutine(newRoutine);
                }}
              ></IonInput>
            </IonRow>
            {index === routine.length - 1 && (
              <IonRow className="ion-padding ion-justify-content-between">
                <IonText color="medium">
                  Total:&nbsp;
                  {routine.reduce(
                    (total, set) =>
                      total + (set.get("hang") ?? 0) + (set.get("break") ?? 0),
                    0
                  )}
                  &nbsp; seconds
                </IonText>
                <IonButton
                  onClick={() => {
                    const newRoutine = [...routine];
                    const lastSet = newRoutine[newRoutine.length - 1];
                    newRoutine.push(new Map(lastSet));
                    setRoutine(newRoutine);
                  }}
                >
                  Add Set
                </IonButton>
              </IonRow>
            )}
          </Fragment>
        ))}
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
