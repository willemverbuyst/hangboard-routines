<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  initialName: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [name: string]
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const localName = ref('')

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      localName.value = props.initialName
    }
  },
)

function onCancel() {
  open.value = false
}

function onConfirm() {
  emit('confirm', localName.value.trim() || props.initialName)
  open.value = false
}
</script>

<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h2 class="modal-title">Add to My Routines</h2>
      <p class="modal-text">Routine name:</p>
      <InputText
        v-model="localName"
        class="modal-input"
        placeholder="Routine name"
        aria-label="Routine name"
      />
      <div class="modal-actions">
        <Button label="Cancel" severity="secondary" @click="onCancel" />
        <Button label="Add" icon="pi pi-plus" @click="onConfirm" />
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

.modal-input {
  width: 100%;
  margin-bottom: 1.25rem;
}

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

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}
</style>
