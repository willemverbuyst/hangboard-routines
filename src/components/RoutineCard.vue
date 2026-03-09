<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import { formatDuration, routineTotalFormatted } from '@/utils/duration'
import type { Routine } from '@/types'
import Button from 'primevue/button'

defineProps<{
  routine: Routine
  isExamplesSource: boolean
}>()

const emit = defineEmits<{
  select: [routine: Routine]
  edit: [id: string]
  delete: [id: string]
  'add-to-my-routines': [routine: Routine]
}>()
</script>

<template>
  <Block class="routine-card">
    <template #title>{{ routine.name }}</template>
    <div class="routine-steps">
      <div class="step">
        <span class="step-title">Countdown</span>
        <span class="step-value">{{ formatDuration(routine.countdown) }}</span>
      </div>
      <div v-for="(block, i) in routine.blocks" :key="i">
        <template v-if="block.type === 'iteration'">
          <div class="step">
            <span class="step-title">Hang</span>
            <span class="step-value">{{ block.hang }}s</span>
          </div>
          <div class="step">
            <span class="step-title">Rest</span>
            <span class="step-value">{{ block.rest }}s</span>
          </div>
        </template>
        <template v-else-if="block.type === 'recovery'">
          <div class="step">
            <span class="step-title">Recovery</span>
            <span class="step-value">{{ block.duration }}s</span>
          </div>
        </template>
      </div>
      <div class="step total-time">
        <span class="step-title">Total</span>
        <span class="step-value">{{ routineTotalFormatted(routine) }}</span>
      </div>
    </div>
    <template #footer>
      <Button
        label="Select"
        severity="secondary"
        icon="pi pi-check"
        @click="emit('select', routine)"
      />
      <Button
        v-if="!isExamplesSource"
        label="Edit"
        severity="secondary"
        icon="pi pi-pencil"
        @click="emit('edit', routine.id)"
      />
      <Button
        v-if="!isExamplesSource"
        label="Delete"
        icon="pi pi-trash"
        severity="secondary"
        @click="emit('delete', routine.id)"
      />
      <Button
        v-if="isExamplesSource"
        label="Add to My Routines"
        icon="pi pi-plus"
        severity="secondary"
        @click="emit('add-to-my-routines', routine)"
      />
    </template>
  </Block>
</template>

<style scoped>
.routine-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
}

.step {
  display: flex;
  gap: 0.25rem;
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
