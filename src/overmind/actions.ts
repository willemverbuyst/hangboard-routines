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

export const updateSetHang = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  state.sets[index].hang = value;
};

export const updateSetRest = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  state.sets[index].rest = value;
};

export const updateSetIterations = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  state.sets[index].iterations = value;
};

export const updateSetRecovery = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  state.sets[index].recovery = value;
};

export const addSet = ({ state }: Context) => {
  state.sets.push({ hang: 10, rest: 50, iterations: 1, recovery: 60 });
}



