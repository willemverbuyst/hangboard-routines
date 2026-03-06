<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import type { RoutineBlock } from '@/types'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'

const OPTIONS = [10, 20, 30, 40, 50, 60] as const

const props = defineProps<{
  modelValue: RoutineBlock
  canMoveUp?: boolean
  canMoveDown?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: RoutineBlock]
  remove: []
  moveUp: []
  moveDown: []
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
  <template v-if="modelValue.type === 'iteration'">
    <Block title="Hang - Rest">
      <SelectButton
        :model-value="modelValue.hang"
        :options="OPTIONS.slice()"
        @update:model-value="(v: number) => updateIteration(v, undefined)"
      />

      <SelectButton
        :model-value="modelValue.rest"
        :options="OPTIONS.slice()"
        @update:model-value="(v: number) => updateIteration(undefined, v)"
      />
      <template #footer>
        <Button
          icon="pi pi-arrow-up"
          severity="secondary"
          :disabled="!canMoveUp"
          @click="emit('moveUp')"
        />
        <Button
          icon="pi pi-arrow-down"
          severity="secondary"
          :disabled="!canMoveDown"
          @click="emit('moveDown')"
        />
        <Button icon="pi pi-trash" severity="danger" @click="emit('remove')" />
      </template>
    </Block>
  </template>
  <template v-else>
    <Block title="Recovery">
      <SelectButton
        :model-value="modelValue.duration"
        :options="OPTIONS.slice()"
        @update:model-value="(v: number) => updateRecovery(v)"
      />
      <template #footer>
        <Button
          icon="pi pi-arrow-up"
          severity="secondary"
          :disabled="!canMoveUp"
          @click="emit('moveUp')"
        />
        <Button
          icon="pi pi-arrow-down"
          severity="secondary"
          :disabled="!canMoveDown"
          @click="emit('moveDown')"
        />
        <Button severity="danger" icon="pi pi-trash" @click="emit('remove')" />
      </template>
    </Block>
  </template>
</template>
