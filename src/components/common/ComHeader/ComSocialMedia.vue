<script setup>

</script>

<template> 
  <a class="social-media__item" href="https://api.whatsapp.com/send/?phone=79036514678"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
    <use href="../../../assets/img/sprite.svg#whatsapp"></use>
    </svg> 
  </a>
  <a class="social-media__item" href="mailto:arka.zabor@yandex.ru"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
    <use href="../../../assets/img/sprite.svg#mail"></use>
    </svg>
   </a>
   <a class="social-media__item" href="tel:+79036514678">
    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
    <use href="../../../assets/img/sprite.svg#phone"></use>
    </svg>
   </a>
   
</template>



<style scoped>
.social-media__item{
  display:none;
}
template{
  text-align: right;
}


@media (min-width:1024px){
  .social-media-list__icon{
    display:none;
  }
  .social-media__item{
    display:block;
    color:white;
    transition-duration: var(--duration);
    margin:0 1vw;
  }
  .social-media__item:first-of-type{
    margin-right:2vw;
  }
  .social-media__item{
    margin-right:0.4vw
  }
  @media (hover:hover){
    .social-media__item:hover {
      color: var(--second-main-color)
    }
  }
  @media (hover: none){
    .social-media__item:active {
      color: var(--second-main-color)
    }
  }
}

</style>