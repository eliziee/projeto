<script setup>
defineProps({
  titulo: String,
  subtitulo: String
})
</script>

<template>
<header class="text-center text-white px-3 py-3 py-md-4">
<h1 class="mb-2">
<img src="/logo-saude.png" :alt="titulo" class="img-fluid" width="240" />
</h1>
  <p class="mb-0 opacity-75">{{ subtitulo }}</p>
</header>
</template>

<style scoped>
header {
background-color: #0f5c63;
}
</style>