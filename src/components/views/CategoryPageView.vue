<script setup>
import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import ComFooter from '../common/ComFooter.vue';
import CatPageTouchUs from '../categoryPage/CatPageTouchUs.vue';
import { catalogueFull } from '../../data/categories';
import {useRoute} from "vue-router"

const route = useRoute();
const data = catalogueFull.find(el => el.routeName == route.params.categoryName);
console.log(data)

</script>

<template>
    <ComHeader></ComHeader>
    <HomeFirstScreen :pageName="data.name" :bgImage="data.bgImage"/>
    <div class="some"></div>
    <CatPageTouchUs/> 
    <ComFooter/>
</template>

<style scoped>
    .some{
        height:100vh;
    }
</style>