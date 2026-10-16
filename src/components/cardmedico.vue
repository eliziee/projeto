<script setup>
import { ref } from 'vue'

defineProps({
  nome: String,
  especialidade: String,
  horario: String
})

const mostrarHorario = ref(false)

function verHorario() {
  mostrarHorario.value = !mostrarHorario.value
}
</script>

<template>
  <div class="card">
    <h3>{{ nome }}</h3>
    <p>{{ especialidade }}</p>
    <button @click="verHorario">Ver horário</button>
    <p v-show="mostrarHorario">{{ horario }}</p>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
}

button {
  background: #0f5c63;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}
</style>