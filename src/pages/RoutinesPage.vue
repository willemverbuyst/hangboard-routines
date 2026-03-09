<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import PageLayout from '@/components/PageLayout.vue'
import { getExampleRoutines } from '@/data/exampleRoutines'
import { deleteRoutineById, getMyRoutines, saveRoutine } from '@/services/storage'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
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

const showAddToMyRoutinesModal = ref(false)
const routineToAdd = ref<Routine | null>(null)
const addRoutineName = ref('')

const sourceOptions = [
  { label: 'My routines', value: 'my' as const },
  { label: 'Examples', value: 'examples' as const },
]

const isExamplesSource = computed(() => routineSource.value === 'examples')

function load() {
  if (routineSource.value === 'my') {
    routines.value = getMyRoutines()
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

function askAddToMyRoutines(routine: Routine) {
  routineToAdd.value = routine
  addRoutineName.value = routine.name
  showAddToMyRoutinesModal.value = true
}

function cancelAddToMyRoutines() {
  showAddToMyRoutinesModal.value = false
  routineToAdd.value = null
  addRoutineName.value = ''
}

function confirmAddToMyRoutines() {
  const routine = routineToAdd.value
  if (!routine) return
  const name = addRoutineName.value.trim() || routine.name
  const copy: Routine = {
    ...routine,
    id: crypto.randomUUID(),
    name,
    blocks: routine.blocks.map((b) => ({ ...b })),
  }
  saveRoutine(copy)
  routineSource.value = 'my'
  load()
  showAddToMyRoutinesModal.value = false
  routineToAdd.value = null
  addRoutineName.value = ''
}

function onSelect(routine: Routine) {
  router.push({ name: 'Routine', params: { id: routine.id } })
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
              :label="'Select'"
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
            <Button
              v-if="isExamplesSource"
              label="Add to My Routines"
              icon="pi pi-plus"
              severity="secondary"
              @click="askAddToMyRoutines(r)"
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
    <div v-if="showAddToMyRoutinesModal" class="modal-backdrop">
      <div class="modal">
        <h2 class="modal-title">Add to My Routines</h2>
        <p class="modal-text">Routine name:</p>
        <InputText
          v-model="addRoutineName"
          class="modal-input"
          placeholder="Routine name"
          aria-label="Routine name"
        />
        <div class="modal-actions">
          <Button label="Cancel" severity="secondary" @click="cancelAddToMyRoutines" />
          <Button label="Add" icon="pi pi-plus" @click="confirmAddToMyRoutines" />
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
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}

.modal-input {
  width: 100%;
  margin-bottom: 1.25rem;
}

/* Light input styling to match white modal (overrides dark theme) */
.modal .modal-input,
.modal .modal-input :deep(.p-inputtext) {
  background: #f5f5f5;
  color: #111;
  border: 1px solid #ddd;
}

.modal .modal-input::placeholder,
.modal .modal-input :deep(.p-inputtext)::placeholder {
  color: #666;
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
