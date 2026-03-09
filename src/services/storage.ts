import type { Routine } from '@/types'

const STORAGE_KEY = 'my-hangboard-routines'

import { getExampleRoutines } from '@/data/exampleRoutines'

export function getRoutines(): Routine[] {
  const exampleRoutines = getExampleRoutines()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // Only examples if nothing in localStorage
      return [...exampleRoutines]
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn(
        '[storage] Corrupted routines: expected an array, got',
        typeof parsed,
        '- clearing localStorage key',
        STORAGE_KEY
      )
      localStorage.removeItem(STORAGE_KEY)
      return [...exampleRoutines]
    }
    const localRoutines = parsed
    // Merge examples and local routines, avoid duplicate ids
    const all = [...exampleRoutines]
    for (const r of localRoutines) {
      if (!all.some((ex) => ex.id === r.id)) {
        all.push(r)
      }
    }
    return all
  } catch (err) {
    console.warn(
      '[storage] Failed to parse routines from localStorage:',
      err,
      '- clearing key',
      STORAGE_KEY
    )
    localStorage.removeItem(STORAGE_KEY)
    return [...exampleRoutines]
  }
}

export function setRoutines(routines: Routine[]): void {
  if (routines.length === 0) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routines))
  }
}

export function getRoutineById(id: string): Routine | undefined {
  return getRoutines().find((r) => r.id === id)
}

export function saveRoutine(routine: Routine): void {
  const routines = getRoutines()
  const index = routines.findIndex((r) => r.id === routine.id)
  if (index >= 0) {
    routines[index] = routine
  } else {
    routines.push(routine)
  }
  setRoutines(routines)
}

export function deleteRoutineById(id: string): void {
  setRoutines(getRoutines().filter((r) => r.id !== id))
}
