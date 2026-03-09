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
  {
    id: 'f9a3b9c2-7c1a-4b3c-9e13-2b4f7d0d9b21',
    name: 'Example 2',
    countdown: 20,
    blocks: [
      { type: 'iteration', hang: 20, rest: 40 },
      { type: 'iteration', hang: 20, rest: 40 },
      { type: 'recovery', duration: 60 },
      { type: 'iteration', hang: 30, rest: 30 },
      { type: 'iteration', hang: 30, rest: 30 },
      { type: 'recovery', duration: 40 },
      { type: 'iteration', hang: 20, rest: 20 },
      { type: 'iteration', hang: 20, rest: 20 },
    ],
  },
  {
    id: 'b1c4d7e8-92ab-4c3d-8f6e-1a2b3c4d5e6f',
    name: 'Example 3',
    countdown: 30,
    blocks: [
      { type: 'iteration', hang: 10, rest: 20 },
      { type: 'iteration', hang: 10, rest: 20 },
      { type: 'iteration', hang: 20, rest: 30 },
      { type: 'recovery', duration: 50 },
      { type: 'iteration', hang: 30, rest: 40 },
      { type: 'iteration', hang: 30, rest: 40 },
      { type: 'recovery', duration: 60 },
      { type: 'iteration', hang: 20, rest: 30 },
    ],
  },
]

export function getExampleRoutines(): Routine[] {
  return exampleRoutines
}

