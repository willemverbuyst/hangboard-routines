<script setup lang="ts">
import RoutineForm from '@/components/RoutineForm.vue'
import { saveRoutine } from '@/services/storage'
import type { Routine } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const routine = ref<Routine>({
  id: crypto.randomUUID(),
  name: '',
  countdown: 10,
  blocks: [
    { type: 'iteration', hang: 10, rest: 50 },
    { type: 'recovery', duration: 60 },
  ],
})

function cancel() {
  router.push({ name: 'My Routines' })
}

function save() {
  const trimmed = routine.value.name.trim()
  if (!trimmed) return
  routine.value = {
    ...routine.value,
    name: trimmed,
  }
  saveRoutine(routine.value)
  router.push({ name: 'My Routines' })
}
</script>

<template>
  <RoutineForm v-model="routine" mode="create" @cancel="cancel" @save="save" />
</template>
