<script setup lang="ts">
import AddToMyRoutinesModal from '@/components/AddToMyRoutinesModal.vue'
import Block from '@/components/BlockComponent.vue'
import DeleteRoutineModal from '@/components/DeleteRoutineModal.vue'
import PageLayout from '@/components/PageLayout.vue'
import RoutineCard from '@/components/RoutineCard.vue'
import { useRoutinesList } from '@/composables/useRoutinesList'
import { deleteRoutineById, saveRoutine } from '@/services/storage'
import type { Routine } from '@/types'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { routineSource, routines, load } = useRoutinesList()

const showDeleteConfirm = ref(false)
const routineIdToDelete = ref<string | null>(null)
const routineNameToDelete = ref('')

const showAddToMyRoutinesModal = ref(false)
const routineToAdd = ref<Routine | null>(null)

const sourceOptions = [
  { label: 'My routines', value: 'my' as const },
  { label: 'Examples', value: 'examples' as const },
]

const isExamplesSource = computed(() => routineSource.value === 'examples')

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

function onCreateNew() {
  router.push({ name: 'New Routine' })
}

function askAddToMyRoutines(routine: Routine) {
  routineToAdd.value = routine
  showAddToMyRoutinesModal.value = true
}

function confirmAddToMyRoutines(name: string) {
  const routine = routineToAdd.value
  if (!routine) return
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
}

function onSelect(routine: Routine) {
  router.push({ name: 'Routine', params: { id: routine.id } })
}

watch(showDeleteConfirm, (open) => {
  if (!open) {
    routineIdToDelete.value = null
    routineNameToDelete.value = ''
  }
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
        <RoutineCard
          v-for="r in routines"
          :key="r.id"
          :routine="r"
          :is-examples-source="isExamplesSource"
          @select="onSelect(r)"
          @edit="onEdit(r.id)"
          @delete="askDelete(r.id)"
          @add-to-my-routines="askAddToMyRoutines(r)"
        />
      </div>
    </template>
    <DeleteRoutineModal
      v-model="showDeleteConfirm"
      :routine-name="routineNameToDelete"
      @confirm="confirmDelete"
    />
    <AddToMyRoutinesModal
      v-model="showAddToMyRoutinesModal"
      :initial-name="routineToAdd?.name ?? ''"
      @confirm="confirmAddToMyRoutines"
    />
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
</style>
