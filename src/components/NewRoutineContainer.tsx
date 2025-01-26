import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { Fragment, useState } from "react";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import "./NewRoutineContainer.css";
import Total from "./Total";
import { Countdown, Iteration, Recovery, Routine, Set } from "./types";

interface ContainerProps {}

const NewRoutineContainer: React.FC<ContainerProps> = () => {
  const countdown: Countdown = { type: "countdown", value: 10 };
  const defaultIteration: Iteration = { hang: 0, rest: 0 };
  const defaultSet: Set = { type: "set", value: [defaultIteration] };
  const defaultRecovery: Recovery = { type: "recovery", value: 0 };

  const [routine, setRoutine] = useState<Routine>([countdown, defaultSet]);

  function getLabelForSet(routineIndex: number) {
    const set = routine[routineIndex] as Set;
    const iterations = set.value.length;
    const setsBeforeIndex = routine
      .slice(0, routineIndex)
      .filter((item) => item.type === "set").length;

    return `Set ${setsBeforeIndex + 1} - ${iterations} ${
      iterations === 1 ? "iteration" : "iterations"
    }`;
  }

  function onDelete(index: number, setIndex?: number) {
    const newRoutine = [...routine];
    const item = newRoutine[index];

    if (item.type !== "set" || item.value.length === 1) {
      newRoutine.splice(index, 1);
    } else if (setIndex !== undefined) {
      item.value.splice(setIndex, 1);
    }

    setRoutine(newRoutine);
  }

  function addCountdown() {
    const newRoutine = [countdown, ...routine];

    setRoutine(newRoutine);
  }

  function addRecovery(index: number) {
    const newRoutine = [...routine];

    newRoutine.splice(index + 1, 0, defaultRecovery);
    setRoutine(newRoutine);
  }

  function addSet(index: number) {
    const newRoutine = [...routine];

    newRoutine.splice(index + 1, 0, defaultSet);
    setRoutine(newRoutine);
  }

  function addIteration(index: number, setIndex: number) {
    const newRoutine = [...routine];
    const currentSet = newRoutine[index] as Set;
    currentSet.value.splice(setIndex + 1, 0, {
      ...currentSet.value[setIndex],
    });

    setRoutine(newRoutine);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <IonGrid className="ion-padding">
        <IonRow className="ion-padding">
          <IonCol>
            <IonText>
              <h2>Create a Routine</h2>
            </IonText>
          </IonCol>
        </IonRow>
        {routine[0]?.type !== "countdown" && (
          <IonRow className="ion-padding">
            <IonCol size="11">
              <AddButton label="Countdown" onAdd={() => addCountdown()} />
              {routine.length === 0 && (
                <AddButton label="Set" onAdd={() => addSet(0)} />
              )}
            </IonCol>
          </IonRow>
        )}

        {routine.map((r, index) =>
          r.type === "countdown" ? (
            <IonRow className="ion-padding" key={index}>
              <IonCol size="11">
                <IonLabel>Start</IonLabel>
              </IonCol>
              <IonCol size="11">
                {[10, 20, 30, 40, 50, 60].map((time) => (
                  <IonButton
                    key={time}
                    color={time === routine[index].value ? "success" : "light"}
                    size="small"
                    onClick={() => {
                      const newRoutine = [...routine];
                      const newCountdown = newRoutine[index] as Countdown;
                      newCountdown.value = time;

                      setRoutine(newRoutine);
                    }}
                  >
                    {time}
                  </IonButton>
                ))}
              </IonCol>
              <IonCol size="10">
                <IonInput
                  label="Count down"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="10"
                  labelPlacement="floating"
                  fill="outline"
                  value={r.value}
                  onIonChange={(e) => {
                    const newRoutine = [...routine];
                    const newCountdown = newRoutine[index] as Countdown;
                    newCountdown.value = parseInt(e.detail.value!);

                    setRoutine(newRoutine);
                  }}
                />
              </IonCol>
              <IonCol size="1">
                <DeleteButton onDelete={() => onDelete(index)} />
              </IonCol>
              <IonCol size="11">
                <AddButton label="Set" onAdd={() => addSet(index)} />
              </IonCol>
            </IonRow>
          ) : r.type === "recovery" ? (
            <IonRow className="ion-padding" key={index}>
              <IonCol>
                <IonLabel>Recovery</IonLabel>
              </IonCol>
              <IonCol size="10">
                {[10, 20, 30, 40, 50, 60].map((time) => (
                  <IonButton
                    key={time}
                    color={time === routine[index].value ? "success" : "light"}
                    size="small"
                    onClick={() => {
                      const newRoutine = [...routine];
                      const newRecovery = newRoutine[index] as Recovery;
                      newRecovery.value = time;

                      setRoutine(newRoutine);
                    }}
                  >
                    {time}
                  </IonButton>
                ))}
              </IonCol>
              <IonCol size="10">
                <IonInput
                  label="Rest"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="10"
                  labelPlacement="floating"
                  fill="outline"
                  value={r.value}
                  onIonChange={(e) => {
                    const newRoutine = [...routine];
                    const newRecovery = newRoutine[index] as Recovery;
                    newRecovery.value = parseInt(e.detail.value!);

                    setRoutine(newRoutine);
                  }}
                />
              </IonCol>
              <IonCol size="1">
                <DeleteButton onDelete={() => onDelete(index)} />
              </IonCol>
              <IonCol size="11">
                <AddButton label="Set" onAdd={() => addSet(index)} />
              </IonCol>
            </IonRow>
          ) : r.type === "set" ? (
            <Fragment key={index}>
              <IonRow className="ion-padding">
                <IonCol size="10">
                  <IonLabel>{getLabelForSet(index)}</IonLabel>
                </IonCol>
                {r.value.map((set, setIndex) => (
                  <Fragment key={setIndex}>
                    <IonCol size="5">
                      {[10, 20, 30, 40, 50, 60].map((time) => (
                        <IonButton
                          key={time}
                          color={
                            time ===
                            (routine[index] as Set).value[setIndex].hang
                              ? "success"
                              : "light"
                          }
                          size="small"
                          onClick={() => {
                            const newRoutine = [...routine];
                            const currentSet = newRoutine[index] as Set;
                            const currentIteration = currentSet.value[setIndex];

                            currentIteration.hang = time;

                            setRoutine(newRoutine);
                          }}
                        >
                          {time}
                        </IonButton>
                      ))}
                    </IonCol>
                    <IonCol size="5">
                      {[10, 20, 30, 40, 50, 60].map((time) => (
                        <IonButton
                          key={time}
                          color={
                            time ===
                            (routine[index] as Set).value[setIndex].rest
                              ? "success"
                              : "light"
                          }
                          size="small"
                          onClick={() => {
                            const newRoutine = [...routine];
                            const currentSet = newRoutine[index] as Set;
                            const currentIteration = currentSet.value[setIndex];

                            currentIteration.rest = time;

                            setRoutine(newRoutine);
                          }}
                        >
                          {time}
                        </IonButton>
                      ))}
                    </IonCol>
                    <IonCol size="5">
                      <IonInput
                        label="Hang"
                        type="number"
                        placeholder="0"
                        min="0"
                        step="10"
                        labelPlacement="floating"
                        fill="outline"
                        value={set.hang}
                        onIonChange={(e) => {
                          const newRoutine = [...routine];
                          const currentSet = newRoutine[index] as Set;
                          const currentIteration = currentSet.value[setIndex];

                          currentIteration.hang = parseInt(e.detail.value!);
                          setRoutine(newRoutine);
                        }}
                      />
                    </IonCol>

                    <IonCol size="5">
                      <IonInput
                        label="Rest"
                        type="number"
                        placeholder="0"
                        min="0"
                        step="10"
                        labelPlacement="floating"
                        fill="outline"
                        value={set.rest}
                        onIonChange={(e) => {
                          const newRoutine = [...routine];
                          const currentSet = newRoutine[index] as Set;
                          const currentIteration = currentSet.value[setIndex];

                          currentIteration.rest = parseInt(e.detail.value!);
                          setRoutine(newRoutine);
                        }}
                      />
                    </IonCol>
                    <IonCol size="1">
                      <DeleteButton
                        onDelete={() => onDelete(index, setIndex)}
                      />
                    </IonCol>
                    <IonCol size="11">
                      <AddButton
                        label="Iteration"
                        onAdd={() => addIteration(index, setIndex)}
                      />
                      {setIndex === r.value.length - 1 && (
                        <AddButton label="Set" onAdd={() => addSet(index)} />
                      )}
                      {setIndex === r.value.length - 1 &&
                        routine[index + 1]?.type !== "recovery" && (
                          <AddButton
                            label="Recovery"
                            onAdd={() => addRecovery(index)}
                          />
                        )}
                    </IonCol>
                  </Fragment>
                ))}
              </IonRow>
            </Fragment>
          ) : null
        )}

        <IonRow className="ion-padding">
          <IonCol size="11">
            <Total routine={routine} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
