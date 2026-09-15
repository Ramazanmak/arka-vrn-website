  import {createWebHistory, createRouter, createMemoryHistory} from 'vue-router';

  import HomeView from './components/views/HomeView.vue';
  import CategoryPageView from './components/views/CategoryPageView.vue';
  import ProductPageView from './components/views/ProductPageView.vue';
  import NotFoundView from './components/views/NotFoundView.vue';
  import FenceCalculatorView from "./components/views/FenceCalculatorView.vue";


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
      },
      {
          path: "/fence-calculator",
          component: FenceCalculatorView,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView,
      },
  ]


  export default routes;