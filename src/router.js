import {createWebHistory, createRouter} from 'vue-router';

import HomeView from './components/views/HomeView.vue';
import CategoryPageView from './components/views/CategoryPageView.vue';


const routes = [
    {
        path:'/',
        component:HomeView,
    },
    {
        path:'/categories/:categoryName',
        component:CategoryPageView, 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to,from,savedPosition){
        return {top:0}
    }
});

export default router;