import { derived } from "overmind";

type State = {
  name: string;
  countdown: number;
  routine: Array<{
    hang: number;
    rest: number;
  } | { recovery: number }>;
  total: string;
};

export const state: State = {
  name: "New Routine",
  countdown: 10,
  routine: [{ hang: 10, rest: 50,}],
  total: derived((state: State) => {
    const totalSeconds =
      state.countdown +
      state.routine.reduce((total, set) => {
        if ("recovery" in set) {
          return set.recovery + total;
        } 
        return set.hang + set.rest + total;
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
