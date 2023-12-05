// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../components/DefaultLayout.vue';
import Home from '../views/Home.vue';
import HotelsList from '../views/HotelsList.vue';
import Hotel from '../views/Hotel.vue';
import { auth, firestore } from '@/firebase/firebase';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/favourites',
        name: 'favourites',
        component: HotelsList,
        meta: { requiresAuth: true }, // Add this meta field for protected routes
      },
      {
        path: '/hotel/:id?',
        name: 'hotelDetails',
        component: Hotel,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/'); // Redirect to home if not authenticated
  } else {
    next();
  }
});

export default router;
