<script setup lang="ts">
import type { RoutineBlock } from '@/types';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';

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
      <section class="block-section iteration-section">
        <header>
          <h2 class="block-main-label">Iteration</h2>
        </header>
        <div class="block-row-item">
          <label class="block-label" for="iteration-hang">Hang:</label>
          <SelectButton id="iteration-hang" :model-value="modelValue.hang" :options="OPTIONS.slice()"
            @update:model-value="(v: number) => updateIteration(v, undefined)" />
        </div>
        <div class="block-row-item">
          <label class="block-label" for="iteration-rest">Rest:</label>
          <SelectButton id="iteration-rest" :model-value="modelValue.rest" :options="OPTIONS.slice()"
            @update:model-value="(v: number) => updateIteration(undefined, v)" />
        </div>
      </section>
    </template>
    <template v-else>
      <section class="block-section recovery-section">
        <header>
          <h2 class="block-main-label">Recovery</h2>
        </header>
        <div class="block-row-item">
          <label class="block-label" for="recovery-duration">Duration:</label>
          <SelectButton :model-value="modelValue.duration" :options="OPTIONS.slice()"
            @update:model-value="(v: number) => updateRecovery(v)" />
        </div>
      </section>
    </template>
    <Button icon="pi pi-trash" severity="secondary" @click="emit('remove')" />
  </div>
</template>

<style scoped>
.block-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-row-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.block-label {
  font-weight: 600;
  min-width: 5rem;
}

.block-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--p-border-color);
  border-radius: 4px;
}
</style>
