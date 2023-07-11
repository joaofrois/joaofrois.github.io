import  { createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import PokedexHome from '@/modules/Pokedex/views/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: PokedexHome,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
