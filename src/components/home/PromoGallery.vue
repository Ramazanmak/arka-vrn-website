<script setup>
import { ref, onUnmounted} from 'vue';
import { promoBackgrounds } from '../../data/promo';

const activeBg = ref(1);

let interval = setInterval(() => showAnother(1), 7000);

function showAnother(step) {
  activeBg.value += step
  if (activeBg.value == promoBackgrounds.length + 1) {
    activeBg.value = 1;
  } else if (activeBg.value == 0) {
    activeBg.value = promoBackgrounds.length;
  } 
}

function changeBg(step) {
  clearInterval(interval);
  showAnother(step);
  interval = setInterval(() => showAnother(1), 7000);
}

onUnmounted(() => {
  clearInterval(interval);
})


</script>

<template>
  <section class="promo">
    <div class="promo-bg-wrapper">
      <template v-for="bg of promoBackgrounds" v-key="bg.id">
        <div class="promo-bg-item" :class="{'promo-bg-item__hidden': activeBg != bg.id}" style="overflow:hidden;">
          <img class="promo-bg-img" :src="bg.path" :alt="bg.text"/>
          <p class="promo-bg-name"> 
            <span class="promo-bg-text">{{ bg.text }}</span>
          </p>
        </div>
      </template>
      <div class="promo-bg-control">
        <div class="promo-bg-control_button reflectX" @click="() => changeBg(-1)">
          <button class="promo-bg-control_arrow-container">
            <div class="promo-bg-control_arrow-wrapper">
              <img class="promo-bg-control_arrow" src="/general/catalogue/arrow.png" alt="switch the background to the previous">
            </div>
          </button>
        </div>
        
        <div class="promo-bg-control_button" @click="() => changeBg(1)">
          <button class="promo-bg-control_arrow-container">
            <div class="promo-bg-control_arrow-wrapper">
              <img class="promo-bg-control_arrow" src="/general/catalogue/arrow.png" alt="switch the background to the next">
            </div>
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
    .promo {
      position:relative;
      width: 100%;
      transition-duration: var(--duration);
      background-color: var(--main-bg-color);
      height: 470px;
    }

    .promo * {
      transition-duration: inherit;
    }

    .promo-bg-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .promo-bg-control {
      position:absolute;
      top:0;
      width:100%;
      height:100%;
      display:flex;
      justify-content: space-between;
    }

    .promo-bg-control_button {
      width: 15%;
      height: 100%;
      display:flex;
      justify-content: center;
      align-items: center;
    }

    .promo-bg-control_arrow-container {
      background-color: transparent;
      width:100%;
      border:none;
      outline: none;
      height:3em;
      padding:0 10%
    }

    .promo-bg-control_arrow-wrapper {
      height:100%;
      aspect-ratio: 1;
      background-color: rgb(0, 0, 0, 0.3);
      margin:0 0 0 auto;
      padding:10%;
      border-radius:100%;
      display:flex;
      justify-content: center;
      align-items: center;
    }

    .promo-bg-control_arrow {
      display:block;
      height:80%;
      margin-left: 10%;
    }

    .reflectX {
      transform: scaleX(-100%);
    }
    
    .promo-bg-name {
      width: 100%;
      margin: 0;
      position:absolute;
      right: 0;
      bottom: 3em;
    }
    
    .promo-bg-text {
      display:block;
      margin: auto;
      padding: 0.3em 1em;
      width: 60%;
      max-width: 300px;
      font-size: 1em;
      text-align: center;
      border: 3px solid var(--second-main-color);
      color: var(--second-main-color);
      border-radius: 1em;
      background-color: white;
    }

    .promo-bg-item {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 75% 80%;
      position: absolute;
      overflow: hidden;
      top:0;
      transition-duration: 500ms;
      transition-timing-function:cubic-bezier(.53,0,.28,.97);
      visibility: visible;
      opacity: 1;
    }

    .promo-bg-item__hidden {
      visibility: hidden;
      opacity: 0;
    }

    .promo-bg-img {
      position: relative;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: 75% 80%;
    }

    

    @media (hover) {
      .promo-bg-control_button:hover .promo-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.5);
      }
      .promo-bg-control_button:active .promo-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.3);
      }
      .promo-link:hover {
        border-color: white;
      }
      .promo-link:active {
        background-color: rgb(248, 134, 64);
      }
    }

    @media (hover:none) {
      .promo-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.5);
      }
      .promo-bg-control_button:active .promo-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.2);
      }
      .promo-link:active {
        border-color: white;
        background-color: rgb(248, 134, 64);
      }
    }
   
    /* Настройка по ширине экрана */

    @media (min-width:768px){
        .promo {
          height: 460px;
        }
    }

    @media (min-width:1024px){
      .promo-bg-control_arrow-wrapper {
        padding:5%;
      }
      
      .promo{
        height: 640px;
      }

      .promo-link-wrapper {
        top: 0;
        height:100px;
        padding-bottom: 2.5em;
        flex-direction: row;
      }

      .promo-bg-text {
        font-size: 1.5em;
        max-width: 400px;
      }
    }
 

    @media (min-width:1440px){
      .promo-link {
        width:220px;
      }
      .promo {
        height: 720px;
      }
      .promo-bg-text {
        max-width: 600px;
      }
      .promo-bg-control_arrow-container {
        height:4em;
      }

    }


    @media (min-width: 1920px) {
      .promo-link { 
        width:350px;
      }
      .promo {
        height:920px;
      }
      .promo-bg-control_arrow-container {
        height:6em;
      }
    }

     @media (min-width: 2560px) {
      .promo-link {
        font-size: 1.3em;
        width:500px;
      }
      .promo {
        height:1200px;
      }
    }
</style>