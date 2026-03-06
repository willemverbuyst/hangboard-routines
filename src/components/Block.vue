<script setup lang="ts">
import Card from 'primevue/card'
import { computed, useSlots } from 'vue'

const props = defineProps<{
  title?: string
}>()

const slots = useSlots()

const hasTitle = computed(() => !!slots.title || !!props.title)
</script>

<template>
  <Card class="card-container">
    <template v-if="hasTitle" #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>
    <template #content>
      <div class="block-content">
        <slot />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card-container {
  width: 380px;
}

.block-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

