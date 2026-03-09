import { getExampleRoutines } from '@/data/exampleRoutines'
import { getMyRoutines } from '@/services/storage'
import type { Routine } from '@/types'
import { ref, watch } from 'vue'

export type RoutineSource = 'my' | 'examples'

export function useRoutinesList() {
  const routineSource = ref<RoutineSource>('my')
  const routines = ref<Routine[]>([])

  function load() {
    if (routineSource.value === 'my') {
      routines.value = getMyRoutines()
    } else {
      routines.value = getExampleRoutines()
    }
  }

  watch(routineSource, load)

  return { routineSource, routines, load }
}
