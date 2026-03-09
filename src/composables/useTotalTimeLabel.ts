import type { RoutineBlock } from '@/types'
import { computed, type Ref } from 'vue'

export function useTotalTimeLabel(countdown: Ref<number>, blocks: Ref<RoutineBlock[]>) {
  return computed(() => {
    const totalSeconds =
      countdown.value +
      blocks.value.reduce((total, set) => {
        if (set.type === 'recovery') {
          return set.duration + total
        }
        return set.hang + set.rest + total
      }, 0)

    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    const minutesStr = mins === 0 ? '' : mins === 1 ? '1 minute' : `${mins} minutes`
    const secondsStr = secs === 0 ? '' : secs === 1 ? '1 second' : `${secs} seconds`
    const humanReadable =
      minutesStr && secondsStr
        ? `${minutesStr} and ${secondsStr}`
        : minutesStr || secondsStr || '0 seconds'

    return `Total: ${totalSeconds} seconds | ${humanReadable}`
  })
}
