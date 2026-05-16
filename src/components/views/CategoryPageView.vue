<script setup>
import { getCategorySeo } from "../../seo";
import { useHead } from "@unhead/vue";
import {useRoute} from "vue-router";
import BackButton from "../common/BackButton.vue";
import { ref } from "vue";

import ComHeader from '../common/ComHeader/ComHeader.vue';
import ComFooter from '../common/ComFooter.vue';
import ProductList from '../categoryPage/ProductList/ProductList.vue';
import { catalogueFull } from '../../data/categories';


const route = useRoute();
const data = ref(catalogueFull.find(el => el.routeName == route.params.categoryName));


// SEO optimization

useHead(() => {
  if (!data.value) {
    return {
      title: 'Страница не найдена | АРКА',
      meta: [
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  }

  const seo = getCategorySeo(data.value)

  return {
    title: seo.title,
    meta: [
      {
        name: 'description',
        content: seo.description,
      },
      {
        property: 'og:title',
        content: seo.title,
      },
      {
        property: 'og:description',
        content: seo.description,
      },
      {
        property: 'og:url',
        content: seo.canonical,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: seo.canonical,
      },
    ],
  }
})

</script>

<template>
    <BackButton/>
    <ComHeader></ComHeader>
    <ProductList :category-object="data"/>
    <ComFooter />
</template>

<style scoped>
</style>