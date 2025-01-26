export type Iteration = {
  hang: number;
  rest: number;
};

export type Countdown = { type: "countdown"; value: number };
export type Recovery = { type: "recovery"; value: number };
export type Set = { type: "set"; value: Array<Iteration> };

export type Routine = Array<Set | Countdown | Recovery>;
