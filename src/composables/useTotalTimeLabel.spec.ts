import type { RoutineBlock } from '@/types'
import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { useTotalTimeLabel } from './useTotalTimeLabel'

describe('useTotalTimeLabel', () => {
  it('countdown only: returns label with seconds and human-readable', () => {
    const countdown = ref(10)
    const blocks = ref([])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toBe('Total: 10 seconds | 10 seconds')
  })

  it('zero countdown and no blocks: returns 0 seconds', () => {
    const countdown = ref(0)
    const blocks = ref([])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toBe('Total: 0 seconds | 0 seconds')
  })

  it('includes iteration block time (hang + rest)', () => {
    const countdown = ref(10)
    const blocks = ref([{ type: 'iteration' as const, hang: 10, rest: 50 }])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toContain('Total: 70 seconds')
    expect(totalTimeLabel.value).toContain('1 minute and 10 seconds')
  })

  it('includes recovery block time', () => {
    const countdown = ref(0)
    const blocks = ref([{ type: 'recovery' as const, duration: 60 }])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toContain('Total: 60 seconds')
    expect(totalTimeLabel.value).toContain('1 minute')
  })

  it('mixed blocks: sums countdown, iterations and recovery', () => {
    const countdown = ref(20)
    const blocks = ref([
      { type: 'iteration' as const, hang: 5, rest: 25 },
      { type: 'recovery' as const, duration: 30 },
    ])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toContain('Total: 80 seconds')
    expect(totalTimeLabel.value).toContain('1 minute and 20 seconds')
  })

  it('pluralization: 1 minute and 1 second (no trailing s)', () => {
    const countdown = ref(0)
    const blocks = ref([{ type: 'iteration' as const, hang: 30, rest: 31 }])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toContain('1 minute and 1 second')
  })

  it('is reactive to countdown changes', () => {
    const countdown = ref(10)
    const blocks = ref([])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toContain('10 seconds')

    countdown.value = 30
    expect(totalTimeLabel.value).toContain('30 seconds')
  })

  it('is reactive to blocks changes', () => {
    const countdown = ref(0)
    const blocks = ref<RoutineBlock[]>([])
    const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

    expect(totalTimeLabel.value).toContain('0 seconds')

    blocks.value = [{ type: 'recovery', duration: 45 }]
    expect(totalTimeLabel.value).toContain('45 seconds')
  })
})
