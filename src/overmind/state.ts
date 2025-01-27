import { Countdown, Recovery, Set } from "../components/types";

type State = {
  routine: Array<Countdown | Set | Recovery>;
};

export const state: State = {
  routine: [
    { type: "countdown", value: 10 },
    {
      type: "set",
      value: [{ hang: 0, rest: 0 }],
    },
  ],
};
