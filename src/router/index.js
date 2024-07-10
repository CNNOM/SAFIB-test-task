import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import LoginView from "@/views/LoginView.vue";
import TheSection from "@/components/TheSection.vue";
import TheSubSection from "@/components/TheSubSection.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }

    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/section/:index',
      name: 'section',
      component: TheSection,
    },
    {
      path: '/section/:index/:subIndex',
      name: 'subIndex',
      component: TheSubSection
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.getItem('authenticated');
  if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
