<script setup>
    import {shallowRef} from 'vue'

    
</script>

<template>

  <section id="about" class="aboutus">
    <div class="about-top">
      <h2 class="about-title">
        Создаём пространства, <span class="highlighted">которыми гордимся</span>
      </h2>
  
      <p class="about-subtitle">
        Более четверти века мы помогаем делать улицы, парки и дворы нашего региона красивее, чище и комфортнее
      </p>
    </div>

    <div class="about-main">

      <div class="about-goal">

        <h3 class="goal-header"> Наша цель </h3>

        <p class="goal-text">
          Создавать качественные изделия для благоустройства, которые помогают поддерживать порядок, чистоту и аккуратный облик территорий нашей Родины.
        </p>

      </div>
      <div class="about-goal">

        <h3 class="goal-header"> Наш опыт </h3>

        <p class="goal-text">
          С нами сотрудничают администрации муниципальных образований, управляющие организации, застройщики, коммерческие компании и подрядчики по благоустройству. Заказчики выбирают АРКА за стабильное качество, соблюдение сроков и возможность подобрать изделия под конкретный объект.
        </p>

      </div>
    

    </div>
  

  </section>

</template>

<style scoped>

.aboutus {
  background-color: var(--main-bg-color);
  padding: 5em var(--side-padding) 5em;
  max-width: 2000px;
  margin: auto;
}

.about-top {
  text-align: center;
  margin-bottom: 2em;
}

.about-title {
  font-size: 1.6em;
  margin: 0 0 1.4rem;
  color: var(--contacts-bg-color);
}

.about-subtitle {
  font-size: 1em;
  color: var(--contacts-bg-color);
  max-width: 600px;
  margin: 0 auto 4em;
}

.about-main {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
}

.about-goal{
  gap: 1em;
  margin: 0 auto;
  max-width: 700px;
}

.goal-header {
  font-size: 1.4em;
  border-inline-start: 5px solid var(--second-main-color);
  padding-left: 10px;
  margin: 0 0 1rem;
}

.goal-text {
  padding: 1em 0;
  margin: 0 0 1em;
  border-top: 1px solid var(--second-main-color);
  line-height: 1.5;
  font-size: 1.1em
  /* border-radius: 20px; */
}

@media (min-width: 1024px) {
  .about-subtitle {
    max-width: 800px;
  }

  .about-main {
    flex-direction: row-reverse;
    justify-content: space-evenly;
    gap: 2em
  }

  .about-goal {
    width: 40%;
  }
}


</style>