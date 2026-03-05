<script setup lang="ts">
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import type { RoutineBlock } from '@/types'

const OPTIONS = [10, 20, 30, 40, 50, 60] as const

const props = defineProps<{
  modelValue: RoutineBlock
}>()

const emit = defineEmits<{
  'update:modelValue': [value: RoutineBlock]
  remove: []
}>()

function updateIteration(hang?: number, rest?: number) {
  if (props.modelValue.type !== 'iteration') return
  emit('update:modelValue', {
    type: 'iteration',
    hang: hang ?? props.modelValue.hang,
    rest: rest ?? props.modelValue.rest,
  })
}

function updateRecovery(duration?: number) {
  if (props.modelValue.type !== 'recovery') return
  emit('update:modelValue', {
    type: 'recovery',
    duration: duration ?? props.modelValue.duration,
  })
}
</script>

<template>
  <div class="block-row">
    <template v-if="modelValue.type === 'iteration'">
      <span class="label">Iteration</span>
      <span>Hang:</span>
      <SelectButton
        :model-value="modelValue.hang"
        :options="OPTIONS.slice()"
        @update:model-value="(v: number) => updateIteration(v, undefined)"
      />
      <span>Rest:</span>
      <SelectButton
        :model-value="modelValue.rest"
        :options="OPTIONS.slice()"
        @update:model-value="(v: number) => updateIteration(undefined, v)"
      />
    </template>
    <template v-else>
      <span class="label">Recovery</span>
      <span>Duration:</span>
      <SelectButton
        :model-value="modelValue.duration"
        :options="OPTIONS.slice()"
        @update:model-value="(v: number) => updateRecovery(v)"
      />
    </template>
    <Button icon="pi pi-trash" severity="secondary" @click="emit('remove')" />
  </div>
</template>

<style scoped>
.block-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--p-border-color);
  border-radius: 4px;
}
.label {
  font-weight: 600;
  min-width: 5rem;
}
</style>
