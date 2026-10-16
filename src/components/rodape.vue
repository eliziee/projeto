<script setup>
defineProps({
  texto: String
})
</script>

<template>
  <footer>
    <p>{{ texto }}</p>
  </footer>
</template>

<style scoped>
footer {
  background: #0b464c;
  color: white;
  text-align: center;
  padding: 15px;
}
</style>