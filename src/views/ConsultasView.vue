<script setup>
import CardConsulta from '../components/cardconsulta.vue'

defineProps({
  consultas: Array,
  podeDesfazer: Boolean,
  medicos: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['cancelar', 'desfazer'])

</script>

<template>
  <section>
    <h2 class="h3 fw-bold mb-4">Consultas agendadas</h2>

    <div
  v-if="podeDesfazer"
  class="alert alert-warning d-flex flex-wrap align-items-center justify-content-between gap-2"
>
  <span role="status">Consulta cancelada.</span>

  <button
    type="button"
    class="btn btn-sm btn-outline-dark"
    @click="emit('desfazer')"
  >
    Desfazer
  </button>
  
  </div>

    <div
    v-if="consultas.length === 0"
    class="card bg-light border rounded-3 text-center"
    >

    <div class="card-body p-4 p-md-5">
      <h3 class="h5 fw-semibold mb-2">Nenhuma consulta agendada ainda</h3>
        <p class="text-body-secondary mb-3">
          Escolha um médico e reserve um horário.
       </p>
  
        <RouterLink to="/agendar" class="btn btn-outline-secondary">
          Agendar consulta
        </RouterLink>
      </div>
    </div>

    <CardConsulta
      v-for="(c, index) in consultas"
      :key="index"
      :paciente="c.paciente"
      :medico="c.medico"
      :especialidade="medicos.find(m => m.nome === c.medico)?.especialidade"
      :foto="medicos.find(m => m.nome === c.medico)?.foto"
      :data="c.data"
      :hora="c.hora"
      @cancelar="emit('cancelar', index)"
    />
  </section>
</template>