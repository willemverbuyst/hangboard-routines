import { derived } from "overmind";

type State = {
  name: string;
  countdown: number;
  sets: Array<{
    hang: number;
    rest: number;
    iterations: number;
    recovery: number;
  }>;
  total: string;
};

export const state: State = {
  name: "New Routine",
  countdown: 10,
  sets: [{ hang: 10, rest: 50, iterations: 1, recovery: 60 }],
  total: derived((state: State) => {
    const totalSeconds =
      state.countdown +
      state.sets.reduce((total, set) => {
        return (set.hang + set.rest) * set.iterations + set.recovery + total;
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
