import { IonCol, IonGrid, IonInput, IonLabel, IonRow } from "@ionic/react";
import { Fragment } from "react";
import { useActions, useAppState } from "../overmind";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import "./NewRoutineContainer.css";
import NumberInput from "./NumberInput";
import TimeSelectionsQuickButtons from "./TimeSelectionsQuickButtons";
import Total from "./Total";

interface ContainerProps {}

const NewRoutineContainer: React.FC<ContainerProps> = () => {
  const { routine, name } = useAppState();
  const {
    addCountdown,
    addSet,
    addRecovery,
    addIteration,
    onDelete,
    onChangeNumberInput,
    getLabelForSet,
    updateName,
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
        {routine[0]?.type !== "countdown" && (
          <IonRow className="ion-padding">
            <IonCol size="11">
              <AddButton label="Countdown" onAdd={() => addCountdown()} />
              {routine.length === 0 && (
                <AddButton label="Set" onAdd={() => addSet({ index: 0 })} />
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
                  handleQuickButtonClick={(v) =>
                    onChangeNumberInput({ value: v, index })
                  }
                />
              </IonCol>
              <IonCol size="10">
                <NumberInput
                  label="Countdown"
                  value={r.value}
                  onChange={(v) => onChangeNumberInput({ value: v, index })}
                />
              </IonCol>
              <IonCol size="1">
                <DeleteButton onDelete={() => onDelete({ index })} />
              </IonCol>
              <IonCol size="11">
                <AddButton label="Set" onAdd={() => addSet({ index })} />
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
                  handleQuickButtonClick={(v) =>
                    onChangeNumberInput({ value: v, index })
                  }
                />
              </IonCol>
              <IonCol size="10">
                <NumberInput
                  label="Rest"
                  value={r.value}
                  onChange={(v) => onChangeNumberInput({ value: v, index })}
                />
              </IonCol>
              <IonCol size="1">
                <DeleteButton onDelete={() => onDelete({ index })} />
              </IonCol>
              <IonCol size="11">
                <AddButton label="Set" onAdd={() => addSet({ index })} />
              </IonCol>
            </IonRow>
          ) : r.type === "set" ? (
            <Fragment key={index}>
              <IonRow className="ion-padding">
                <IonCol>
                  <IonLabel>{getLabelForSet({ index })}</IonLabel>
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
                          onChangeNumberInput({
                            value: v,
                            index,
                            setIndex,
                            prop: "hang",
                          })
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
                          onChangeNumberInput({
                            value: v,
                            index,
                            setIndex,
                            prop: "rest",
                          })
                        }
                      />
                    </IonCol>

                    <IonCol size="5">
                      <NumberInput
                        label="Hang"
                        value={set.hang}
                        onChange={(v) =>
                          onChangeNumberInput({
                            value: v,
                            index,
                            setIndex,
                            prop: "hang",
                          })
                        }
                      />
                    </IonCol>
                    <IonCol size="5">
                      <NumberInput
                        label="Rest"
                        value={set.rest}
                        onChange={(v) =>
                          onChangeNumberInput({
                            value: v,
                            index,
                            setIndex,
                            prop: "rest",
                          })
                        }
                      />
                    </IonCol>

                    <IonCol size="1">
                      <DeleteButton
                        onDelete={() => onDelete({ index, setIndex })}
                      />
                    </IonCol>
                    <IonCol size="11">
                      <AddButton
                        label="Iteration"
                        onAdd={() => addIteration({ index, setIndex })}
                      />
                      {setIndex === r.value.length - 1 && (
                        <AddButton
                          label="Set"
                          onAdd={() => addSet({ index })}
                        />
                      )}
                      {setIndex === r.value.length - 1 &&
                        routine[index + 1]?.type !== "recovery" && (
                          <AddButton
                            label="Recovery"
                            onAdd={() => addRecovery({ index })}
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
            <Total />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewRoutineContainer;
