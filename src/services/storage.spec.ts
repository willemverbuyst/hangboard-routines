import { getExampleRoutines } from '@/data/exampleRoutines'
import type { Routine } from '@/types'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  deleteRoutineById,
  getAllRoutines,
  getMyRoutines,
  getRoutineById,
  saveRoutine,
  setRoutines,
  STORAGE_KEY,
} from './storage'

function createRoutine(overrides: Partial<Routine> = {}): Routine {
  return {
    id: 'test-id',
    name: 'Test',
    countdown: 10,
    blocks: [{ type: 'iteration', hang: 7, rest: 53 }],
    ...overrides,
  }
}

describe('storage', () => {
  let store: Record<string, string>
  let originalLocalStorage: typeof globalThis.localStorage | undefined

  beforeEach(() => {
    store = {}
    originalLocalStorage = globalThis.localStorage
    globalThis.localStorage = {
      getItem(key: string) {
        return store[key] ?? null
      },
      setItem(key: string, value: string) {
        store[key] = value
      },
      removeItem(key: string) {
        delete store[key]
      },
      get length() {
        return Object.keys(store).length
      },
      key() {
        return null
      },
      clear() {
        store = {}
      },
    }
  })

  afterEach(() => {
    if (originalLocalStorage !== undefined) {
      globalThis.localStorage = originalLocalStorage
    }
  })

  describe('getMyRoutines', () => {
    it('returns empty array when nothing stored', () => {
      expect(getMyRoutines()).toEqual([])
    })

    it('returns stored routines when valid JSON array', () => {
      const routines = [createRoutine({ id: 'a' })]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routines))
      expect(getMyRoutines()).toEqual(routines)
    })

    it('returns empty array and removes key when value is not a JSON array', () => {
      // Parsed value is an object, not an array; implementation clears key and returns []
      localStorage.setItem(STORAGE_KEY, '{"id":"x"}')
      expect(getMyRoutines()).toEqual([])
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })

    it('returns empty array and removes key when value is invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, 'not json')
      expect(getMyRoutines()).toEqual([])
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe('setRoutines', () => {
    it('removes storage key when given empty array', () => {
      localStorage.setItem(STORAGE_KEY, '[]')
      setRoutines([])
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })

    it('stores routines as JSON when non-empty', () => {
      const routines = [createRoutine()]
      setRoutines(routines)
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(routines)
    })
  })

  describe('getAllRoutines', () => {
    it('returns example routines when no local routines', () => {
      const examples = getExampleRoutines()
      const first = examples[0]!
      const all = getAllRoutines()
      expect(all.length).toBeGreaterThanOrEqual(examples.length)
      expect(all.find((r) => r.id === first.id)).toEqual(first)
    })

    it('includes local routines not in examples', () => {
      const custom = createRoutine({ id: 'custom-only', name: 'My routine' })
      setRoutines([custom])
      const all = getAllRoutines()
      expect(all.find((r) => r.id === 'custom-only')).toEqual(custom)
    })

    it('does not duplicate by id when local has same id as example', () => {
      const example = getExampleRoutines()[0]!
      const localWithSameId = createRoutine({
        id: example.id,
        name: 'Overridden',
      })
      setRoutines([localWithSameId])
      const all = getAllRoutines()
      const withId = all.filter((r) => r.id === example.id)
      expect(withId).toHaveLength(1)
      expect(withId[0]).toEqual(example)
    })
  })

  describe('getRoutineById', () => {
    it('returns undefined for unknown id', () => {
      expect(getRoutineById('unknown')).toBeUndefined()
    })

    it('returns example routine by id', () => {
      const example = getExampleRoutines()[0]!
      const r = getRoutineById(example.id)
      expect(r).toEqual(example)
    })

    it('returns local routine by id', () => {
      const custom = createRoutine({ id: 'local-1', name: 'Local' })
      setRoutines([custom])
      expect(getRoutineById('local-1')).toEqual(custom)
    })
  })

  describe('saveRoutine', () => {
    it('appends new routine when id does not exist', () => {
      const routine = createRoutine({ id: 'new-1' })
      saveRoutine(routine)
      const my = getMyRoutines()
      expect(my).toHaveLength(1)
      expect(my[0]!).toEqual(routine)
    })

    it('updates existing routine when id exists', () => {
      const routine = createRoutine({ id: 'up-1', name: 'Original' })
      setRoutines([routine])
      saveRoutine({ ...routine, name: 'Updated' })
      const my = getMyRoutines()
      expect(my).toHaveLength(1)
      expect(my[0]!.name).toBe('Updated')
    })
  })

  describe('deleteRoutineById', () => {
    it('removes routine with given id', () => {
      setRoutines([createRoutine({ id: 'd1' }), createRoutine({ id: 'd2' })])
      deleteRoutineById('d1')
      const my = getMyRoutines()
      expect(my).toHaveLength(1)
      expect(my[0]!.id).toBe('d2')
    })

    it('clears storage when last routine is deleted', () => {
      setRoutines([createRoutine({ id: 'only' })])
      deleteRoutineById('only')
      expect(getMyRoutines()).toEqual([])
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })
})
