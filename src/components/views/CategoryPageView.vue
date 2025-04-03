<script setup>
import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import ComFooter from '../common/ComFooter.vue';
import CatPageTouchUs from '../categoryPage/CatPageTouchUs.vue';
import ProductList from '../categoryPage/ProductList/ProductList.vue';
import { catalogueFull } from '../../data/categories';
import {useRoute} from "vue-router";


const route = useRoute();
const data = catalogueFull.find(el => el.routeName == route.params.categoryName);

</script>

<template>
    <ComHeader></ComHeader>
    <HomeFirstScreen :pageName="data.name" :bgImage="data.bgImage"/>
    <ProductList :category-object="data"/>
    <CatPageTouchUs/> 
    <ComFooter/>
</template>

<style scoped>
    .some{
        height:100vh;
    }
</style>