<script setup>
import {ref, useTemplateRef} from 'vue';

import ComHeader from '../common/ComHeader/ComHeader.vue';
import HomeFirstScreen from '../home/HomeFirstScreen.vue';
import About from '../home/About/About.vue';
import Catalogue from '../Home/Catalogue.vue';
import Advantages from '../Home/Advantages.vue';

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
    <ComHeader ref="header" ></ComHeader>
    <HomeFirstScreen @click="togglePanels"></HomeFirstScreen>
    <About @click="togglePanels"></About>
    <Catalogue  @click="togglePanels"></Catalogue>
    <Advantages> </Advantages>
</template>