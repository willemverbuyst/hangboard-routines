import type { Routine } from '@/types'

const STORAGE_KEY = 'my-hangboard-app-routines'

export function getRoutines(): Routine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function setRoutines(routines: Routine[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routines))
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
