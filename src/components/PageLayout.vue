<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="page">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
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
header {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
