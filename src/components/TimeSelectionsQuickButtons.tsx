import { IonButton } from "@ionic/react";
import { Iteration, Routine, Set } from "./types";

const TimeSelectionsQuickButtons = ({
  routine,
  index,
  setIndex,
  prop,
  handleQuickButtonClick,
}: {
  routine: Routine;
  index: number;
  setIndex?: number;
  prop?: keyof Iteration;
  handleQuickButtonClick: (
    time: number,
    index: number,
    setIndex?: number,
    prop?: keyof Iteration
  ) => void;
}) => {
  function getButtonColor(
    selectedTime: number,
    index: number,
    setIndex?: number,
    prop?: keyof Iteration
  ) {
    if (routine[index].type === "set" && setIndex !== undefined && prop) {
      return (routine[index] as Set).value[setIndex][prop] === selectedTime
        ? "success"
        : "light";
    }

    return routine[index].value === selectedTime ? "success" : "light";
  }

  return [10, 20, 30, 40, 50, 60].map((time) => (
    <IonButton
      key={time}
      color={getButtonColor(time, index, setIndex, prop)}
      size="small"
      onClick={() => handleQuickButtonClick(time, index, setIndex, prop)}
    >
      {time}
    </IonButton>
  ));
};

export default TimeSelectionsQuickButtons;
