import { IonText } from "@ionic/react";
import { Routine } from "./types";

const Total = ({ routine }: { routine: Routine }) => {
  const totalSeconds = routine.reduce((total, set) => {
    switch (set.type) {
      case "countdown":
      case "recovery":
        return total + set.value;

      case "set":
      default:
        return (
          total +
          set.value.reduce(
            (setTotal, iteration) => setTotal + iteration.hang + iteration.rest,
            0
          )
        );
    }
  }, 0);

  return (
    <IonText color="medium">
      Total:&nbsp;
      {totalSeconds} seconds | {Math.ceil(totalSeconds / 60)} minutes
      {totalSeconds % 60 === 0 ? "" : ` and ${totalSeconds % 60} seconds`}
    </IonText>
  );
};

export default Total;
