<script setup>
import { ref } from 'vue'

defineProps({
  plano: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['criar-plano'])
const titular = ref('')
const matricula = ref('')

function criarPlano() {
  const nome = titular.value.trim()
  if (!nome || !/^[0-9]{9}$/.test(matricula.value)) return

  emit('criar-plano', {
    titular: nome,
    matricula: matricula.value
  })
}

</script>

<template>
  <section aria-labelledby="titulo-plano">
    <h2 id="titulo-plano" class="h3 fw-bold mb-4">Meu plano</h2>

    <div v-if="plano" class="card border rounded-3" >
      <div class="card-body p-3 p-md-4">

      <img
      src="https://media.istockphoto.com/id/2179213171/vector/unknown-person-with-covered-masked-hidden-face-anonymous-character-mysterious-man-black.jpg?s=612x612&w=0&k=20&c=RpDImIIvAaoZmoCaVo8yDvvH3-Urjn_6w3AbEjPrm4Q="
      alt="Títular"
      width="80"
      height="80"
      class="rounded-circle object-fit-cover border mb-3"
    />
    
        <h3 class="h5 fw-semibold">Plano +Saúde</h3>
        <p role="status" class="mb-3">
        Olá, <strong>{{ plano.titular }}</strong>! Você já pode agendar sua consulta.
      </p>
      
        <p class="mb-3"><strong>Matrícula</strong> – {{ plano.matricula }}</p>

        <RouterLink to="/medicos" class="btn btn-success">
          Ver médicos
        </RouterLink>
      </div>
    </div>

    <form v-else class="card border rounded-3 p-3 p-md-4" @submit.prevent="criarPlano">
      <h3 class="h5 fw-semibold">Criar plano</h3>
      <p class="text-body-secondary">
        Informe seu nome completo e a sua matrícula para acessar.
      </p>

      <label for="titular-plano" class="form-label fw-semibold">
        Nome do titular
      </label>
      <input
        id="titular-plano"
        v-model="titular"
        class="form-control mb-3"
        autocomplete="name"
        required
      />

      <label for="matricula-plano" class="form-label fw-semibold">
      Matrícula
    </label>
    <input
      id="matricula-plano"
      v-model="matricula"
      class="form-control"
      type="text"
      inputmode="numeric"
      pattern="[0-9]{9}"
      maxlength="9"
      aria-describedby="matricula-ajuda"
      required
    />
    <div id="matricula-ajuda" class="form-text mb-3">
      Digite o número de seu plano.
    </div>

      <div>
        <button type="submit" class="btn btn-success" :disabled="!titular.trim()">
          Criar plano
        </button>
      </div>
    </form>
  </section>
</template>