# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# +Saúde

## Registro de utilização da Inteligência Artificial

### 1. Sobre o projeto

O +Saúde é um sistema desenvolvido pelo grupo com o objetivo de apresentar médicos, disponibilizar seus horários de atendimento e permitir o agendamento e o cancelamento de consultas. O projeto foi desenvolvido utilizando Vue.js, JavaScript, HTML e CSS, aplicando os conhecimentos adquiridos durante o curso de Análise e Desenvolvimento de Sistemas.

Durante o desenvolvimento, a equipe utilizou a Inteligência Artificial como ferramenta de apoio para esclarecer dúvidas, compreender recursos de programação e auxiliar na implementação de funcionalidades específicas.

### 2. Prompts utilizados durante o desenvolvimento

#### Prompt 1: Implementação do botão de exibição dos horários médicos

**Etapa:** Desenvolvimento dos componentes da interface.

**Prompt utilizado:**

> Auxilie na criação de um botão em Vue.js que permita mostrar e ocultar os horários de atendimento de cada médico. Utilize uma variável reativa para controlar a visibilidade das informações e explique como funciona a implementação.

**Aplicação no projeto:**

A IA auxiliou na implementação do botão presente no componente `CardMedico.vue`. A funcionalidade utiliza `ref` para controlar o estado de visibilidade, a função `verHorario()` para alternar esse estado e a diretiva `v-show` para exibir ou ocultar os horários.

#### Prompt 2: Criação do sistema de agendamento

**Etapa:** Desenvolvimento da funcionalidade de cadastro de consultas.

**Prompt utilizado:**

> Auxilie na implementação de um formulário de agendamento de consultas em Vue.js, com campos para nome do paciente, seleção do médico, data e horário. Utilize `v-model` para capturar os dados e uma função para adicionar a consulta à lista de agendamentos.

**Aplicação no projeto:**

A IA contribuiu para a construção da lógica de agendamento no componente principal. A função `agendar()` reúne os dados preenchidos, adiciona o registro ao array de consultas e limpa os campos do formulário após o envio.

#### Prompt 3: Apresentação das consultas agendadas

**Etapa:** Organização e exibição dos registros na interface.

**Prompt utilizado:**

> Auxilie na criação de um componente Vue.js para apresentar os dados de uma consulta agendada, recebendo por propriedades o nome do paciente, o médico, a data e o horário. Organize as informações em um cartão e utilize renderização condicional para apresentar uma mensagem quando não houver consultas cadastradas.

**Aplicação no projeto:**

A IA auxiliou na estruturação da exibição dos agendamentos por meio do componente `CardConsulta.vue` e na utilização de recursos do Vue.js para apresentar os registros na tela.

#### Prompt 4: Implementação do cancelamento de consultas

**Etapa:** Desenvolvimento das ações disponíveis para o usuário.

**Prompt utilizado:**

> Auxilie na implementação de um botão para cancelar uma consulta em Vue.js. Ao clicar no botão, o sistema deve alterar o estado da consulta e substituir o botão por uma mensagem informando que a consulta foi cancelada.

**Aplicação no projeto:**

A IA contribuiu para a implementação da função `cancelar()` no componente `CardConsulta.vue`. A função altera a variável reativa `cancelada`, permitindo que a interface substitua o botão pela mensagem de cancelamento.

#### Prompt 5: Organização do cabeçalho da aplicação

**Etapa:** Estruturação visual dos componentes.

**Prompt utilizado:**

> Auxilie na criação de um componente reutilizável de cabeçalho em Vue.js, que receba um título e um subtítulo por propriedades e apresente essas informações com estilização em CSS.

**Aplicação no projeto:**

A IA apoiou a construção do componente `Cabecalho.vue`, que utiliza `defineProps` para receber o título e o subtítulo definidos pelo componente principal. A estilização estabelece o fundo verde-azulado, o texto branco e o alinhamento centralizado.

### 3. Tecnologias e recursos relacionados aos prompts

Durante a implementação das funcionalidades, foram utilizados recursos como:

- **Vue.js:** construção da interface e organização em componentes.
- **JavaScript:** criação das funções e manipulação dos dados.
- **HTML:** estruturação dos formulários e das informações apresentadas.
- **CSS:** estilização dos componentes.
- **`ref`:** gerenciamento de estados reativos.
- **`defineProps`:** recebimento de informações por componentes.
- **`v-model`:** vinculação dos campos do formulário aos dados.
- **`v-for`:** renderização dinâmica de médicos e consultas.
- **`v-if`, `v-else` e `v-show`:** controle da exibição de elementos.
- **Eventos `@click` e `@submit.prevent`:** execução de ações na interface.

### 4. Considerações sobre o uso da IA

A Inteligência Artificial foi utilizada como ferramenta complementar durante o desenvolvimento do projeto, auxiliando na compreensão dos conceitos de programação e na implementação de funcionalidades específicas. O grupo ficou responsável pela construção e integração dos recursos ao sistema, devendo compreender a lógica aplicada e ser capaz de explicar o código apresentado.

Os prompts registrados neste documento representam as principais atividades relacionadas aos trechos de código documentados. A equipe deve revisar os exemplos e ajustá-los para que correspondam às solicitações efetivamente realizadas durante o desenvolvimento.

