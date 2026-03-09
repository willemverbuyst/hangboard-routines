<script setup lang="ts">
import Block from '@/components/BlockComponent.vue'
import PageLayout from '@/components/PageLayout.vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRoutines() {
  router.push({ name: 'Routines' })
}
</script>

<template>
  <PageLayout title="Page not found">
    <Block>
      <div class="not-found">
        <h1 class="title">404</h1>
        <p class="message">The page you’re looking for doesn’t exist.</p>
        <Button
          label="Back to My Routines"
          icon="pi pi-arrow-left"
          @click="goToRoutines"
        />
      </div>
    </Block>
  </PageLayout>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
}

.title {
  margin: 0;
  font-size: 3rem;
}

.message {
  margin: 0 0 0.75rem;
  opacity: 0.85;
}
</style>

