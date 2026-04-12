<script setup>

import {useRoute} from "vue-router";

import ComHeader from '../common/ComHeader/ComHeader.vue';
import CategoryFirstScreen from '../categoryPage/CategoryFirstScreen.vue';
import ComFooter from '../common/ComFooter.vue';
import CatPageTouchUs from '../categoryPage/CatPageTouchUs.vue';
import ProductList from '../categoryPage/ProductList/ProductList.vue';
import { catalogueFull } from '../../data/categories';


const route = useRoute();
const data = catalogueFull.find(el => el.routeName == route.params.categoryName);

</script>

<template>
    <ComHeader></ComHeader>
    <CategoryFirstScreen :pageName="data.name" :bgImage="data.bgImage"/>
    <ProductList :category-object="data"/>
    <CatPageTouchUs /> 
    <ComFooter />
</template>
