export type Routine = {
  id: string
  name: string
  countdown: number
  blocks: RoutineBlock[]
}

export type RoutineBlock =
  | {
      type: 'iteration'
      hang: number
      rest: number
    }
  | {
      type: 'recovery'
      duration: number
    }
