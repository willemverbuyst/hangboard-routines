<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { deleteRoutineById, getRoutines } from '@/services/storage'
import type { Routine, RoutineBlock } from '@/types'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routines = ref<Routine[]>([])

function load() {
  routines.value = getRoutines()
}

function onEdit(id: string) {
  router.push({ name: 'Edit Routine', params: { id } })
}

function onDelete(id: string) {
  deleteRoutineById(id)
  load()
}

function onCreateNew() {
  router.push({ name: 'New Routine' })
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

function formatBlockDescription(block: RoutineBlock): string {
  if (block.type === 'iteration') {
    return `${block.hang}s hang, ${block.rest}s rest`
  }
  return `${block.duration}s`
}

function routineTotalFormatted(r: Routine): string {
  const totalSeconds =
    r.countdown + r.blocks.reduce((sum, b) => sum + totalSecondsForBlock(b), 0)
  return formatDuration(totalSeconds)
}

onMounted(load)
</script>

<template>
  <PageLayout title="My Routines">
    <div v-if="routines.length > 0" class="top-actions">
      <Button label="New Routine" @click="onCreateNew" />
    </div>
    <template v-if="routines.length === 0">
      <Card>
        <template #content>
          <p>No routines yet.</p>
          <Button label="Create New Routine" @click="onCreateNew" />
        </template>
      </Card>
    </template>
    <template v-else>
      <div class="routine-list">
        <Card v-for="r in routines" :key="r.id" class="routine-card">
          <template #title>{{ r.name }}</template>
          <template #content>
            <div class="routine-steps">
              <Card class="step-card">
                <template #title>Countdown</template>
                <template #content>
                  <span class="step-value">{{ formatDuration(r.countdown) }}</span>
                </template>
              </Card>
              <Card
                v-for="(block, i) in r.blocks"
                :key="i"
                class="step-card"
              >
                <template #title>
                  {{ block.type === 'iteration' ? 'Hang - Rest' : 'Recovery' }}
                </template>
                <template #content>
                  <span class="step-value">{{ formatBlockDescription(block) }}</span>
                </template>
              </Card>
              <p class="total-time">Total: {{ routineTotalFormatted(r) }}</p>
            </div>
          </template>
          <template #footer>
            <Button label="Edit" icon="pi pi-pencil" @click="onEdit(r.id)" />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="secondary"
              @click="onDelete(r.id)"
            />
          </template>
        </Card>
      </div>
    </template>
  </PageLayout>
</template>

<style scoped>
.top-actions {
  margin-bottom: 1rem;
}

.routine-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .routine-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .routine-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.routine-card :deep(.p-card-footer) {
  display: flex;
  gap: 0.5rem;
}

.routine-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.routine-card .step-card {
  margin: 0;
}

.routine-card .step-card :deep(.p-card-title) {
  font-size: 0.95rem;
}

.routine-card .step-card :deep(.p-card-content) {
  padding-top: 0;
}

.step-value {
  font-size: 0.9375rem;
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
</style>
