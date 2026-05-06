<script setup>

import {useRoute, useRouter} from "vue-router";

import ComHeader from '../common/ComHeader/ComHeader.vue';
import ComFooter from '../common/ComFooter.vue';
import CatPageTouchUs from '../categoryPage/CatPageTouchUs.vue';
import ProductList from '../categoryPage/ProductList/ProductList.vue';
import { catalogueFull } from '../../data/categories';


const route = useRoute();
const router = useRouter();
const data = catalogueFull.find(el => el.routeName == route.params.categoryName);

function popRouter() {
  router.back();
}

</script>

<template>
    <div class="top-layer">
      <button class="back-button" @click="popRouter()">
        <img class="back-arrow" style="color:white; fill:white" src="/general/catalogue/long-arrow.svg" alt="more">
        </img> 
      </button>
    </div>
    <ComHeader></ComHeader>
    <ProductList :category-object="data"/>
    <CatPageTouchUs /> 
    <ComFooter />
</template>

<style scoped>

.back-button{
  position: fixed;
  border-radius: 100%;
  border: none;
  width: var(--headerHeight);
  aspect-ratio: 1;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: transparent;

  .back-arrow {
    display: block;
    margin: auto;
    height: 50%;
    transform: rotate(90deg)
  }
}

@media (min-width: 768px) {
  .back-button {
    top: 13vh;
    left: 4vh;
    width: 3em;
    background-color: var(--contacts-bg-color);
  }
}

</style>