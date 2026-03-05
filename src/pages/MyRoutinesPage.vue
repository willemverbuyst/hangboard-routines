<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { deleteRoutineById, getRoutines } from '@/services/storage'
import type { Routine } from '@/types'

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

onMounted(load)
</script>

<template>
  <div class="page">
    <h1>My Routines</h1>
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
  </div>
</template>

<style scoped>
.page {
  max-width: 40rem;
  margin: 0 auto;
}
h1 {
  margin-bottom: 1rem;
}
.routine-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.routine-card :deep(.p-card-footer) {
  display: flex;
  gap: 0.5rem;
}
</style>
