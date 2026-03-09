<script setup lang="ts">
import RoutineForm from '@/components/RoutineForm.vue'
import { getRoutineById, saveRoutine } from '@/services/storage'
import type { Routine } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const routine = ref<Routine>({
  id: '',
  name: '',
  countdown: 10,
  blocks: [],
})
const routineId = computed(() => route.params.id as string)

function load() {
  const id = routineId.value
  const existing = id ? getRoutineById(id) : undefined
  if (!existing) {
    router.replace({ name: 'Routines' })
    return
  }
  routine.value = existing
}

function cancel() {
  router.push({ name: 'Routines' })
}

function save() {
  const trimmed = routine.value.name.trim()
  if (!trimmed) return
  routine.value = {
    ...routine.value,
    name: trimmed,
  }
  saveRoutine(routine.value)
  router.push({ name: 'Routines' })
}

onMounted(load)
</script>

<template>
  <RoutineForm v-model="routine" mode="edit" @cancel="cancel" @save="save" />
</template>
