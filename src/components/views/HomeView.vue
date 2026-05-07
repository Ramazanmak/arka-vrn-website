<script setup>

import { useHead } from '@unhead/vue';
import { getHomeSeo } from '../../seo';


import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import About from '../home/About/About.vue';
import Catalogue from '../home/Catalogue.vue';
import Advantages from '../home/Advantages.vue';
import ContactUs from '../home/ContactUs/ContactUs.vue';
import ComFooter from '../common/ComFooter.vue';

const seo = getHomeSeo();

useHead({
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
})

</script>

<template>
    <ComHeader/>
    <HomeFirstScreen/>
    <Catalogue />
    <Advantages/> 
    <About/>
    <ContactUs :isMain="true"/>
    <ComFooter/>
</template>