<script setup>
defineProps({
  titulo: String,
  subtitulo: String
})
</script>

<template>
  <header>
    <h1>{{ titulo }}</h1>
    <p>{{ subtitulo }}</p>
  </header>
</template>

<style scoped>
header {
  background: #0f5c63;
  color: white;
  text-align: center;
  padding: 30px;
}
</style>