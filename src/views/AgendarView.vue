<script setup>
import { ref } from 'vue'

defineProps({
  medicos: Array
})

const emit = defineEmits(['agendar'])

const nomePaciente = ref('')
const medicoEscolhido = ref('')
const dataConsulta = ref('')
const horaConsulta = ref('')
const agora = new Date()
const ano = agora.getFullYear()
const mes = String(agora.getMonth() + 1).padStart(2, '0')
const dia = String(agora.getDate()).padStart(2, '0')
const hoje = `${ano}-${mes}-${dia}`
const consultaAgendada = ref(false)

function enviarConsulta() {
  emit('agendar', {
    paciente: nomePaciente.value,
    medico: medicoEscolhido.value,
    data: dataConsulta.value,
    hora: horaConsulta.value,
  })

  nomePaciente.value = ''
  medicoEscolhido.value = ''
  dataConsulta.value = ''
  horaConsulta.value = ''
  consultaAgendada.value = true
}
</script>

<template>
<section>
  <h2 class="h3 fw-bold mb-4">Agendar consulta</h2>
  <div
  v-if="consultaAgendada"
  class="alert alert-success d-flex flex-wrap align-items-center justify-content-between gap-2"
  role="status"
>
  <span>Consulta agendada com sucesso!</span>

  <RouterLink to="/consultas" class="alert-link">
    Ver consultas
  </RouterLink>
</div>
  
  <div class="booking-layout">
  <form
    class="booking-form bg-white border rounded-3 p-3 p-md-4"
    @submit.prevent="enviarConsulta"
  >
    <div class="row g-3">
      <div class="col-12">
        <label for="paciente" class="form-label fw-semibold">Nome do paciente</label>
        <input id="paciente" v-model="nomePaciente" class="form-control" type="text" required />
      </div>

      <div class="col-12">
        <label for="medico" class="form-label fw-semibold">Médico</label>
        <select id="medico" v-model="medicoEscolhido" class="form-select" required>
          <option value="" disabled>Escolha um médico</option>
          <option v-for="m in medicos" :key="m.nome" :value="m.nome">
            {{ m.nome }} - {{ m.especialidade }}
          </option>
        </select>
      </div>

      <div class="col-12 col-sm-6">
        <label for="data" class="form-label fw-semibold">Data</label>
        <input
        id="data"
        v-model="dataConsulta"
        class="form-control"
        type="date"
        :min="hoje"
        required
        />
      </div>

      <div class="col-12 col-sm-6">
        <label for="hora" class="form-label fw-semibold">Horário</label>
        <input id="hora" v-model="horaConsulta" class="form-control" type="time" required />
      </div>
    </div>

    <button type="submit" class="btn booking-button w-100 fw-semibold mt-4">
      Agendar
    </button>
  </form>
  <div class="booking-illustration">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Wf6F9uBvoQroSH79t2K8aJ1eZBakZmUjlYrNvoZBoXe80XKu1d1QgqAm&s=10" alt="Agendar"/>
</div>
</div>
</section>
</template>

<style scoped>
.booking-layout {
  display: grid;
  gap: 1rem;
}

.booking-form {
  --bs-border-color: #d3dddd;
}

.booking-illustration {
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  background: #dceeee;
  border: 1px solid #c9e0e0;
  border-radius: 0.75rem;
}

.booking-illustration img {
  display: block;
  width: 100%;
  max-width: 320px;
  max-height: 280px;
  object-fit: contain;
}

@media (min-width: 768px) {
  .booking-layout {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  }
}

.booking-button {
--bs-btn-color: #fff;
--bs-btn-bg: #0f5c63;
--bs-btn-border-color: #0f5c63;
--bs-btn-hover-color: #fff;
--bs-btn-hover-bg: #0c444a;
--bs-btn-hover-border-color: #0c444a;
--bs-btn-active-color: #fff;
--bs-btn-active-bg: #0c444a;
--bs-btn-active-border-color: #0c444a;
--bs-btn-focus-shadow-rgb: 15, 92, 99;
}
</style>