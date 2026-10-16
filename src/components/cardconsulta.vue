<script setup>
import { ref } from 'vue'

defineProps({
  paciente: String,
  medico: String,
  data: String,
  hora: String
})

const cancelada = ref(false)

function cancelar() {
  cancelada.value = true
}
</script>

<template>
  <div class="consulta">
    <p><strong>{{ paciente }}</strong></p>
    <p>{{ medico }}</p>
    <p>{{ data }} às {{ hora }}</p>

    <p v-if="cancelada" class="cancelada">Consulta cancelada</p>
    <button v-else @click="cancelar">Cancelar</button>
  </div>
</template>

<style scoped>
.consulta {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.cancelada {
  color: red;
}

button {
  background: red;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}
</style>