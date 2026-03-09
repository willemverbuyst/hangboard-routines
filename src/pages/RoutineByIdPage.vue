<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import PageLayout from '@/components/PageLayout.vue'
import { getRoutineById } from '@/services/storage'
import type { Routine } from '@/types'
import { formatDuration, routineTotalFormatted as formatRoutineTotal } from '@/utils/duration'
import Button from 'primevue/button'
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type StageType = 'countdown' | 'hang' | 'rest' | 'recovery'

type Stage = {
  type: StageType
  duration: number
}

type DisplayStep = {
  label: string
  value: string
  stageIndex: number | null
}

const route = useRoute()

const routine = computed<Routine | undefined>(() => {
  const rawId = route.params.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  if (!id) {
    return undefined
  }

  return getRoutineById(id)
})

const pageTitle = computed(() => (routine.value ? routine.value.name : 'Routine not found'))

function routineTotalFormatted(r?: Routine): string {
  return r ? formatRoutineTotal(r) : '--'
}

const stages = computed<Stage[]>(() => {
  const current = routine.value
  if (!current) return []

  const result: Stage[] = []

  if (current.countdown > 0) {
    result.push({ type: 'countdown', duration: current.countdown })
  }

  for (const block of current.blocks) {
    if (block.type === 'iteration') {
      if (block.hang > 0) {
        result.push({ type: 'hang', duration: block.hang })
      }
      if (block.rest > 0) {
        result.push({ type: 'rest', duration: block.rest })
      }
    } else if (block.type === 'recovery') {
      if (block.duration > 0) {
        result.push({ type: 'recovery', duration: block.duration })
      }
    }
  }

  return result
})

const status = ref<'idle' | 'running' | 'paused' | 'finished'>('idle')
const currentStageIndex = ref(0)
const remainingSeconds = ref<number | null>(null)
const timerId = ref<number | null>(null)

const hasRoutine = computed(() => !!routine.value)
const totalStages = computed(() => stages.value.length)

const currentStage = computed<Stage | null>(() => {
  const list = stages.value
  if (!list.length) return null
  const index = currentStageIndex.value
  if (index < 0 || index >= list.length) return null
  return list[index] ?? null
})

const displaySteps = computed<DisplayStep[]>(() => {
  const currentRoutine = routine.value
  const stageList = stages.value

  if (!currentRoutine) return []

  const items: DisplayStep[] = []
  let stageCursor = 0

  const takeStageIndex = (type: StageType, hasDuration: boolean): number | null => {
    if (!hasDuration) return null

    while (stageCursor < stageList.length) {
      const idx = stageCursor
      const stage = stageList[stageCursor]!
      stageCursor += 1

      if (stage.type === type) {
        return idx
      }
    }

    return null
  }

  const countdownSeconds = currentRoutine.countdown ?? 0
  items.push({
    label: 'Countdown',
    value: formatDuration(countdownSeconds),
    stageIndex: takeStageIndex('countdown', countdownSeconds > 0),
  })

  for (const block of currentRoutine.blocks) {
    if (block.type === 'iteration') {
      const hangSeconds = block.hang ?? 0
      items.push({
        label: 'Hang',
        value: `${hangSeconds}s`,
        stageIndex: takeStageIndex('hang', hangSeconds > 0),
      })

      const restSeconds = block.rest ?? 0
      items.push({
        label: 'Rest',
        value: `${restSeconds}s`,
        stageIndex: takeStageIndex('rest', restSeconds > 0),
      })
    } else if (block.type === 'recovery') {
      const recoverySeconds = block.duration ?? 0
      items.push({
        label: 'Recovery',
        value: `${recoverySeconds}s`,
        stageIndex: takeStageIndex('recovery', recoverySeconds > 0),
      })
    }
  }

  return items
})

const stageTitle = computed(() => {
  if (!hasRoutine.value) return 'Routine not found'

  const stage = currentStage.value

  if (!stage || status.value === 'idle') {
    return ''
  }

  switch (stage.type) {
    case 'countdown':
      return 'Countdown'
    case 'hang':
      return 'Hang'
    case 'rest':
      return 'Rest'
    case 'recovery':
      return 'Recovery'
    default:
      return ''
  }
})

const remainingSecondsDisplay = computed(() => {
  if (!hasRoutine.value || !totalStages.value) return '--'

  if (remainingSeconds.value == null) {
    const first = stages.value[0]
    return first ? first.duration : 0
  }

  return remainingSeconds.value
})

