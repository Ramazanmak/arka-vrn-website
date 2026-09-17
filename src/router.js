  import {createWebHistory, createRouter, createMemoryHistory} from 'vue-router';

  import HomeView from './components/views/HomeView.vue';
  import CategoryPageView from './components/views/CategoryPageView.vue';
  import ProductPageView from './components/views/ProductPageView.vue';
  import NotFoundView from './components/views/NotFoundView.vue';


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
        name: "fence-calculator",

        component: () =>
            import(
                "./components/views/FenceCalculatorView.vue"
            ),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView,
      },
  ]


  export default routes;