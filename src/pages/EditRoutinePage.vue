<script setup lang="ts">
import BlockRow from '@/components/BlockRow.vue'
import PageLayout from '@/components/PageLayout.vue'
import { getRoutineById, saveRoutine } from '@/services/storage'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const OPTIONS = [10, 20, 30, 40, 50, 60] as const

const name = ref('')
const countdown = ref(10)
const blocks = ref<RoutineBlock[]>([])
const routineId = computed(() => route.params.id as string)

function load() {
  const id = routineId.value
  const routine = id ? getRoutineById(id) : undefined
  if (!routine) {
    router.replace({ name: 'My Routines' })
    return
  }
  name.value = routine.name
  countdown.value = routine.countdown
  blocks.value = [...routine.blocks]
}

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
    id: routineId.value,
    name: trimmed,
    countdown: countdown.value,
    blocks: [...blocks.value],
  }
  saveRoutine(routine)
  router.push({ name: 'My Routines' })
}

onMounted(load)
</script>

<template>
  <PageLayout title="Edit Routine">
    <div class="form">
      <label>Routine name</label>
      <InputText v-model="name" />
      <label>Countdown</label>
      <SelectButton v-model="countdown" :options="OPTIONS.slice()" />
      <Divider />
      <label>Blocks</label>
      <div class="blocks">
        <BlockRow
          v-for="(block, i) in blocks"
          :key="i"
          :model-value="block"
          @update:model-value="(b) => updateBlock(i, b)"
          @remove="removeBlock(i)"
        />
        <div class="block-actions">
          <Button label="Add Iteration" @click="addIteration" />
          <Button label="Add Recovery" @click="addRecovery" />
        </div>
      </div>
      <Button label="Save Routine" @click="save" />
    </div>
  </PageLayout>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.form label {
  font-weight: 600;
}
.blocks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.block-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
