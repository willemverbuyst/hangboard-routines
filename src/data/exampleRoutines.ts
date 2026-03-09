import type { Routine } from '@/types'

export const exampleRoutines: Routine[] = [
  {
    id: '5ec0f1a6-4306-4e85-be0a-ae040cd0f281',
    name: 'Example 1',
    countdown: 10,
    blocks: [
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'recovery', duration: 60 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'recovery', duration: 60 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'iteration', hang: 10, rest: 30 },
      { type: 'iteration', hang: 10, rest: 30 },
    ],
  },
]

export function getExampleRoutines(): Routine[] {
  return exampleRoutines
}

