<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import BlockRow from '@/components/BlockRow.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useTotalTimeLabel } from '@/composables/useTotalTimeLabel'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: Routine
  mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Routine): void
  (e: 'cancel'): void
  (e: 'save'): void
}>()

const OPTIONS = [10, 20, 30, 40, 50, 60] as const

function updateRoutine(patch: Partial<Routine>) {
  emit('update:modelValue', {
    ...props.modelValue,
    ...patch,
  })
}

const name = computed({
  get: () => props.modelValue.name,
  set: (value: string) => {
    updateRoutine({ name: value })
  },
})

const countdown = computed({
  get: () => props.modelValue.countdown,
  set: (value: number) => {
    updateRoutine({ countdown: value })
  },
})

const blocks = computed<RoutineBlock[]>({
  get: () => props.modelValue.blocks,
  set: (value: RoutineBlock[]) => {
    updateRoutine({ blocks: value })
  },
})

function addIteration() {
  blocks.value = [...blocks.value, { type: 'iteration', hang: 10, rest: 50 }]
}

function addRecovery() {
  blocks.value = [...blocks.value, { type: 'recovery', duration: 60 }]
}

function removeBlock(index: number) {
  blocks.value = blocks.value.filter((_, i) => i !== index)
}

function updateBlock(index: number, block: RoutineBlock) {
  const next = [...blocks.value]
  next[index] = block
  blocks.value = next
}

const totalTimeLabel = useTotalTimeLabel(countdown, blocks)

const title = computed(() => (props.mode === 'create' ? 'New Routine' : 'Edit Routine'))

const namePlaceholder = computed(() =>
  props.mode === 'create' ? 'Name of new routine' : 'Name of routine',
)

function onCancel() {
  emit('cancel')
}

function onSave() {
  emit('save')
}
</script>

<template>
  <PageLayout :title="title">
    <Block title="Name">
      <InputText v-model="name" :placeholder="namePlaceholder" />
    </Block>
    <Block title="Countdown">
      <SelectButton v-model="countdown" :options="OPTIONS.slice()" />
    </Block>

    <BlockRow
      v-for="(block, i) in blocks"
      :key="i"
      :model-value="block"
      @update:model-value="(b) => updateBlock(i, b)"
      @remove="removeBlock(i)"
    />

    <section class="actions-container">
      <div class="actions">
        <Button severity="contrast" label="Add Iteration" @click="addIteration" />
        <Button severity="contrast" label="Add Recovery" @click="addRecovery" />
      </div>

      <p class="total-time">{{ totalTimeLabel }}</p>
      <div class="actions">
        <Button label="Cancel" severity="secondary" @click="onCancel" class="half-width-btn" />
        <Button label="Save Routine" @click="onSave" class="half-width-btn" />
      </div>
    </section>
  </PageLayout>
</template>

<style scoped>
.actions-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.total-time {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--p-text-muted-color);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions button {
  flex: 1 1 0;
}
</style>

