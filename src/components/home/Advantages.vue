<script setup>
import { ref } from 'vue';
import { advantages } from '../../data/advantages';

const advants = ref(advantages);
  
</script>

<template>
  <section class="advantages" id="advantages">
    <h2 class="header"> Наши преимущества </h2>
    <p class="description">Мы работаем на качество и долговечность наших изделий</p>

    <div class="body">
      <div class="item-wrapper" v-for="adv in advants" :key="adv.id">
        <div class="item-header-wrapper">
          <img class="item-image" loading="lazy" :src="adv.src" :alt="adv.name">
          <div class="item-promo">
            <span class="item-promo__main highlighted"> {{ adv.mainPromo }}</span>
            <span class="item-promo__second"> {{ adv.secondPromo }}</span>
          </div>
        </div>
        <div class="item-description">
          <div class="item-description__wrapper">
            <h3 class="item-name"> <span>{{ adv.name }} </span></h3>
            <p class="item-text"> {{ adv.text }}</p>
          </div>
          <div class="animated-line">
            <div class="animated-line__inner"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .advantages{
    background-color: var(--global-500);
    padding:50px var(--side-padding) 50px;
    font-family: var(--main-font-family);
    --h3-adv-font-size:calc((var(--h2-font-size)) - 7px)
    transition-duration: var(--duration);
  }

  .advantages * {
    transition-duration: inherit;
  }

  .header{
    margin:0;
    margin-bottom:15px;
    font-size:var(--h2-font-size);
    color:var(--second-main-color); 
    font-weight:var(--h2-font-weight);
    text-align:center;
  }

  .description{
    text-align:center;
    font-size:1em;
    margin-bottom:2em;
  }

  .body{
    display:flex;
    width:100%;
    gap:1em;
    flex-flow:row wrap;
    justify-content: space-around;
  }

  .item-wrapper{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap:1em;
    padding:10px 5px;
    text-align: left;
    width:90%;
    padding: 1em;
    border: 2px solid var(--global-600);  
    border-radius: 1em;
    background-color: white;
    transition-duration: 500ms;
    box-shadow: 0 0 10px 1px var(--global-600)
  }
  
  .item-header-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .item-promo {
    flex-grow:1;
    width:70%;
  }

  .item-promo__main{
    display: block;
    margin:0;
    font-size:1.5em;
    text-align: right;
  }
  .item-promo__second{
    display: block;
    margin:0;
    font-size: 0.6em; 
    font-weight: 700;
    color: var(--global-700);
    text-transform: uppercase;
    text-align: right;
    text-wrap: wrap;
  }

  .item-image{
    display:block;
    margin:0;
    aspect-ratio: 1;
    width:25%;
  }

  .item-description{
    justify-self: flex-end;
    flex-grow:1;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: flex-start;
    gap:1em;
    width:100%;
    /* border:1px solid red; */
  }

  .item-description__wrapper{
    max-width:100%;
  }

  .item-name{
    font-weight:600;
    flex-grow:0;
    margin:0 0 1em;
  }

  .item-text{
    font-size: 0.9em;
    color:var(--global-700);
    text-wrap:stable;
    margin:0 0 1em;
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
  
  @media (hover) {
    .item-wrapper:hover {
      border-color: var(--second-main-color);
      transform: scale(105%);
      box-shadow: 0 0 10px 1px var(--second-main-color);

      .item-name {
        color: var(--second-main-color)
      }

      .animated-line__inner {
        width: 100%;
      }
    }
  }
  @media (hover:none) {
    .item-wrapper:active {
      border-color: var(--second-main-color);
      transform: scale(105%);
      box-shadow: 0 0 10px 1px var(--second-main-color);

      .item-name {
        color: var(--second-main-color)
      }

      .animated-line__inner {
        width: 100%;
      }
    }
  }

  @media (min-width:560px){
     
    .item-wrapper{
      width:45%;
    }
  }

   

  @media (min-width:1024px){
    .advantages{
      padding-bottom:100px;
    }
    .body{
      justify-content:center;
    }
    .item-wrapper{
      width:31%;
    }
  }

  @media (min-width:1440px){
    .item-name{
      font-size:21px;
    }
  }

  @media (min-width:1920px){
    .item-name{
      font-size:25px;
    }
  }
</style>
