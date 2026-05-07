<script setup>

import ComBurger from './ComBurger.vue';
import ComSocialMedia from './ComSocialMedia.vue';
import { useRoute, useRouter} from 'vue-router'


// scrolling to a chosen element

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
          <RouterLink :to="`/#about`" @click="scrollTo('about')" class="nav__button" > О нас </RouterLink>
          <RouterLink :to="`/#catalogue`" @click="scrollTo('catalogue')" class="nav__button"> Каталог </RouterLink>
          <RouterLink :to="`/#contacts`" @click="scrollTo('contacts')" class="nav__button"> Контакты </RouterLink>
        </div>
      </nav>
  
      <RouterLink to="/" class="logo">
        <img class="logo__img" src="/general/new_logo_dark_v3.png" alt="Логотип"/>
      </RouterLink>  
  
      <div class="social-media">
        <ComSocialMedia></ComSocialMedia>
        <ComBurger/>
      </div>
      <aside class="aside-nav aside-nav_hidden" @mousedown.prevent>
        <nav class="nav-list-mobile">
          <RouterLink :to="`/#about`" @mousedown.stop="[scrollTo('about')]" class="aside-nav__link"  > О нас </RouterLink>
          <RouterLink  :to="`/#catalogue`" @mousedown.stop="[scrollTo('catalogue')]" class="aside-nav__link"> Каталог </RouterLink>
          <RouterLink  :to="`/#contacts`" @mousedown.stop="[scrollTo('contacts')]" class="aside-nav__link"> Контакты </RouterLink>
        </nav>

        <div class="social-media-mobile">
  
          <a class="social-media-list__item" href="https://max.ru/" > 
            <svg xmlns="http://www.w3.org/2000/svg" id="max" viewBox="0 0 42 42" class="sm-icon">
              <path d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67Zm.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z"></path>  
            </svg>
          </a>
          <a class="social-media-list__item" href="mailto:arka.zabor@yandex.ru" > 
            <svg id="mail" viewBox="0 0 16 16" class="sm-icon">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
          </a>
          <a class="social-media-list__item" href="tel:+79036514678">
            <svg id="phone" viewBox="0 0 16 16" class="sm-icon">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
          </a>
        </div>
      </aside>
    </header>
  
  
     


</template>

<style scoped>

header{
  width:100%;
  height:var(--headerHeight);
  box-sizing:border-box;
  background-color:#000;
  color:white;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:6px 10px;
  position:fixed;
  z-index:2;
  border-bottom: 2px solid var(--second-main-color);
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
  height:80%;
}
.logo__img{
  display:block;
  margin: auto;
  height:100%;
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
  width:2.5em;
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
  border-top: 2px solid var(--second-main-color);
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
  .aside-nav{
    width:40%;
  }
  .social-media-list__item{
    padding: 10px 5px 10px 5px;
  }
}


@media (min-width:768px){
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
}

@media (min-width:1600px){
  header{
    padding:15px 35px;
  }
  .nav__button{
    margin:0 12px;
  }
}

@media (min-width:1920px){
  header{
    padding:15px 45px;
  }
  .nav__button{
    margin:0 12px;
  }
}
</style>



<!-- #636363 - хороший цвет 
   #3c3c3c тоже
-->