const canStart = computed(
  () =>
    hasRoutine.value &&
    totalStages.value > 0 &&
    (status.value === 'idle' || status.value === 'paused' || status.value === 'finished'),
)
const canPause = computed(() => status.value === 'running')
const canStop = computed(
  () => status.value === 'running' || status.value === 'paused' || status.value === 'finished',
)

function clearTimer() {
  if (timerId.value != null) {
    window.clearInterval(timerId.value)
    timerId.value = null
  }
}

function resetToStart() {
  const list = stages.value
  if (!list.length) {
    currentStageIndex.value = 0
    remainingSeconds.value = null
    return
  }

  currentStageIndex.value = 0
  remainingSeconds.value = list[0]?.duration ?? null
}

function tick() {
  if (status.value !== 'running') return

  const list = stages.value
  if (!list.length) {
    clearTimer()
    status.value = 'idle'
    remainingSeconds.value = null
    return
  }

  if (remainingSeconds.value == null) {
    remainingSeconds.value = list[currentStageIndex.value]?.duration ?? 0
  }

  if ((remainingSeconds.value ?? 0) > 1) {
    remainingSeconds.value = (remainingSeconds.value ?? 1) - 1
    return
  }

  const nextIndex = currentStageIndex.value + 1

  if (nextIndex >= list.length) {
    remainingSeconds.value = 0
    clearTimer()
    status.value = 'finished'
    return
  }

  currentStageIndex.value = nextIndex
  remainingSeconds.value = list[nextIndex]?.duration ?? 0
}

function startRoutine() {
  if (!canStart.value) return

  if (status.value === 'idle' || status.value === 'finished') {
    resetToStart()
  }

  status.value = 'running'
  clearTimer()
  timerId.value = window.setInterval(tick, 1000)
}

function pauseRoutine() {
  if (!canPause.value) return
  clearTimer()
  status.value = 'paused'
}

function stopRoutine() {
  if (!canStop.value) return
  clearTimer()
  status.value = 'idle'
  resetToStart()
}

watch(
  () => stages.value,
  () => {
    clearTimer()
    status.value = 'idle'
    resetToStart()
  },
  { immediate: true },
)

onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <PageLayout :title="pageTitle">
    <Block :title="stageTitle">
      <template v-if="status === 'finished' || status === 'idle'">
        <p>Press start to begin the routine.</p>
      </template>
      <template v-else-if="hasRoutine && totalStages">
        <div class="timer">
          <div class="timer-value">
            {{ remainingSecondsDisplay }}
          </div>
        </div>
      </template>
      <div v-if="hasRoutine" class="routine-steps">
        <div
          v-for="(step, i) in displaySteps"
          :key="i"
          class="step"
          style="position: relative; min-height: 1.5em"
        >
          <span
            v-if="step.stageIndex !== null"
            style="
              position: absolute;
              left: 0.2em;
              top: 0.4em;
              width: 1em;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              height: 100%;
            "
            aria-hidden="true"
          >
            <span
              v-if="
                step.stageIndex === currentStageIndex && status !== 'idle' && status !== 'finished'
              "
              class="step-indicator"
              style="position: relative; top: 0.1em"
            ></span>
          </span>
          <span class="step-title" :style="{ marginLeft: '1.3em' }">{{ step.label }}</span>
          <span class="step-value">{{ step.value }}</span>
        </div>
        <div class="step total-time">
          <span class="step-title">Total</span>
          <span class="step-value">{{ routineTotalFormatted(routine) }}</span>
        </div>
      </div>

      <template v-else>
        <p>Routine not found. Please go back to My Routines.</p>
      </template>
      <template v-if="hasRoutine && totalStages" #footer>
        <Button icon="pi pi-play" label="Start" @click="startRoutine" :disabled="!canStart" />
        <Button icon="pi pi-pause" label="Pause" @click="pauseRoutine" :disabled="!canPause" />
        <Button
          icon="pi pi-stop"
          label="Stop"
          severity="secondary"
          @click="stopRoutine"
          :disabled="!canStop"
        />
      </template>
    </Block>
    <Button icon="pi pi-list" label="My Routines" @click="$router.push({ name: 'Routines' })" />
  </PageLayout>
</template>

<style scoped>
.timer-value {
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-align: center;
  color: var(--p-primary-color, #2563eb);
  margin-bottom: 0.5rem;
}

.routine-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.step-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background-color: var(--p-primary-color, #22c55e);
}

.step-title {
  font-weight: 800;
}

.step-value {
  font-weight: 500;
}

.total-time {
  margin: 0.25rem 0 0;
  padding: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--p-text-muted-color);
  text-align: center;
  border-top: 1px solid var(--p-surface-200);
}
</style>
