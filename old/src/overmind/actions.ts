import { Context } from ".";

export const updateName = (
  { state }: Context,
  { value }: { value: string },
) => {
  state.newRoutine.name = value;
};

export const updateCountdown = (
  { state }: Context,
  { value }: { value: number },
) => {
  state.newRoutine.countdown = value;
};

export const updateHang = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  if ("hang" in state.newRoutine.routine[index]) {
    state.newRoutine.routine[index].hang = value;
  }
};

export const updateRest = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  if ("rest" in state.newRoutine.routine[index]) {
    state.newRoutine.routine[index].rest = value;
  }
};

export const addRecovery = ({ state }: Context) => {
  state.newRoutine.routine.push({ recovery: 10 });
};

export const updateRecovery = (
  { state }: Context,
  { index, value }: { index: number; value: number },
) => {
  if ("recovery" in state.newRoutine.routine[index]) {
    state.newRoutine.routine[index].recovery = value;
  }
};

export const addSet = ({ state }: Context) => {
  state.newRoutine.routine.push({ hang: 10, rest: 50 });
};

export const remove = ({ state }: Context, { index }: { index: number }) => {
  state.newRoutine.routine.splice(index, 1);
};

export const saveRoutine = ({ state }: Context) => {
  const newRoutine = state.newRoutine;
  state.myRoutines = [...state.myRoutines, newRoutine];

  localStorage.setItem("myRoutines", JSON.stringify(state.myRoutines));
};
