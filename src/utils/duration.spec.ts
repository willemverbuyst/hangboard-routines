import type { Routine, RoutineBlock } from '@/types'
import { describe, expect, it } from 'vitest'
import { formatDuration, routineTotalFormatted, totalSecondsForBlock } from './duration'

describe('totalSecondsForBlock', () => {
  it('returns duration for recovery block', () => {
    const block: RoutineBlock = { type: 'recovery', duration: 45 }
    expect(totalSecondsForBlock(block)).toBe(45)
  })

  it('returns hang + rest for iteration block', () => {
    const block: RoutineBlock = { type: 'iteration', hang: 7, rest: 53 }
    expect(totalSecondsForBlock(block)).toBe(60)
  })
})

describe('formatDuration', () => {
  it('formats seconds only when under 60', () => {
    expect(formatDuration(0)).toBe('0s')
    expect(formatDuration(30)).toBe('30s')
    expect(formatDuration(59)).toBe('59s')
  })

  it('formats minutes only when seconds are zero', () => {
    expect(formatDuration(60)).toBe('1 min')
    expect(formatDuration(120)).toBe('2 min')
    expect(formatDuration(300)).toBe('5 min')
  })

  it('formats minutes and seconds', () => {
    expect(formatDuration(61)).toBe('1m 1s')
    expect(formatDuration(90)).toBe('1m 30s')
    expect(formatDuration(125)).toBe('2m 5s')
  })
})

describe('routineTotalFormatted', () => {
  it('returns countdown only when no blocks', () => {
    const routine: Routine = {
      id: '1',
      name: 'Test',
      countdown: 10,
      blocks: [],
    }
    expect(routineTotalFormatted(routine)).toBe('10s')
  })

  it('sums countdown and iteration block (hang + rest)', () => {
    const routine: Routine = {
      id: '1',
      name: 'Test',
      countdown: 5,
      blocks: [{ type: 'iteration', hang: 7, rest: 53 }],
    }
    expect(routineTotalFormatted(routine)).toBe('1m 5s')
  })

  it('sums countdown and recovery block', () => {
    const routine: Routine = {
      id: '1',
      name: 'Test',
      countdown: 0,
      blocks: [{ type: 'recovery', duration: 60 }],
    }
    expect(routineTotalFormatted(routine)).toBe('1 min')
  })

  it('sums countdown and multiple blocks', () => {
    const routine: Routine = {
      id: '1',
      name: 'Test',
      countdown: 10,
      blocks: [
        { type: 'iteration', hang: 7, rest: 53 },
        { type: 'recovery', duration: 30 },
      ],
    }
    expect(routineTotalFormatted(routine)).toBe('1m 40s')
  })
})
