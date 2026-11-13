<script setup>
import { onMounted, ref } from 'vue'

const avaliacoes = ref([])
const carregando = ref(true)
const erro = ref('')

async function carregarAvaliacoes() {
  carregando.value = true
  erro.value = ''

  try {
    const resposta = await fetch('/api/avaliacoes')

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`)
    }

    avaliacoes.value = await resposta.json()
  } catch {
    erro.value = 'Não foi possível carregar as avaliações.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregarAvaliacoes)

const nome = ref('')
const nota = ref(5)
const comentario = ref('')
const enviando = ref(false)
const erroEnvio = ref('')
const sucessoEnvio = ref('')

async function enviarAvaliacao() {
  if (enviando.value) return

  erroEnvio.value = ''
  sucessoEnvio.value = ''

  if (!comentario.value.trim()) {
    erroEnvio.value = 'Escreva um comentário.'
    return
  }

  enviando.value = true

  try {
    const resposta = await fetch('/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.value,
        nota: nota.value,
        comentario: comentario.value
      })
    })

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`)
    }

    avaliacoes.value.push(await resposta.json())
    nome.value = ''
    nota.value = 5
    comentario.value = ''
    sucessoEnvio.value = 'Avaliação enviada!'
  } catch {
    erroEnvio.value = 'Não foi possível enviar a avaliação. Tente novamente.'
  } finally {
    enviando.value = false
  }
}

</script>

<template>
  <section class="mt-5" aria-labelledby="titulo-avaliacoes">
    <h2 id="titulo-avaliacoes" class="h3 fw-bold mb-3">Avaliações</h2>

    <p v-if="carregando" role="status">Carregando avaliações…</p>

    <div v-else-if="erro" class="alert alert-warning">
      <p class="mb-2">{{ erro }}</p>
      <button
        type="button"
        class="btn btn-sm btn-outline-dark"
        @click="carregarAvaliacoes"
      >
        Tentar novamente
      </button>
    </div>

    <p v-else-if="avaliacoes.length === 0" class="text-body-secondary">
      Nenhuma avaliação ainda.
    </p>

    <div v-else class="row g-3">
      <div
        v-for="avaliacao in avaliacoes"
        :key="avaliacao.id"
        class="col-12 col-md-6"
      >
        <article class="card h-100">
          <div class="card-body">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
              <h3 class="h6 fw-semibold mb-0">{{ avaliacao.nome }}</h3>
              <span class="badge rounded-pill text-bg-light">
              <span class="badge rounded-pill text-bg-light d-inline-flex align-items-center gap-1">
              <span class="text-warning" aria-hidden="true">★</span>
              {{ avaliacao.nota }} de 5
            </span>
              </span>
            </div>
            <span
              v-if="avaliacao.exemplo"
              class="badge rounded-pill text-bg-light border mb-2"
            >
              Avaliação de exemplo
            </span>
            <p class="mb-0">{{ avaliacao.comentario }}</p>
          </div>
        </article>
      </div>
    </div>

    <form
  v-if="!carregando && !erro"
  class="card mt-4"
  @submit.prevent="enviarAvaliacao"
>
  <div class="card-body p-3 p-md-4">
    <h3 class="h5 mb-3">Deixe sua avaliação</h3>

    <fieldset :disabled="enviando">
      <div class="row g-3">
        <div class="col-12 col-sm-8">
          <label for="avaliacao-nome" class="form-label">Nome (opcional)</label>
          <input id="avaliacao-nome" v-model="nome" class="form-control" />
        </div>

        <div class="col-12 col-sm-4">
          <label for="avaliacao-nota" class="form-label">Nota</label>
          <select id="avaliacao-nota" v-model="nota" class="form-select">
            <option v-for="valor in 5" :key="valor" :value="valor">
              {{ valor }} de 5
            </option>
          </select>
        </div>

        <div class="col-12">
          <label for="avaliacao-comentario" class="form-label">Comentário</label>
          <textarea
            id="avaliacao-comentario"
            v-model="comentario"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>
      </div>

      <button type="submit" class="btn btn-success mt-3">
        {{ enviando ? 'Enviando…' : 'Enviar avaliação' }}
      </button>
    </fieldset>

    <p v-if="sucessoEnvio" class="alert alert-success mt-3 mb-0" role="status">
      {{ sucessoEnvio }}
    </p>
    <p v-if="erroEnvio" class="alert alert-warning mt-3 mb-0" role="alert">
      {{ erroEnvio }}
    </p>
  </div>
</form>

  </section>
</template>