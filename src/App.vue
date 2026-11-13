<script setup>
import { onMounted, ref } from 'vue'
import Cabecalho from './components/cabecalho.vue'
import CardMedico from './components/cardmedico.vue'
import CardConsulta from './components/cardconsulta.vue'
import Rodape from './components/rodape.vue'
import { plano } from './plano.js'
import Avaliacoes from './components/avaliacoes.vue'

const medicos = ref([])
const erroMedicos = ref('')

async function carregarMedicos() {
  try {
    const resposta = await fetch('/api/medicos')

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`)
    }

    medicos.value = await resposta.json()
  } catch {
    erroMedicos.value = 'Não foi possível carregar os médicos.'
  }
}

onMounted(carregarMedicos)

const consultas = ref([])

function criarPlano(novoPlano) {
  plano.value = novoPlano
}

const nomePaciente = ref('')
const medicoEscolhido = ref('')
const dataConsulta = ref('')
const horaConsulta = ref('')
const ultimaCancelada = ref(null)
let temporizadorDesfazer

function agendar(consulta) {
  consultas.value.push(consulta)
}

function cancelarConsulta(index) {
  const [consulta] = consultas.value.splice(index, 1)
  if (!consulta) return

  clearTimeout(temporizadorDesfazer)
  ultimaCancelada.value = { consulta, index }

  temporizadorDesfazer = setTimeout(() => {
    ultimaCancelada.value = null
  }, 10000)
}

function desfazerCancelamento() {
  if (!ultimaCancelada.value) return

  clearTimeout(temporizadorDesfazer)

  const { consulta, index } = ultimaCancelada.value
  consultas.value.splice(index, 0, consulta)
  ultimaCancelada.value = null
}

</script>

<template>
<Cabecalho titulo="+Saúde" subtitulo="Marque sua consulta médica" />

<main>

<nav
  class="nav nav-pills nav-justified gap-2 mb-4 p-2 bg-white border rounded-3 main-nav"
  aria-label="Navegação principal"
>
<RouterLink class="nav-link" to="/" exact-active-class="active">
Meu plano
</RouterLink>

<template v-if="plano">
<RouterLink class="nav-link" to="/medicos" exact-active-class="active">
  Médicos
</RouterLink>
<RouterLink class="nav-link" to="/agendar" exact-active-class="active">
  Agendar
</RouterLink>
<RouterLink class="nav-link" to="/consultas" exact-active-class="active">
  Consultas
</RouterLink>
</template>

<template v-else>
<span class="nav-link disabled" aria-disabled="true">Médicos</span>
<span class="nav-link disabled" aria-disabled="true">Agendar</span>
<span class="nav-link disabled" aria-disabled="true">Consultas</span>
</template>

</nav>

<p v-if="erroMedicos" class="alert alert-warning" role="alert">
{{ erroMedicos }}
</p>

<RouterView
  :medicos="medicos"
  :consultas="consultas"
  :pode-desfazer="ultimaCancelada !== null"
  @agendar="agendar"
  @cancelar="cancelarConsulta"
  @desfazer="desfazerCancelamento"
  :plano="plano"
  @criar-plano="criarPlano"
/>

<Avaliacoes />
</main>

<Rodape texto="Projeto demonstrativo - Vue.js" />
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  margin: 0;
  font-family: "DM Sans", system-ui, sans-serif;;
  background: #eef4f4;
}

main {
  flex: 1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 20px 40px;
}

h2 {
  color: #0f5c63;
}
</style>

<style scoped>
.main-nav {
  --bs-nav-link-color: #0f5c63;
  --bs-nav-link-hover-color: #0c444a;
  --bs-nav-pills-link-active-color: #0c444a;
  --bs-nav-pills-link-active-bg: #d3e8e8;
}

.main-nav .nav-link.active {
  font-weight: 600;
}
</style>
