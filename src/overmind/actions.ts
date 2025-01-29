import { Context } from ".";
import { Iteration, Set } from "../components/types";

export const updateName = (
  { state }: Context,
  { value }: { value: string }
) => {
  state.name = value;
};

export const addCountdown = ({ state }: Context) => {
  state.routine = [{ type: "countdown", value: 10 }, ...state.routine];
};

export const addRecovery = (
  { state }: Context,
  { index }: { index: number }
) => {
  const newRoutine = [...state.routine];

  newRoutine.splice(index + 1, 0, { type: "recovery", value: 0 });
  state.routine = newRoutine;
};

export const addSet = ({ state }: Context, { index }: { index: number }) => {
  const newRoutine = [...state.routine];

  newRoutine.splice(index + 1, 0, {
    type: "set",
    value: [{ hang: 0, rest: 0 }],
  });
  state.routine = newRoutine;
};

export const addIteration = (
  { state }: Context,
  { index, setIndex }: { index: number; setIndex: number }
) => {
  const newRoutine = [...state.routine];
  const set = newRoutine[index] as Set;
  set.value.splice(setIndex + 1, 0, {
    ...set.value[setIndex],
  });

  state.routine = newRoutine;
};

export const onDelete = (
  { state }: Context,
  { index, setIndex }: { index: number; setIndex?: number }
) => {
  const newRoutine = [...state.routine];
  const item = newRoutine[index];

  if (item.type !== "set" || item.value.length === 1) {
    newRoutine.splice(index, 1);
  } else if (setIndex !== undefined) {
    item.value.splice(setIndex, 1);
  }

  state.routine = newRoutine;
};

export const getLabelForSet = (
  { state }: Context,
  { index }: { index: number }
) => {
  const set = state.routine[index] as Set;
  const iterations = set.value.length;
  const setsBeforeIndex = state.routine
    .slice(0, index)
    .filter((item) => item.type === "set").length;

  return `Set ${setsBeforeIndex + 1} - ${iterations} ${
    iterations === 1 ? "iteration" : "iterations"
  }`;
};

export const onChangeNumberInput = (
  { state }: Context,
  {
    value,
    index,
    setIndex,
    prop,
  }: { value: number; index: number; setIndex?: number; prop?: keyof Iteration }
) => {
  const newRoutine = [...state.routine];

  if (newRoutine[index].type === "set" && setIndex !== undefined && prop) {
    const set = newRoutine[index] as Set;
    const iteration = set.value[setIndex];

    iteration[prop] = value;
  } else {
    const item = newRoutine[index];
    item.value = value;
  }

  state.routine = newRoutine;
};
