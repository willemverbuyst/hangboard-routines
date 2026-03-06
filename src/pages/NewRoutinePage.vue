<script setup lang="ts">
import Block from '@/components/Block.vue'
import BlockRow from '@/components/BlockRow.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useTotalTimeLabel } from '@/composables/useTotalTimeLabel'
import { saveRoutine } from '@/services/storage'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const OPTIONS = [10, 20, 30, 40, 50, 60] as const

const name = ref('')
const countdown = ref(10)
const blocks = ref<RoutineBlock[]>([
  { type: 'iteration', hang: 10, rest: 50 },
  { type: 'recovery', duration: 60 },
])

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

function cancel() {
  router.push({ name: 'My Routines' })
}

function save() {
  const trimmed = name.value.trim()
  if (!trimmed) return
  const routine: Routine = {
    id: crypto.randomUUID(),
    name: trimmed,
    countdown: countdown.value,
    blocks: [...blocks.value],
  }
  saveRoutine(routine)
  router.push({ name: 'My Routines' })
}
</script>

<template>
  <PageLayout title="New Routine">
    <Block title="Name">
      <InputText v-model="name" placeholder="Name of new routine" />
    </Block>
    <Block title="Countdown">
      <SelectButton v-model="countdown" :options="OPTIONS.slice()" />
    </Block>

    <BlockRow v-for="(block, i) in blocks" :key="i" :model-value="block" @update:model-value="(b) => updateBlock(i, b)"
      @remove="removeBlock(i)" />
    <section class="actions-container">
      <div class="actions">
        <Button severity="contrast" label="Add Iteration" @click="addIteration" />
        <Button severity="contrast" label="Add Recovery" @click="addRecovery" />
      </div>

      <p class="total-time">{{ totalTimeLabel }}</p>
      <div class="actions">
        <Button label="Cancel" severity="secondary" @click="cancel" class="half-width-btn" />
        <Button label="Save Routine" @click="save" class="half-width-btn" />
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
