<script setup>
import { ref } from 'vue'
import CardMedico from '../components/cardmedico.vue'

defineProps({
  medicos: Array
})

const lista = ref(null)
const ativo = ref(0)

function atualizarAtivo() {
  const faixa = lista.value
  const centro = faixa.scrollLeft + faixa.clientWidth / 2
  let menorDistancia = Infinity

  for (const [indice, card] of Array.from(faixa.children).entries()) {
    const centroCard = card.offsetLeft + card.offsetWidth / 2
    const distancia = Math.abs(centro - centroCard)

    if (distancia < menorDistancia) {
      menorDistancia = distancia
      ativo.value = indice
    }
  }
}

function mover(direcao) {
  const faixa = lista.value
  const card = faixa.children[ativo.value + direcao]

  if (card) {
    faixa.scrollTo({
      left: card.offsetLeft - (faixa.clientWidth - card.offsetWidth) / 2
    })
  }
}
</script>

<template>
  <section aria-labelledby="titulo-medicos">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <h2 id="titulo-medicos" class="h3 fw-bold mb-0">Nossos médicos</h2>

      <div v-if="medicos?.length > 1" class="d-flex gap-2">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          aria-controls="lista-medicos"
          @click="mover(-1)"
        >
          ← Anterior
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          aria-controls="lista-medicos"
          @click="mover(1)"
        >
          Próximo →
        </button>
      </div>
    </div>

    <ul
      id="lista-medicos"
      ref="lista"
      class="lista-medicos list-unstyled mb-0"
      tabindex="0"
      aria-labelledby="titulo-medicos"
      @keydown.left.prevent="mover(-1)"
      @keydown.right.prevent="mover(1)"
      @scroll.passive="atualizarAtivo"
    >
    <li
  v-for="(medico, indice) in medicos"
  :key="medico.nome"
  :class="{ 'em-destaque': indice === ativo }"
>
  <CardMedico v-bind="medico" />
</li>
    </ul>
  </section>
</template>

<style scoped>
.lista-medicos {
  --margem: clamp(1rem, 8%, 5rem);

  position: relative;
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 1rem var(--margem) 1.5rem;
  scroll-snap-type: x mandatory;
}

.lista-medicos > li {
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: center;
}

.lista-medicos :deep(.medico-card) {
  transform: scale(0.94);
  background: #f4f8f8;
}

.lista-medicos .em-destaque :deep(.medico-card) {
  transform: scale(1);
  background: #fff;
  border-color: #0f5c63;
  box-shadow: 0 0.5rem 1rem rgb(15 92 99 / 14%);
}

@media (prefers-reduced-motion: no-preference) {
  .lista-medicos {
    scroll-behavior: smooth;
  }

  .lista-medicos :deep(.medico-card) {
    transition: transform 220ms ease, background-color 220ms ease,
      border-color 220ms ease, box-shadow 220ms ease;
  }
}
</style>