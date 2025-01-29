import { IonText } from "@ionic/react";
import { useAppState } from "../overmind";

const Total = () => {
  const { total } = useAppState();

  return <IonText color="medium">{total}</IonText>;
};

export default Total;
