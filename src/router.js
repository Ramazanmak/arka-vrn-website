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
        name:"category"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;