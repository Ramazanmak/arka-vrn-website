<script setup>

</script>

<template>
  <div class="container">
    <img class="logo" src="/general/new_logo_dark_v3.png">
    <p class="subtitle">Чек-лист для клиентов АРКА</p>
    
    <div class="quote">
        «7 скрытых рисков при закупке МАФ:
        как сэкономить до 1 млн ₽
        и избежать срыва сроков»
    </div>
    
    <img class="curved-arrow curved-arrow_top-left" src="/general/curved-arrow.png">
    <img class="curved-arrow curved-arrow_top-right" src="/general/curved-arrow.png">
    <img class="curved-arrow curved-arrow_bottom-left" src="/general/curved-arrow.png">
    <img class="curved-arrow curved-arrow_bottom-right" src="/general/curved-arrow.png">
    
    <ul class="benefits-list">
        <li>Гарантируем лучшие цены в сочетании с отличным качеством</li>
        <li>Строго соблюдаем все стандарты производства бетонных изделий</li>
        <li>Бесплатная погрузка изделий на транспортное средство</li>
        <li>Опыт более 25 лет</li>
    </ul>
  </div>
</template>

<style scoped>

  .container {
    position:relative;
    max-width: 100px;
    margin:0 auto;
    padding:10px;
    background-color: #007D26;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: #fff;
  }

  .logo{
    display:block;
    width:47px;
    margin:auto;
  }

  .subtitle {
      font-size: 6px;
      font-weight: 600;
      text-shadow: 2px 2px 1px var(--contacts-bg-color);
  }

  
  .quote {  
      font-size: 8px;
  }
    
  .benefits-list {
      padding: 0 20px 0 20px;
      margin: 10px 0 0;
      text-align: left;
      color:#000;
    }
    
  .benefits-list li {
      position: relative;
      font-size:4px;
      padding:0;
      margin-bottom: 2px;
    }

  .curved-arrow{
    position:absolute;
    width:15px;
    --x-translation:-20px;
    --y-translation:5px;
  }

  .curved-arrow_top-left{
    transform: matrix(-1, 0, 0, 1, 0, 0) rotate(60deg);
    top: var(--y-translation);
    left: var(--x-translation)
  }

  .curved-arrow_top-right{
    transform: rotate(60deg);
    top: var(--y-translation);
    right: var(--x-translation);
  }
  
  .curved-arrow_bottom-left{
    transform: rotate(-120deg);
    bottom: var(--y-translation);
    left: var(--x-translation);
  }
  
  .curved-arrow_bottom-right{
    transform: matrix(-1, 0, 0, 1, 0, 0) rotate(-120deg);
    bottom: var(--y-translation);
    right: var(--x-translation);
  }


  /* Настройка адаптивности */



  @media (min-width:560px) {
    .container{
      max-width:125px
    }

    .logo{
      width:57px;
    }

    .benefits-list li{
      font-size:5px;
    }
  }


  @media (min-width:768px){

    .container{
      max-width:200px;
      text-align:center;
    }
    .subtitle {
        font-size: 12px;
        padding:5px 0;
    }
    .logo{
      width:65px;
    }

    .quote {  
      font-size: 13px;
    }

    .benefits-list li{
      font-size:7px;
      padding:2px 0;
    }

    .curved-arrow{
      position:absolute;
      width:20px;
      filter: invert(1);
      --x-translation: -25px
    }

  }

  @media (min-width:1024px) {
    .container{
      max-width:300px;
      text-align:center;
    }
    .subtitle {
        font-size: 15px;
        padding:5px 0;
    }
    .logo{
      width:77px;
    }

    .quote {  
      font-size: 18px;
    }

    .benefits-list li{
      font-size:10px;
      padding:5px 0;
    }

    .curved-arrow{
      width:25px;
      --x-translation: -30px
    }
  }

   @media (min-width:1440px){
    .container{
      padding:10px;
      max-width:400px;
      text-align:center;
    }
    .subtitle {
        font-size: 15px;
        padding:5px 0;
    }
    .logo{
      width:97px;
    }

    .quote {  
      font-size: 25px;
    }

    .benefits-list{
      padding:10px 50px;
    }

    .benefits-list li{
      font-size:14px;
      padding:5px 0px;
    }

    .curved-arrow{
      width:50px;
      --x-translation: -50px
    }

  }

@media (min-width:1600px){
    .container{
      padding:10px;
      max-width:450px;
      text-align:center;
    }
    .subtitle {
        font-size: 20px;
        padding:5px 0;
    }
    .logo{
      width:107px;
    }

    .quote {  
      font-size: 30px;
    }

    .benefits-list{
      padding:10px 50px;
    }

    .benefits-list li{
      font-size:18px;
      padding:5px 0px;
    }

    .curved-arrow{
      width:50px
    }
  }

  @media (min-width:1920px){
    .container{
      padding:10px;
      max-width:500px;
      text-align:center;
    }
    .subtitle {
        font-size: 25px;
        padding:5px 0;
    }
    .logo{
      width:107px;
    }

    .quote {  
      font-size: 38px;
    }

    .benefits-list{
      padding:10px 70px;
    }

    .benefits-list li{
      font-size:18px;
      padding:5px 0px;
    }

    .curved-arrow{
      width:50px
    }
  }


  @media (min-width:2560px) {
    .container{
      padding:10px;
      max-width:700px;
      text-align:center;
    }
    .subtitle {
        font-size: 35px;
        padding:5px 0;
    }
    .logo{
      width:127px;
    }

    .quote {  
      font-size: 48px;
    }

    .benefits-list{
      padding:10px 70px;
    }

    .benefits-list li{
      font-size:26px;
      padding:5px 0px;
    }

    .curved-arrow{
      width:70px;
      --x-translation: -70px
    }


  }


/* Настройка вертикальныйх больших экранов */

@media (min-width:768px) and (max-width:1024px) and (min-height:1024px) {
  .container{
      max-width:230px;
      text-align:center;
    }
    .subtitle {
        font-size: 16px;
        padding:5px 0;
    }
    .logo{
      width:70px;
    }

    .quote {  
      font-size: 18px;
    }

    .benefits-list li{
      font-size:10px;
      padding:2px 0;
    }

    .curved-arrow{
      width:20px;
      --x-translation: -20px
    }


}

@media (min-width:768px) and (max-width:1024px) and (min-height:1200px) { 

  .curved-arrow{
      width:30px;
      --x-translation: -30px
    }
}

</style>