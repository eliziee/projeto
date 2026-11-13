<script setup>
defineProps({
  nome: String,
  especialidade: String,
  horario: String,
  foto: String,
  telefone: String
})
</script>

<template>
  <article class="card medico-card h-100 p-3 p-lg-4">
    <div class="medico-conteudo">
      <img :src="foto" alt="" class="medico-foto rounded-3 flex-shrink-0" />

      <div>
        <h3 class="h5 fw-semibold mb-1">{{ nome }}</h3>
        <p class="small text-body-secondary mb-3">{{ especialidade }}</p>

        <p class="small mb-1">
          <span class="fw-semibold">Horário</span> - {{ horario }}
        </p>
        <p class="small mb-0">
          <span class="fw-semibold">Telefone</span> - {{ telefone }}
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.medico-card {
  --bs-card-border-color: #d3dddd;
  border-radius: 1.25rem;
}

.medico-conteudo {
  display: grid;
  align-items: center;
  gap: 1.25rem;
}

.medico-card h3 {
  color: #0f5c63;
  font-size: clamp(1.35rem, 3vw, 2rem);
}

.medico-foto {
  width: 100%;
  height: clamp(9rem, 30vw, 14rem);
  object-fit: cover;
  object-position: center 30%;
}

@media (min-width: 768px) {
  .medico-conteudo {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    gap: 2rem;
  }
}
</style>