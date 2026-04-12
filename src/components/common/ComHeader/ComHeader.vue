<script setup>

import ComBurger from './ComBurger.vue';
import ComSocialMedia from './ComSocialMedia.vue';
import { useRoute, useRouter} from 'vue-router'


// реализация скролла до нужного элемента!

const router = useRouter();
const route = useRoute();

function findElement(id){
  const el = document.getElementById(id);
  el.scrollIntoView({behavior:"smooth"});
}

function scrollTo(id){
  if (route.path != '/'){
    router.push('/')
  }
  setTimeout(findElement,0,id);
}

</script>

<template>
    <header v-bind="$attrs">
      <nav>
        <div class="nav-list">
          <a  @click="scrollTo('about')" class="nav__button" > О нас </a>
          <a @click="scrollTo('catalogue')" class="nav__button"> Каталог </a>
          <a @click="scrollTo('contacts')" class="nav__button"> Контакты </a>
        </div>
      </nav>
  
      <router-link to="/" class="logo">
        <img class="logo__img" src="/general/new_logo_dark_v3.png" alt="Логотип"/>
      </router-link>  
  
      <div class="social-media">
        <ComSocialMedia></ComSocialMedia>
        <ComBurger/>
      </div>
      <aside class="aside-nav aside-nav_hidden" @mousedown.prevent>
        <nav class="nav-list-mobile">
          <a @mousedown.stop="[scrollTo('about')]" class="aside-nav__link"  > О нас </a>
          <a @mousedown.stop="[scrollTo('catalogue')]" class="aside-nav__link"> Каталог </a>
          <a @mousedown.stop="[scrollTo('contacts')]" class="aside-nav__link"> Контакты </a>
        </nav>

        <div class="social-media-mobile">
  
          <a class="social-media-list__item" href="https://api.whatsapp.com/send/?phone=79036514678" > 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <use href="../../../assets/img/sprite.svg#whatsapp"></use>
            </svg> 
          </a>
          <a class="social-media-list__item" href="mailto:arka.zabor@yandex.ru" > 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <use href="../../../assets/img/sprite.svg#mail"></use>
            </svg>
          </a>
          <a class="social-media-list__item" href="tel:+79036514678">
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-telephone" viewBox="0 0 16 16">
            <use href="../../../assets/img/sprite.svg#phone"></use>
            </svg>
          </a>
        </div>
      </aside>
    </header>
  
  
     


</template>

<style scoped>

header{
  width:100%;
  box-sizing:border-box;
  background-color:#000;
  color:white;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  padding:6px 10px;
  position:fixed;
  z-index:2;
}

header:has(.burger:focus) .aside-nav_hidden {
  transform: translate(0, 0)  
}

/* Navigational panel */
nav{
  display:flex;
  flex-direction:row;
  align-items: center;  
  width:calc(100%/3);
}

.nav-list{
  display:none;
}


/* Logo-block */

.logo{
  display:block;
  width:calc(100%/3);
}
.logo__img{
  display:block;
  margin:5px auto;
  height:25px;
}

/* Social-media block */

.social-media{
  width:calc(100%/3);
  display:flex;
  flex-direction:row-reverse;
  align-items:center
}


.social-media-list__item{
  background-color: #000;
  padding:5px 2px 5px 0;
  fill: white;
  width:1.5em;
  border-bottom-left-radius: 20px;
  transition-duration: var(--duration);
}

.social-media-list__item:active {
  fill:var(--second-main-color)
}


/* Aside menu */

.aside-nav{
  background-color: #000;
  box-sizing: border-box;
  padding:20px;
  width:50vw;
  position:absolute;
  border-bottom-left-radius: 1em;
  top:100%;
  right:0;
  z-index:0;
  transition:0.5s;
}

.nav-list-mobile {
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-bottom: 1.5em;
}

.social-media-mobile {
  display: flex;
  gap:0.75em;
  padding-top:1.5em;
  border-top: 1px solid var(--second-main-color);
}

.aside-nav__link{
  color:white;
  display:block;
  margin:10px 1vw;
  text-decoration: none;
  text-transform: uppercase;
  font-family: var(--main-font-family);
  font-weight:600;
  cursor:pointer;
}

.aside-nav__link:hover {
  transition-duration: var(--duration);  
  color: var(--second-main-color);
}

.aside-nav_hidden{
  transform: translate(101%, 0)
}

/* ADAPTATION FOR DIFFERENT SCREENS */


@media (min-width:560px){
  .logo__img{
    height:30px;
  }
  .aside-nav{
    width:40%;
  }
  .social-media-list__item{
    padding: 10px 5px 10px 5px;
  }
}


@media (min-width:768px){
  .logo__img{
     height:35px
  }
  .aside-nav{
    width:30%;
  }
  .social-media-list__item{
    padding: 10px 8px 10px 8px;
  }
}

@media (min-width:1024px){
  .aside-nav{
    display:none;
  }
  header{
    padding:10px 25px;
    position:absolute;
    background:none;
  }
  .nav-list {
    display:flex;
  }
  .nav__button {
    color:white;
    display:block;
    margin:0 6px;
    text-decoration: none;
    text-transform: uppercase;
    transition-duration: var(--duration);
    font-family: var(--main-font-family);
    font-weight:600;
    font-size:0.8em;
    cursor:pointer;
  }
  @media (hover:hover){
    .nav__button:hover {
      color: var(--second-main-color)
    }
  }
  @media (hover: none){
    .nav__button:active {
      color: var(--second-main-color)
    }
  }
  .logo__img {
    height:35px;
  }
  .nav__open {
    display:none;
  }

  .social-media{
    display:flex;
    flex-direction: row-reverse;
    align-items: center;
  }
}


@media (min-width:1440px){
  header{
    padding:10px 25px;
  }
  .nav__button{
    margin:0 9px;
  }
  .logo__img{
    height:35px;
  }
}

@media (min-width:1600px){
  header{
    padding:15px 35px;
  }
  .nav__button{
    margin:0 12px;
  }
  .logo__img{
    height:45px;
  }
}

@media (min-width:1920px){
  header{
    padding:15px 45px;
  }
  .nav__button{
    margin:0 12px;
  }
  .logo__img{
    height:45px;
  }
}
</style>



<!-- #636363 - хороший цвет 
   #3c3c3c тоже
-->