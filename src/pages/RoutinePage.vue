<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import PageLayout from '@/components/PageLayout.vue'
import { getRoutineById } from '@/services/storage'
import type { Routine } from '@/types'
import Button from 'primevue/button'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routine = computed<Routine | undefined>(() => {
  const rawId = route.params.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  if (!id) {
    return undefined
  }

  return getRoutineById(id)
})
</script>

<template>
  <PageLayout title="Routine">
    <Block :title="routine ? routine.name : 'Routine not found'">
    </Block>
    <Button label="My Routines" @click="$router.push({ name: 'My Routines' })" />
  </PageLayout>
</template>

