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
import "./NewRoutineContainer.css";
import { Countdown, Iteration, Recovery, Routine, Set } from "./types";

interface ContainerProps {}

const NewRoutineContainer: React.FC<ContainerProps> = () => {
  const countdown: Countdown = { type: "countdown", value: 10 };
  const defaultIteration: Iteration = { hang: 0, rest: 0 };
  const defaultSet: Set = { type: "set", value: [defaultIteration] };
  const defaultRecovery: Recovery = { type: "recovery", value: 0 };

  const [routine, setRoutine] = useState<Routine>([countdown, defaultSet]);

  const totalSeconds = routine.reduce((total, set) => {
    if (set.type === "countdown" || set.type === "recovery") {
      return total + set.value;
    } else if (set.type === "set") {
      return (
        total +
        set.value.reduce(
          (setTotal, iteration) => setTotal + iteration.hang + iteration.rest,
          0
        )
      );
    }
    return total;
  }, 0);

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
              <IonButton
                size="small"
                color="secondary"
                onClick={() => {
                  const newRoutine = [countdown, ...routine];

                  setRoutine(newRoutine);
                }}
              >
                + Countdown
              </IonButton>
              {routine.length === 0 && (
                <IonButton
                  size="small"
                  color="secondary"
                  onClick={() => {
                    const newRoutine = [defaultSet];

                    setRoutine(newRoutine);
                  }}
                >
                  + Set
                </IonButton>
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
                <IonButton
                  color="danger"
                  size="small"
                  onClick={() => {
                    const newRoutine = [...routine];

                    newRoutine.shift();
                    setRoutine(newRoutine);
                  }}
                >
                  -
                </IonButton>
              </IonCol>
              <IonCol size="11">
                <IonButton
                  size="small"
                  color="secondary"
                  onClick={() => {
                    const newRoutine = [...routine];

                    newRoutine.splice(index + 1, 0, defaultSet);
                    setRoutine(newRoutine);
                  }}
                >
                  + Set
                </IonButton>
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
                <IonButton
                  color="danger"
                  size="small"
                  onClick={() => {
                    const newRoutine = [...routine];
                    newRoutine.splice(index, 1);

                    setRoutine(newRoutine);
                  }}
                >
                  -
                </IonButton>
              </IonCol>
              <IonCol size="11">
                <IonButton
                  size="small"
                  color="secondary"
                  onClick={() => {
                    const newRoutine = [...routine];

                    newRoutine.splice(index + 1, 0, defaultSet);
                    setRoutine(newRoutine);
                  }}
                >
                  + Set
                </IonButton>
              </IonCol>
            </IonRow>
          ) : r.type === "set" ? (
            <Fragment key={index}>
              <IonRow className="ion-padding">
                <IonCol size="10">
                  <IonLabel>
                    Set - {r.value.length}{" "}
                    {r.value.length === 1 ? "iteration" : "iterations"}
                  </IonLabel>
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
                      <IonButton
                        color="danger"
                        size="small"
                        onClick={() => {
                          const newRoutine = [...routine];
                          const currentSet = newRoutine[index] as Set;
                          if (currentSet.value.length === 1) {
                            newRoutine.splice(index, 1);
                            setRoutine(newRoutine);
                          } else {
                            currentSet.value.splice(setIndex, 1);
                            setRoutine(newRoutine);
                          }
                        }}
                      >
                        -
                      </IonButton>
                    </IonCol>
                    <IonCol size="11">
                      <IonButton
                        size="small"
                        color="secondary"
                        onClick={() => {
                          const newRoutine = [...routine];
                          const currentSet = newRoutine[index] as Set;
                          currentSet.value.splice(setIndex + 1, 0, {
                            ...currentSet.value[setIndex],
                          });

                          setRoutine(newRoutine);
                        }}
                      >
                        + Iteration
                      </IonButton>
                      {setIndex === r.value.length - 1 && (
                        <IonButton
                          size="small"
                          color="secondary"
                          onClick={() => {
                            const newRoutine = [...routine];

                            newRoutine.splice(index + 1, 0, defaultSet);
                            setRoutine(newRoutine);
                          }}
                        >
                          + Set
                        </IonButton>
                      )}
                      {setIndex === r.value.length - 1 &&
                        routine[index + 1]?.type !== "recovery" && (
                          <IonButton
                            size="small"
                            color="secondary"
                            onClick={() => {
                              const newRoutine = [...routine];

                              newRoutine.splice(index + 1, 0, defaultRecovery);
                              setRoutine(newRoutine);
                            }}
                          >
                            + Recovery
                          </IonButton>
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
            <IonText color="medium">
              Total:&nbsp;
              {totalSeconds} seconds | {Math.ceil(totalSeconds / 60)} minutes
              {totalSeconds % 60 === 0
                ? ""
                : ` and ${totalSeconds % 60} seconds`}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
