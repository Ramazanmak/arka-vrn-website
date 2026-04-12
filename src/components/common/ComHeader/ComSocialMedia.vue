<script setup>
</script>

<template> 
  <a class="social-media__item" href="https://api.whatsapp.com/send/?phone=79036514678"> 
    <svg xmlns="http://www.w3.org/2000/svg" id="max" viewBox="0 0 42 42" fill="currentColor" class="sm-icon">
      <path d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67Zm.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z"></path>  
    </svg>
  </a>
  <a class="social-media__item" href="mailto:arka.zabor@yandex.ru"> 
    <svg id="mail" viewBox="0 0 16 16" class="sm-icon">
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
    </svg>
  </a>
  <a class="social-media__item" href="tel:+79036514678">
    <svg id="phone" viewBox="0 0 16 16" class="sm-icon">
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
    </svg>
  </a>
   
</template>

<style scoped>
.social-media__item{
  display:none;
  color:white;
}
template{
  text-align: right;
}
.sm-icon {
  width: 1.5em;
  aspect-ratio: 1;
  fill: currentColor;
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