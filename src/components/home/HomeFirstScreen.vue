<script setup>
import { ref, onUnmounted} from 'vue';
import { heroBackgrounds } from '../../data/hero';

const activeBg = ref(1);

let interval = setInterval(() => showAnother(1), 7000);

function showAnother(step) {
  activeBg.value += step
  if (activeBg.value == heroBackgrounds.length + 1) {
    activeBg.value = 1;
  } else if (activeBg.value == 0) {
    activeBg.value = heroBackgrounds.length;
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
  <section class="hero">
    <div class="hero-bg-wrapper">
      <template v-for="bg of heroBackgrounds" v-key="bg.id">
        <div class="hero-bg-item" :class="{'hero-bg-item__hidden': activeBg != bg.id}" :style="`background-image: url(${bg.path});`"></div>
      </template>
      <div class="hero-bg-control">
        <div class="hero-bg-control_button reflectX" @click="() => changeBg(-1)">
          <button class="hero-bg-control_arrow-container">
            <div class="hero-bg-control_arrow-wrapper">
              <img class="hero-bg-control_arrow" src="/general/catalogue/arrow.png" alt="switch the background to the previous">
            </div>
          </button>
        </div>
        <div class="hero-link-wrapper">
          <a class="hero-link"
            href="#catalogue">
            К продукции
          </a>
          <a class="hero-link"
            target="_blank"
            href="https://arka-vrn.ru/Checklist_MAF_hidden_risks.pdf"
            download="Checklist_MAF_hidden_risks.pdf">
            Скачать каталог
          </a>
        </div>
        <div class="hero-bg-control_button" @click="() => changeBg(1)">
          <button class="hero-bg-control_arrow-container">
            <div class="hero-bg-control_arrow-wrapper">
              <img class="hero-bg-control_arrow" src="/general/catalogue/arrow.png" alt="switch the background to the next">
            </div>
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
    .hero {
      width: 100%;
      height: 560px;
      padding-top:var(--headerHeight);
      transition-duration: var(--duration);
      background-color: var(--main-bg-color);
    }

    .hero * {
      transition-duration: inherit;
    }

    .hero-bg-wrapper {
      width: 100%;
      height: 420px;
      position: relative;
    }

    .hero-bg-control {
      position:absolute;
      top:0;
      width:100%;
      height:100%;
      display:flex;
      justify-content: space-between;
    }

    .hero-bg-control_button {
      width: 15%;
      height: 100%;
      display:flex;
      justify-content: center;
      align-items: center;
    }

    .hero-bg-control_arrow-container {
      background-color: transparent;
      width:100%;
      border:none;
      outline: none;
      height:5%;
      padding:0 10%
    }

    .hero-bg-control_arrow-wrapper {
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

    .hero-bg-control_arrow {
      display:block;
      height:80%;
      margin-left: 10%;
    }

    .reflectX {
      transform: scaleX(-100%);
    }

    .hero-bg-item {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 80% 80%;
      position: absolute;
      top:0;
      transition-duration: 500ms;
      transition-timing-function:cubic-bezier(.53,0,.28,.97);
      visibility: visible;
      opacity: 1;
    }

    .hero-bg-item__hidden {
      visibility: hidden;
      opacity: 0;
    }

    .hero-link-wrapper {
      width: 100%;
      height: 140px;
      display: flex;
      align-self: flex-end;
      position:relative;
      top:140px;
      gap:1em;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .hero-link {
      display:block;
      border:2px solid var(--second-main-color);
      background-color: var(--second-main-color);
      padding:0.5em 1.5em;
      width:150px;
      border-radius: 1em;
      font-family:var(--main-font-family);
      font-size:1em;
      font-weight:500;
      text-decoration:none;
      text-align: center;
      color:white;
      transition:0.4s;
      cursor:pointer;
    }

    @media (hover) {
      .hero-bg-control_button:hover .hero-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.5);
      }
      .hero-bg-control_button:active .hero-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.3);
      }
      .hero-link:hover {
        border-color: white;
      }
      .hero-link:active {
        background-color: rgb(248, 134, 64);
      }
    }

    @media (hover:none) {
      .hero-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.5);
      }
      .hero-bg-control_button:active .hero-bg-control_arrow-wrapper {
        background-color: rgb(0, 0, 0, 0.2);
      }
      .hero-link:active {
        border-color: white;
        background-color: rgb(248, 134, 64);
      }
    }
   
    /* Настройка по ширине экрана */

    @media (min-width:768px){
        .hero {
          height: 600px;
        }
        .hero-bg-wrapper {
          height: 460px;
        }
    }

    @media (min-width:1024px){
      .hero-bg-control_arrow-wrapper {
        padding:5%;
      }
      
      .hero-bg-wrapper {
        height: 100%;
      }

      .hero-link-wrapper {
        top: 0;
        height:100px;
        padding-bottom: 2.5em;
        flex-direction: row;
      }
    }
 

    @media (min-width:1440px){
        .hero {
          height: 700px;
        }
    }
</style>