import { createRouter, createWebHashHistory } from 'vue-router'
import MedicosView from './views/MedicosView.vue'
import ConsultasView from './views/ConsultasView.vue'
import AgendarView from './views/AgendarView.vue'
import PlanoView from './views/PlanoView.vue'
import { plano } from './plano.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: PlanoView },
    { path: '/medicos', component: MedicosView, meta: { requerPlano: true } },
    { path: '/agendar', component: AgendarView, meta: { requerPlano: true } },
    { path: '/consultas', component: ConsultasView, meta: { requerPlano: true } },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requerPlano && !plano.value) {
    return '/'
  }
})

export default router