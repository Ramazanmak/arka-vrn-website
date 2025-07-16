<script setup>

  import {ref} from 'vue'

  import ComHeader from '../common/ComHeader/ComHeader.vue';
  import Banner from '../thankyou/Banner.vue';

  const screenWidth = ref(window.screen.width)

  console.log(screenWidth.value)

</script>

<template>
  <ComHeader style="background-color:var(--contacts-bg-color);"/> 
   
  <!-- <section class="anchor-wrapper">
    <p class="message"> Спасибо за прохождение квиза!</p>
    <a class="download-anchor" 
      href="https://arka-vrn.ru/Checklist_MAF_hidden_risks.pdf"
      download="Checklist_MAF_hidden_risks.pdf">
      Скачать чек лист
    </a>
    <router-link class="download-anchor" to="/">
      На главную
    </router-link>
  </section> -->

  
  <div class="wrapper">
    <section class="main-content">
      <div class="grey-part">
        <div class="top-banner-container">
          <Banner></Banner>
        </div>
      </div>
      <div class="content-part">
        <div class="content-wrapper">
          
        </div>
        <h2 class="greeting">
          Спасибо за вашу заявку!
        </h2>

        <p class="simple-message">
          Уже подбираем для вас лучшее решение &mdash; мастер скоро даст ответ!
        </p>

        <p class="simple-message">
          Если нужно срочно <span> &mdash; </span> не теряйте время, звоните:
        </p>

        <p class="phone-number">
          <img class="phone-number__image" src="/general/phone.png"> 
          <a class="phone-number__number" href="tel:+7(903)651-46-78"> +7 (903) 651-46-78</a>
        </p>

        <p class="simple-message">
          Получите чек-лист и сэкономьте до 1 миллиона рублей при покупке МАФ:
        </p>
      </div>
    </section>

    <section class="anchor-wrapper">


      <Banner class="bottom-banner"></Banner>
      <p class="simple-message_bottom">
          Получите чек-лист и сэкономьте до 1 миллиона рублей при покупке МАФ:
        </p>
      <a class="download-link"
        href="https://arka-vrn.ru/Checklist_MAF_hidden_risks.pdf"
        download="Checklist_MAF_hidden_risks.pdf">
        Скачать чек-лист
      </a>
    </section>
  </div>




</template>

<style scoped>



