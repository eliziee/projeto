<script setup>

defineProps({
  paciente: String,
  medico: String,
  data: String,
  hora: String,
  especialidade: String,
  foto: String
})

const emit = defineEmits(['cancelar'])

function formatarData(data) {
  if (!data) return ''

  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

</script>

<template>
<article class="consulta bg-white border rounded-3 p-3 p-md-4 mb-3 d-flex align-items-start gap-3">
  <img v-if="foto" :src="foto" alt="" class="consulta-foto rounded-3" />

  <div class="flex-grow-1 d-flex flex-column flex-md-row align-items-md-center gap-3">
    <div class="flex-grow-1">
      <h3 class="h5 fw-semibold mb-2">{{ paciente }}</h3>

      <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
        <span>{{ medico }}</span>
        <span v-if="especialidade" class="badge rounded-pill especialidade">
          {{ especialidade }}
        </span>
      </div>

      <p class="fw-semibold mb-0">
      {{ formatarData(data) }} às {{ hora }}
      </p>
    </div>

    <div class="consulta-acao flex-shrink-0">
      <button
        type="button"
        class="btn btn-outline-danger py-2 px-3"
        @click="emit('cancelar')"
      >
        Cancelar
      </button>
    </div>
  </div>
</article>
</template>

<style scoped>
.consulta {
--bs-border-color: #d3dddd;
}

.consulta h3 {
color: #0f5c63;
}

.especialidade {
background-color: #d3e8e8;
color: #0c444a;
}

.consulta-acao {
min-height: 2rem;
}

.cancelamento-enter-active,
.cancelamento-leave-active {
transition: opacity 150ms ease;
}

.cancelamento-enter-from,
.cancelamento-leave-to {
opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
.cancelamento-enter-active,
.cancelamento-leave-active {
  transition: none;
}

.consulta-foto {
  width: clamp(3.5rem, 12vw, 6.5rem);
  aspect-ratio: 1;
  object-fit: cover;
  flex-shrink: 0;
  background-color: #dceeee;
}

}
</style>