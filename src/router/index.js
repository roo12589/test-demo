import { createRouter, createWebHistory } from 'vue-router'
import ManageMenu from '../views/ManageMenu.vue'

const routes = [
  {
    path: '/',
    name: 'MenageMenu',
    component: ManageMenu
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
