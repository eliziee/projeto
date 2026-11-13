<script setup>
defineProps({
  texto: String
})
</script>

<template>
<footer class="text-center text-white px-3 py-3">
  <img
    src="/logo-saude.png"
    alt="+Saúde"
    class="img-fluid d-block mx-auto mb-1"
    width="120"
  />
  <p class="small opacity-75 mb-0">{{ texto }}</p>
  <p class="small mt-2 mb-0">
  <span class="fw-semibold">Fale conosco</span> – (91) 1234-5678
  
</p>
</footer>
</template>

<style scoped>
footer {
background-color: #0c444a;
}
</style>