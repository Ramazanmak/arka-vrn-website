<script setup>

import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import About from '../home/About/About.vue';
import Catalogue from '../home/Catalogue.vue';
import Advantages from '../home/Advantages.vue';
import ContactUs from '../home/ContactUs/ContactUs.vue';
import ComFooter from '../common/ComFooter.vue';

</script>

<template>
    <ComHeader/>
    <HomeFirstScreen :is-main="true"/>
    <About/>
    <Catalogue />
    <Advantages/> 
    <ContactUs :isMain="true"/>
    <ComFooter/>
</template>