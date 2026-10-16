<script setup>
import { ref } from 'vue'
import Cabecalho from './components/cabecalho.vue'
import CardMedico from './components/cardmedico.vue'
import CardConsulta from './components/cardconsulta.vue'
import Rodape from './components/rodape.vue'

const medicos = ref([
  { nome: 'Dra. Ana Souza', especialidade: 'Cardiologia', horario: 'Seg e Qua, 8h às 12h' },
  { nome: 'Dr. João Lima', especialidade: 'Pediatria', horario: 'Ter e Qui, 14h às 18h' },
  { nome: 'Dra. Carla Mendes', especialidade: 'Dermatologia', horario: 'Sex, 8h às 12h' },
  { nome: 'Dr. Pedro Alves', especialidade: 'Ortopedia', horario: 'Seg a Qui, 14h às 17h' }
])

const consultas = ref([])

const nomePaciente = ref('')
const medicoEscolhido = ref('')
const dataConsulta = ref('')
const horaConsulta = ref('')

function agendar() {
  consultas.value.push({
    paciente: nomePaciente.value,
    medico: medicoEscolhido.value,
    data: dataConsulta.value,
    hora: horaConsulta.value
  })

  nomePaciente.value = ''
  medicoEscolhido.value = ''
  dataConsulta.value = ''
  horaConsulta.value = ''
}
</script>

<template>
  <Cabecalho titulo="AgendaSaúde" subtitulo="Marque sua consulta médica" />

  <main>
    <h2>Nossos médicos</h2>
    <div class="medicos">
      <CardMedico
        v-for="(m, index) in medicos"
        :key="index"
        :nome="m.nome"
        :especialidade="m.especialidade"
        :horario="m.horario"
      />
    </div>

    <h2>Agendar consulta</h2>
    <form @submit.prevent="agendar">
      <label>Nome do paciente</label>
      <input type="text" v-model="nomePaciente" required />

      <label>Médico</label>
      <select v-model="medicoEscolhido" required>
        <option value="" disabled>Escolha um médico</option>
        <option v-for="(m, index) in medicos" :key="index" :value="m.nome">
          {{ m.nome }} - {{ m.especialidade }}
        </option>
      </select>

      <label>Data</label>
      <input type="date" v-model="dataConsulta" required />

      <label>Horário</label>
      <input type="time" v-model="horaConsulta" required />

      <button type="submit">Agendar</button>
    </form>

    <h2>Consultas agendadas</h2>
    <p v-if="consultas.length === 0">Nenhuma consulta agendada ainda.</p>

    <CardConsulta
      v-for="(c, index) in consultas"
      :key="index"
      :paciente="c.paciente"
      :medico="c.medico"
      :data="c.data"
      :hora="c.hora"
    />
  </main>

  <Rodape texto="AgendaSaúde - Projeto de Vue.js" />
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #eef4f4;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #0f5c63;
}
</style>

<style scoped>
.medicos {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

form {
  background: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input,
select {
  padding: 8px;
}

button {
  background: #0f5c63;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>