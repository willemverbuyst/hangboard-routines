<script setup lang="ts">
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
</style>
<style scoped>
.app {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
