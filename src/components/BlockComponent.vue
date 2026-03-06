<script setup lang="ts">
import Card from 'primevue/card';
import { computed, useSlots } from 'vue';

const props = defineProps<{
  title?: string
  footer?: boolean
}>()

const slots = useSlots()

const hasTitle = computed(() => !!slots.title || !!props.title)
const hasFooter = computed(() => !!slots.footer || !props.footer)
</script>

<template>
  <Card class="card-container">
    <template v-if="hasTitle" #title>
      <div class="block-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </template>
    <template #content>
      <div class="block-content">
        <slot />
      </div>
    </template>
    <template v-if="hasFooter" #footer>
      <div class="block-footer">
        <slot name="footer" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card-container {
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.block-title {
  display: flex;
  justify-content: center;
}

.block-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-footer {
  display: flex;
  justify-content: center;
}
</style>
