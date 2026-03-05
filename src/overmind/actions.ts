import { Context } from ".";

export const updateName = (
  { state }: Context,
  { value }: { value: string },
) => {
  state.name = value;
};

export const updateCountdown = (
  { state }: Context,
  { value }: { value: number },
) => {
  state.countdown = value;
};

export const updateHang = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  if ("hang" in state.routine[index]) {
    state.routine[index].hang = value;
  }
};

export const updateRest = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  if ("rest" in state.routine[index]) {
    state.routine[index].rest = value;
  }
};

export const addRecovery = ({ state }: Context) => {
  state.routine.push({ recovery: 10 });
};

export const updateRecovery = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  if ("recovery" in state.routine[index]) {
    state.routine[index].recovery = value;
  }
};

export const addSet = ({ state }: Context) => {
  state.routine.push({ hang: 10, rest: 50 });
};

export const remove = ({ state }: Context, { index }: { index: number }) => {
  state.routine.splice(index, 1);
};
