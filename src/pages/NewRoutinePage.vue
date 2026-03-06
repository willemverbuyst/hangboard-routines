<script setup lang="ts">
import BlockRow from '@/components/BlockRow.vue'
import PageLayout from '@/components/PageLayout.vue'
import { saveRoutine } from '@/services/storage'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const OPTIONS = [10, 20, 30, 40, 50, 60] as const

const name = ref('Name of new routine')
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
    <div class="form">
      <Card>
        <template #title>Name</template>
        <template #content>
          <InputText v-model="name" />
        </template>
      </Card>
      <Card>
        <template #title>Countdown</template>
        <template #content>
          <SelectButton v-model="countdown" :options="OPTIONS.slice()" />
        </template>
      </Card>

      <BlockRow v-for="(block, i) in blocks" :key="i" :model-value="block"
        @update:model-value="(b) => updateBlock(i, b)" @remove="removeBlock(i)" />
      <section>
        <div class="actions">
          <Button severity="contrast" label="Add Iteration" @click="addIteration" />
          <Button severity="contrast" label="Add Recovery" @click="addRecovery" />
        </div>

        <Button label="Save Routine" @click="save" />
      </section>
    </div>
  </PageLayout>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
