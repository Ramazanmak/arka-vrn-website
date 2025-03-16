<script setup>
import {ref, useTemplateRef} from 'vue';

import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import About from '../home/About/About.vue';
import Catalogue from '../home/Catalogue.vue';
import Advantages from '../home/Advantages.vue'
import ContactUs from '../home/ContactUs/ContactUs.vue';
import ComFooter from '../common/ComFooter.vue';


const ComHeaderObj = useTemplateRef('header');
function togglePanels(){
    if(!ComHeaderObj.value.asideIsHidden){
        ComHeaderObj.value.asideIsHidden = !ComHeaderObj.value.asideIsHidden;
    } 
    if(!ComHeaderObj.value.socialMediaListIsHidden){
        ComHeaderObj.value.socialMediaListIsHidden = !ComHeaderObj.value.socialMediaListIsHidden
    }
}

</script>

<template>
    <ComHeader ref="header"/>
    <HomeFirstScreen @click="togglePanels"/>
    <About @click="togglePanels"/>
    <Catalogue  @click="togglePanels"/>
    <Advantages @click="togglePanels"/> 
    <ContactUs @click="togglePanels"/>
    <ComFooter @click="togglePanels"/>
</template>