import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react";
import { Fragment, useState } from "react";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import "./NewRoutineContainer.css";
import NumberInput from "./NumberInput";
import TimeSelectionsQuickButtons from "./TimeSelectionsQuickButtons";
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

  function onChangeNumberInput(
    value: number,
    index: number,
    setIndex?: number,
    prop?: keyof Iteration
  ) {
    const newRoutine = [...routine];

    if (newRoutine[index].type === "set" && setIndex !== undefined && prop) {
      const set = newRoutine[index] as Set;
      const iteration = set.value[setIndex];

      iteration[prop] = value;
    } else {
      const item = newRoutine[index];
      item.value = value;
    }

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
              <IonCol>
                <IonLabel>Start</IonLabel>
              </IonCol>
              <IonCol size="11">
                <TimeSelectionsQuickButtons
                  routine={routine}
                  index={index}
                  handleQuickButtonClick={(v) => onChangeNumberInput(v, index)}
                />
              </IonCol>
              <IonCol size="10">
                <NumberInput
                  label="Countdown"
                  value={r.value}
                  onChange={(v) => onChangeNumberInput(v, index)}
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
                <TimeSelectionsQuickButtons
                  routine={routine}
                  index={index}
                  handleQuickButtonClick={(v) => onChangeNumberInput(v, index)}
                />
              </IonCol>
              <IonCol size="10">
                <NumberInput
                  label="Rest"
                  value={r.value}
                  onChange={(v) => onChangeNumberInput(v, index)}
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
                <IonCol>
                  <IonLabel>{getLabelForSet(index)}</IonLabel>
                </IonCol>
                {r.value.map((set, setIndex) => (
                  <IonRow key={setIndex}>
                    <IonCol size="5">
                      <TimeSelectionsQuickButtons
                        routine={routine}
                        index={index}
                        setIndex={setIndex}
                        prop="hang"
                        handleQuickButtonClick={(v) =>
                          onChangeNumberInput(v, index, setIndex, "hang")
                        }
                      />
                    </IonCol>
                    <IonCol size="5">
                      <TimeSelectionsQuickButtons
                        routine={routine}
                        index={index}
                        setIndex={setIndex}
                        prop="rest"
                        handleQuickButtonClick={(v) =>
                          onChangeNumberInput(v, index, setIndex, "rest")
                        }
                      />
                    </IonCol>

                    <IonCol size="5">
                      <NumberInput
                        label="Hang"
                        value={set.hang}
                        onChange={(v) =>
                          onChangeNumberInput(v, index, setIndex, "hang")
                        }
                      />
                    </IonCol>
                    <IonCol size="5">
                      <NumberInput
                        label="Rest"
                        value={set.rest}
                        onChange={(v) =>
                          onChangeNumberInput(v, index, setIndex, "rest")
                        }
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
                  </IonRow>
                ))}
              </IonRow>
            </Fragment>
          ) : null
        )}

        <IonRow className="ion-padding">
          <IonCol>
            <Total routine={routine} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