.wrapper { 
  font-family:var(--main-font-family);
  --font-size:16px;
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.main-content{
  background-color:#fff;
  position:relative;
  height:65vh;
  overflow-y:scroll;
  scrollbar-width: 1px;
}

.grey-part{
  background-color: var(--main-bg-color);
  height:100%;
  clip-path: polygon(86% 0, 100% 0, 100% 100%, 73% 100%);
  margin-left:auto;
}

.top-banner-container {
  display:none;
}

.content-part{
  padding:0px var(--side-padding) 0;
  position:absolute;
  /* background-color: red; */
  height:100%;
  top:0;
  left:0;
  display:flex;
  flex-direction:column;
  justify-content: center;
  gap:3px;
}

.greeting {
  margin:0 0 10px 0;
  text-transform:uppercase;
  font-size:27px;
  color:var(--second-main-color)
}

.simple-message{
  font-size:13px;
  line-height:1.3em;
  font-weight:400;
  margin:0;
  padding:5px 0;
}

.simple-message_bottom{
  display:none;
}

.phone-number {
  display:flex;
  flex-direction:row;
  justify-content: flex-start;
  align-items: center;
  gap:10px;
  margin:0;
  padding:20px 0 10px;
}

.phone-number__image{
  display:block;
  aspect-ratio:1 / 1;
  width: 30px;
}

.phone-number__number{
  display:block;
  text-decoration:none;
  color:var(--contacts-bg-color);
  transition-duration:0.2s;
  font-size:22px;
  font-weight:600;
}

.phone-number__number:hover{
  color:var(--second-main-color)
}


.anchor-wrapper {
  width:100%;
  background-color: var(--contacts-bg-color);
  height:35vh;
  text-align: center;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:10px;
}

.download-link{
  display:block;
  background-color:var(--second-main-color);
  padding:10px;
  max-width:250px;
  border-radius: 10px;
  font-family:var(--main-font-family);
  font-size:11.5px;
  font-weight:500;
  text-decoration:none;
  color:white;
  transition:0.4s;
  cursor:pointer;
}


/* Настройка адаптивности */

@media (min-width:560px) {
  .content-part{
    padding:0px calc(var(--side-padding) + 20px) 0;
    gap:5px;
    padding-top:10px;
  }

  .greeting {
    font-size:30px;
  }

  .simple-message {
    max-width: 90%;
    font-size:15px;
  }

  .phone-number__image{
    width:40px;
  }

  .phone-number__number{
    font-size:26px
  }

  .download-link{
    font-size:15px
  }
}

@media (min-width:768px){

  .main-content{
    height:80%;
  }

  .content-part{
    padding-left: 6vw;
    max-width:50vw;
  }

  .greeting{
    font-size:30px;
  }

  .simple-message{
    font-size:15px;
  }
  
  .simple-message:last-of-type{
    display:none;
  }

  .bottom-banner{
    display:none;
  }

  .anchor-wrapper{
    height:20%;
    flex-direction: row;
    justify-content: center;
    gap:10px;
  }

  
  .grey-part{
    clip-path: polygon(58% 0, 100% 0, 100% 100%, 54% 100%);;
  }
  
  .top-banner-container{
    padding-top:20px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    width:40vw;
    height:100%;
    margin-left:auto;
  }  
  
  .simple-message_bottom{
    display:block;
    color:white;
    max-width:50vw;
    text-align:left;
    font-size:15px;
  }
  .download-link{
    font-size:15px;
    padding:15px;
  }
}


@media (min-width:1024px){


  .main-content{
    height:80%;
  }

  .content-part{
    padding-left: 6vw;
    max-width:50vw;
  }

  .greeting{
    font-size:38px;
  }

  .simple-message{
    font-size:20px;
  }

  
  .simple-message_bottom{
    max-width:50vw;
    text-align:left;
    font-size:20px;
  }

  .download-link{
    font-size:20px;
    padding:15px;
  }
}


@media (min-width:1440px){

  .greeting{
    font-size:45px;
    padding-bottom:20px;
  }

  .simple-message{
    font-size:18px;
  }

  .phone-number__image{
    width:55px;
  }

  .phone-number__number{
    font-size:35px
  }

  .anchor-wrapper{
    gap:50px;
  }

  .simple-message_bottom{
    max-width:40vw;
    text-align:left;
    font-size:20px;
  }
  .download-link{
    font-size:25px;
    padding:25px;
  }
}

@media (min-width:1600px){

  .greeting{
    font-size:50px;
    padding-bottom:25px;
  }

  .simple-message{
    font-size:24px;
  }

  .phone-number{
    padding-top:30px;
  }

  .phone-number__image{
    width:65px;
  }

  .phone-number__number{
    font-size:40px
  }

  .anchor-wrapper{
    gap:50px;
  }

  .simple-message_bottom{
    max-width:40vw;
    text-align:left;
    font-size:25px;
  }
  .download-link{
    font-size:25px;
    padding:25px;
  }
}


@media (min-width:1920px){

  .greeting{
    font-size:60px;
    padding-bottom:20px;
  }

  .simple-message{
    font-size:25px;
  }

  .phone-number__image{
    width:70px;
  }

  .phone-number__number{
    font-size:45px
  }

  .anchor-wrapper{
    gap:50px;
  }

  .simple-message_bottom{
    max-width:50vw;
    font-size:30px;
  }
  .download-link{
    font-size:30px;
    padding:30px;
  }
}

@media (min-width:2560px){

  .greeting{
    font-size:75px;
    padding-bottom:40px;
  }

  .simple-message{
    font-size:35px;
  }

  .phone-number__image{
    width:85px;
  }

  .phone-number__number{
    font-size:55px
  }

  .anchor-wrapper{
    gap:100px;
  }

  .simple-message_bottom{
    max-width:50vw;
    font-size:40px;
  }
  .download-link{
    max-width:400px;
    font-size:40px;
    padding:40px;
  }
}


/* Вертикальная адаптивность */

@media (min-width:768px) and (max-width:1024px) and (min-height:1024px) {

  .main-content{
    height:80%;
  }

  .content-part{
    padding-left: 6vw;
    max-width:50vw;
  }

  .greeting{
    font-size:40px;
    padding-bottom:20px;
  }

  .anchor-wrapper{
    gap:20px;
  }
  .simple-message{
    font-size:23px;
  }
  .simple-message_bottom{
    max-width:55vw;
    text-align:left;
    font-size:22px;
  }
  .download-link{
    font-size:22px;
    padding:22px;
  }
}


</style>