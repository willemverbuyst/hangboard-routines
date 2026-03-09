<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    routineName?: string
  }>(),
  { routineName: '' },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function onCancel() {
  open.value = false
}

function onConfirm() {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h2 class="modal-title">Delete routine?</h2>
      <p class="modal-text">
        Are you sure you want to delete
        <span v-if="routineName" class="modal-routine-name">"{{ routineName }}"</span>
        <span v-else>this routine</span>
        ? This action cannot be undone.
      </p>
      <div class="modal-actions">
        <Button label="Cancel" severity="secondary" @click="onCancel" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" @click="onConfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.modal-routine-name {
  font-weight: 700;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}
</style>
