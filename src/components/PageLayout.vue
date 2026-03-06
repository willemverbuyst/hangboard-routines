<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="page">
    <h1>My Hangboard App</h1>
    <header>
      <h2>{{ title }}</h2>
    </header>
    <main class="page-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.page {
  width: 400px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size:2.3rem;
  font-weight: 800;
  color: var(--p-primary-color);
  margin-bottom: 1rem;
}

h1, h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
}
</style>
