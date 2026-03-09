<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import PageLayout from '@/components/PageLayout.vue'
import { getExampleRoutines } from '@/data/exampleRoutines'
import { deleteRoutineById, getRoutines, saveRoutine } from '@/services/storage'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

type RoutineSource = 'my' | 'examples'

const router = useRouter()
const routineSource = ref<RoutineSource>('my')
const routines = ref<Routine[]>([])
const showDeleteConfirm = ref(false)
const routineIdToDelete = ref<string | null>(null)
const routineNameToDelete = ref('')

const sourceOptions = [
  { label: 'My routines', value: 'my' as const },
  { label: 'Examples', value: 'examples' as const },
]

const isExamplesSource = computed(() => routineSource.value === 'examples')

function load() {
  if (routineSource.value === 'my') {
    routines.value = getRoutines()
  } else {
    routines.value = getExampleRoutines()
  }
}

function onEdit(id: string) {
  router.push({ name: 'Edit Routine', params: { id } })
}

function askDelete(id: string) {
  const routine = routines.value.find((r) => r.id === id)
  routineNameToDelete.value = routine?.name ?? ''
  routineIdToDelete.value = id
  showDeleteConfirm.value = true
}

function confirmDelete() {
  if (routineIdToDelete.value) {
    deleteRoutineById(routineIdToDelete.value)
    load()
  }
  showDeleteConfirm.value = false
  routineIdToDelete.value = null
  routineNameToDelete.value = ''
}

function cancelDelete() {
  showDeleteConfirm.value = false
  routineIdToDelete.value = null
  routineNameToDelete.value = ''
}

function onCreateNew() {
  router.push({ name: 'New Routine' })
}

function createRoutineId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function onSelect(routine: Routine) {
  if (routineSource.value === 'examples') {
    const cloned: Routine = {
      ...routine,
      id: createRoutineId(),
    }
    saveRoutine(cloned)
    router.push({ name: 'Routine', params: { id: cloned.id } })
  } else {
    router.push({ name: 'Routine', params: { id: routine.id } })
  }
}

function totalSecondsForBlock(block: RoutineBlock): number {
  if (block.type === 'recovery') return block.duration
  return block.hang + block.rest
}

function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  if (mins === 0) return `${secs}s`
  if (secs === 0) return mins === 1 ? '1 min' : `${mins} min`
  return `${mins}m ${secs}s`
}

function routineTotalFormatted(r: Routine): string {
  const totalSeconds = r.countdown + r.blocks.reduce((sum, b) => sum + totalSecondsForBlock(b), 0)
  return formatDuration(totalSeconds)
}

watch(routineSource, () => {
  load()
})

onMounted(load)
</script>

<template>
  <PageLayout title="Routines">
    <div class="top-actions">
      <SelectButton
        v-model="routineSource"
        :options="sourceOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <template v-if="routines.length === 0">
      <Block title="No routines yet">
        <Button label="Create New Routine" @click="onCreateNew" />
      </Block>
    </template>
    <template v-else>
      <div class="routine-list">
        <Block v-for="r in routines" :key="r.id" class="routine-card">
          <template #title>{{ r.name }}</template>
          <div class="routine-steps">
            <div class="step">
              <span class="step-title">Countdown</span>
              <span class="step-value">{{ formatDuration(r.countdown) }}</span>
            </div>
            <div v-for="(block, i) in r.blocks" :key="i">
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
              <span class="step-value">{{ routineTotalFormatted(r) }}</span>
            </div>
          </div>
          <template #footer>
            <Button
              :label="isExamplesSource ? 'Use Template' : 'Select'"
              severity="secondary"
              icon="pi pi-check"
              @click="onSelect(r)"
            />
            <Button
              v-if="!isExamplesSource"
              label="Edit"
              severity="secondary"
              icon="pi pi-pencil"
              @click="onEdit(r.id)"
            />
            <Button
              v-if="!isExamplesSource"
              label="Delete"
              icon="pi pi-trash"
              severity="secondary"
              @click="askDelete(r.id)"
            />
          </template>
        </Block>
      </div>
    </template>
    <div v-if="showDeleteConfirm" class="modal-backdrop">
      <div class="modal">
        <h2 class="modal-title">Delete routine?</h2>
        <p class="modal-text">
          Are you sure you want to delete
          <span v-if="routineNameToDelete" class="modal-routine-name"
            >"{{ routineNameToDelete }}"</span
          >
          <span v-else>this routine</span>
          ? This action cannot be undone.
        </p>
        <div class="modal-actions">
          <Button label="Cancel" severity="secondary" @click="cancelDelete" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDelete" />
        </div>
      </div>
    </div>
    <div v-if="routines.length > 0" class="top-actions">
      <Button icon="pi pi-plus" label="New Routine" @click="onCreateNew" />
    </div>
  </PageLayout>
</template>

<style scoped>
.top-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.routine-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

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

.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 400px;
  margin: 0 1.5rem;
  padding: 1.25rem 1.5rem 1.5rem;
  border-radius: 0.75rem;
  background: #fff;
  color: #111;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.modal-title {
  margin: 0 0 0.75rem;
  text-align: center;
}

.modal-text {
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
}

.modal-routine-name {
  font-weight: 700;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}
</style>


