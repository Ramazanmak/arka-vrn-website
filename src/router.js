import {createWebHistory, createRouter, createMemoryHistory} from 'vue-router';

import HomeView from './components/views/HomeView.vue';
import CategoryPageView from './components/views/CategoryPageView.vue';
import ProductPageView from './components/views/ProductPageView.vue';


const routes = [
    {
        path:'/',
        component:HomeView,
    },
    {
        path:'/categories/:categoryName',
        component:CategoryPageView, 
    },
    {
        path: '/categories/:categoryName/:slug',
        component: ProductPageView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;