<script setup>

import {useRoute} from "vue-router";
import { useTemplateRef } from 'vue';

import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import ComFooter from '../common/ComFooter.vue';
import CatPageTouchUs from '../categoryPage/CatPageTouchUs.vue';
import ProductList from '../categoryPage/ProductList/ProductList.vue';
import { catalogueFull } from '../../data/categories';

const ComHeaderObj = useTemplateRef('header');
function togglePanels(){
    if(!ComHeaderObj.value.asideIsHidden){
        ComHeaderObj.value.asideIsHidden = !ComHeaderObj.value.asideIsHidden;
    } 
    if(!ComHeaderObj.value.socialMediaListIsHidden){
        ComHeaderObj.value.socialMediaListIsHidden = !ComHeaderObj.value.socialMediaListIsHidden
    }
}

const route = useRoute();
const data = catalogueFull.find(el => el.routeName == route.params.categoryName);

</script>

<template>
    <ComHeader ref="header"></ComHeader>
    <HomeFirstScreen @click="togglePanels" :pageName="data.name" :bgImage="data.bgImage"/>
    <ProductList @click="togglePanels" :category-object="data"/>
    <CatPageTouchUs @click="togglePanels" /> 
    <ComFooter @click="togglePanels" />
</template>

<style scoped>
    .some{
        height:100vh;
    }
</style>