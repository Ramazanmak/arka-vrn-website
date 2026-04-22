<script setup>
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'

const catalogueItems = ref([
  {
    id:1,
    name:"Вазоны",
    description: "Бетонные и металлические вазоны для озеленения городских пространств и парковых зон",
    routeName:"vases",
    src1:"/general/catalogue/vases.webp",
    src2:"/general/catalogue/vases.png"
     
  },
  {
    id:2,
    name:"Парковые диваны и скамейки",
    routeName:"benches",
    description: "Комфортные и долговечные решения для зон отдыха",
    src1:"/general/catalogue/benches.webp",
    src2:"/general/catalogue/benches.png"
  },
  {
    id:3,
    name:"Урны",
    routeName:"bins",
    description: "Стильные урны для поддержания чистоты общественных пространств",
    src1:"/general/catalogue/bins.webp",
    src2:"/general/catalogue/bins.png"
  },
  {
    id:4,
    name:"Антипарковочные элементы",
    routeName:"antiparking",
    description: "Полусферы и столбики для организации парковочного пространства",
    src1:"/general/catalogue/antiparkings.webp",
    src2:"/general/catalogue/antiparkings.png"
  },
  {
    id:5,
    name:"Мусорные площадки",
    routeName:"platforms",
    description: "Функциональные площадки для сбора и сортировки отходов",
    src1:"/general/catalogue/platforms.webp",
    src2:"/general/catalogue/platforms.png"
  },
  {
    id:6,
    name:"Бетонные блоки и крышки",
    routeName:"concrete-blocks",
    description: "Надёжные решения для благоустройства и строительства",
    src1:"/general/catalogue/concrete-blocks.webp",
    src2:"/general/catalogue/concrete-blocks.png"
  },
  {
    id:7,
    name:"Заборы",
    routeName:"fences",
    description: "Надёжные решения для ограждения придомовых участков",
    src1:"/general/catalogue/fences.webp",
    src2:"/general/catalogue/fences.png"
  }

])

const router = useRouter();
const route = useRoute()

function goToCategory(category){
  router.push(`/categories/${category}`)
}
</script>

<template>
  <section class="catalogue" id="catalogue" >
    <h2 class="catalogue__header"> Наша продукция </h2>
    
    <div class="catalogue__body">
      <a
        class="catalogue__body-link" 
        v-for="category in catalogueItems" 
        @click.stop="goToCategory(category.routeName)"
      >
        <picture class="catalogue__image-block">
          <source type="image/webp" :srcset="category.src1">
          <img class="catalogue__image" loading="lazy" :src="category.src2" :alt="category.name">
        </picture>
        <div class="catalogue__card-info">
          <h3 class="catalogue__caption">{{ category.name }}</h3>
          <div class="catalogue__card-bottom">
            <p class="catalogue__card-description">{{ category.description }}</p>
            <div class="animated-line">
              <div class="animated-line__inner"></div>
            </div>
          </div>
        </div>
        <div class="catalogue__more-wrapper">
          <img class="catalogue__more-logo" style="color:white; fill:white" src="/general/catalogue/long-arrow.svg" alt="more">
          </img>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
  .catalogue{
    background-color: var(--main-bg-color);
    padding:70px var(--side-padding) 50px;
    font-family: var(--main-font-family);
    transition-duration: var(--duration);
  }

  .catalogue * {
    transition-duration: inherit;
  }

  .catalogue__body {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    gap: 1em;
  }

  .catalogue__header{
    margin:0 0 2em;
    font-size:var(--h2-font-size);
    color:var(--second-main-color);
    font-weight:500;
    text-align: center;
  }
  
  .catalogue__body-link{
    display:flex;
    flex-direction: column;
    background-color: white;
    text-decoration:none;   
    color:black;
    position:relative;
    border-radius:0.5em;
    width: 90%;
    padding-bottom: 1em;
    overflow: hidden;
    border: 2px solid var(--global-600);  
    box-shadow: 0 0 10px 1px var(--global-600);
    transition-duration: 500ms;
  }


  .catalogue__image-block{
    display:flex;
    flex-direction: column;
    border-radius:1em;
    margin: 0 0 1em;
  }
  

  .catalogue__card-info {
    flex-grow: 1;
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1em;
  }
  
 

  .catalogue__image{
    display:block;
    padding-bottom:8px;
    width:100%;
    mask-image:linear-gradient(180deg, rgb(255,255,255) 50%, transparent);
    transition:0.4s;
  }

  .catalogue__card-bottom {
    min-height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .catalogue__caption{
    font-size: 1em;
    margin:0;
    font-weight:500;
    width:100%;
  }

  .catalogue__card-description {
    margin:0 0 1em;
    font-size: 0.8em;
    color: var(--global-700);
  }

  .animated-line {
    width:100%;
    height: 3px;
    background-color: var(--global-600);
    justify-self: flex-end;
  }
  .animated-line__inner {
    width:0%;
    height: 100%;
    background-color: var(--second-main-color);
  }

  .catalogue__more-wrapper{
    display:flex;
    align-items: center;
    width:14%;
    aspect-ratio: 1/1;
    background-color: var(--second-main-color);
    border-radius:100%;
    position:absolute;
    top:3%;
    left:80%;  
    opacity: 0%;
    transform: rotate(-180deg);
  }

  .catalogue__more-logo{
    display:block;
    margin:auto;
    height: 50%;
  }

  @media(hover){
    .catalogue__body-link:hover {
      transform: scale(105%);
      border-color: var(--second-main-color);
      box-shadow: 0 0 15px 1px var(--second-main-color);

      .catalogue__image {
        transform: scale(108%);
        transition-duration: 500ms;
      }

      .catalogue__more-wrapper{
        opacity: 100%;
        transform: rotate(-135deg);
      }
      
      .catalogue__caption {
        color:var(--second-main-color);
      }

      .animated-line__inner {
        width: 100%;
      }
    }
  }

  @media(hover:none){
    .catalogue__body-link:active {
      transform: scale(105%);
      border-color: var(--second-main-color);
      box-shadow: 0 0 10px 1px var(--second-main-color);

      
      .catalogue__image {
        transform: scale(108%);
        transition-duration: 500ms;
      }

      .catalogue__more-wrapper{
        opacity: 100%;
        transform: rotate(-135deg);
      }
      
      .catalogue__caption {
        color:var(--second-main-color);
      }

      .animated-line__inner {
        width: 100%;
      }
    }
  }

  
  @media (min-width:560px){
    .catalogue__caption{
      font-size: 1em;
    }
    .catalogue__body-link{
      width:45%;
    }
  }
  
  @media (min-width:1024px){
    .catalogue__more-wrapper {
      left:85%;
    }
    .catalogue__caption{
      font-size: 1.2em;
    }
    .catalogue__body-link{
      max-width: 31%;
    }
  }
  
  @media (min-width:1440px){
    .catalogue__more-wrapper{
      width:12%;
      bottom:10%;
      right:8%;
    }
  }

  @media (min-width:1920px){
    .catalogue__caption{
      font-size:18px;
    }
  }
</style>