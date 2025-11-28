import { createRouter, createWebHistory } from 'vue-router'
import { currentPage } from '@/services/GeneralService';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {page: 1}
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
    meta: {page: 2}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta?.page) {
    currentPage.value = to.meta.page;
  }else{
    currentPage.value = 0;
  }
  next();
});

export default router
