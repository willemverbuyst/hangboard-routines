import { derived } from "overmind";
import { Countdown, Recovery, Set } from "../components/types";

type State = {
  routine: Array<Countdown | Set | Recovery>;
  total: string;
};

export const state: State = {
  routine: [
    { type: "countdown", value: 10 },
    {
      type: "set",
      value: [{ hang: 0, rest: 0 }],
    },
  ],
  total: derived((state: State) => {
    const totalSeconds = state.routine.reduce((total, set) => {
      switch (set.type) {
        case "countdown":
        case "recovery":
          return total + set.value;

        case "set":
        default:
          return (
            total +
            set.value.reduce(
              (setTotal, iteration) =>
                setTotal + iteration.hang + iteration.rest,
              0
            )
          );
      }
    }, 0);

    const minutes =
      Math.floor(totalSeconds / 60) === 1
        ? "1 minute"
        : `${Math.floor(totalSeconds / 60)} minutes`;
    const secondes =
      totalSeconds % 60 === 0 ? "" : `and ${totalSeconds % 60} seconds`;

    return `Total: ${totalSeconds} seconds | ${minutes} ${secondes}`;
  }),
};
