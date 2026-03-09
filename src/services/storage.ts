import type { Routine } from '@/types'

const STORAGE_KEY = 'my-hangboard-routines'

import { getExampleRoutines } from '@/data/exampleRoutines'

function getMyRoutinesFromStorage(): Routine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn(
        '[storage] Corrupted routines: expected an array, got',
        typeof parsed,
        '- clearing localStorage key',
        STORAGE_KEY
      )
      localStorage.removeItem(STORAGE_KEY)
      return []
    }
    return parsed
  } catch (err) {
    console.warn(
      '[storage] Failed to parse routines from localStorage:',
      err,
      '- clearing key',
      STORAGE_KEY
    )
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function getMyRoutines(): Routine[] {
  return getMyRoutinesFromStorage()
}

export function getAllRoutines(): Routine[] {
  const exampleRoutines = getExampleRoutines()
  const localRoutines = getMyRoutinesFromStorage()
  // Merge examples and local routines, avoid duplicate ids
  const all = [...exampleRoutines]
  for (const r of localRoutines) {
    if (!all.some((ex) => ex.id === r.id)) {
      all.push(r)
    }
  }
  return all
}

export function setRoutines(routines: Routine[]): void {
  if (routines.length === 0) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routines))
  }
}

export function getRoutineById(id: string): Routine | undefined {
  return getAllRoutines().find((r) => r.id === id)
}

export function saveRoutine(routine: Routine): void {
  const routines = getMyRoutines()
  const index = routines.findIndex((r) => r.id === routine.id)
  if (index >= 0) {
    routines[index] = routine
  } else {
    routines.push(routine)
  }
  setRoutines(routines)
}

export function deleteRoutineById(id: string): void {
  console.log('deleteRoutineById', id)
  setRoutines(getMyRoutines().filter((r) => r.id !== id))
}
