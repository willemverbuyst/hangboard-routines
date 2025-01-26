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

  console.log(routine);

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

        {routine.map((r, index) =>
          r.type === "countdown" ? (
            <IonRow className="ion-padding" key={index}>
              <IonCol size="10">
                {[10, 20, 30, 40, 50, 60].map((time) => (
                  <IonButton
                    key={time}
                    color="tertiary"
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
            </IonRow>
          ) : r.type === "recovery" ? (
            <Fragment key={index}>
              <IonRow className="ion-padding">
                <IonCol>
                  <IonLabel>Recovery</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding">
                <IonCol size="10">
                  {[10, 20, 30, 40, 50, 60].map((time) => (
                    <IonButton
                      key={time}
                      color="tertiary"
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
                    label="Recovery"
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
              </IonRow>
            </Fragment>
          ) : r.type === "set" ? (
            <Fragment key={index}>
              <IonRow className="ion-padding">
                <IonCol>
                  <IonLabel>Set</IonLabel>
                </IonCol>
              </IonRow>
              {r.value.map((set, setIndex) => (
                <Fragment key={setIndex}>
                  <IonRow className="ion-padding">
                    <IonCol size="5">
                      {[10, 20, 30, 40, 50, 60].map((time) => (
                        <IonButton
                          key={time}
                          color="tertiary"
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
                          color="tertiary"
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
                        label="Break"
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
                  </IonRow>
                </Fragment>
              ))}
            </Fragment>
          ) : null
        )}

        <IonRow className="ion-padding">
          <IonCol>
            <IonText color="medium">
              Total:&nbsp;
              {routine.reduce((total, set) => {
                if (set.type === "countdown" || set.type === "recovery") {
                  return total + set.value;
                } else if (set.type === "set") {
                  return (
                    total +
                    set.value.reduce(
                      (setTotal, iteration) =>
                        setTotal + iteration.hang + iteration.rest,
                      0
                    )
                  );
                }
                return total;
              }, 0)}
              &nbsp; seconds
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding">
          <IonCol>
            <IonButton
              onClick={() => {
                const newRoutine = [...routine];

                newRoutine.push(defaultSet);
                setRoutine(newRoutine);
              }}
            >
              + Set
            </IonButton>
            {!!routine.length && routine[routine.length - 1].type === "set" && (
              <IonButton
                onClick={() => {
                  const newRoutine = [...routine];
                  const lastSet = newRoutine[newRoutine.length - 1] as Set;
                  lastSet.value.push(defaultIteration);

                  setRoutine(newRoutine);
                }}
              >
                + Iteration
              </IonButton>
            )}
            {!!routine.length &&
              routine[routine.length - 1].type !== "recovery" && (
                <IonButton
                  onClick={() => {
                    const newRoutine = [...routine];

                    newRoutine.push(defaultRecovery);
                    setRoutine(newRoutine);
                  }}
                >
                  + Recovery
                </IonButton>
              )}
            {routine[0]?.type !== "countdown" && (
              <IonButton
                onClick={() => {
                  const newRoutine = [countdown, ...routine];

                  setRoutine(newRoutine);
                }}
              >
                + Countdown
              </IonButton>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
