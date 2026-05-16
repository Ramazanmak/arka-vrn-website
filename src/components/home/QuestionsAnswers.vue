<script setup>

import { questions } from '../../data/questions';

</script>

<template>
  <section class="question-sector">

    <h2 class="qa-header"> Ответы на вопросы</h2>

    <div class="question-container">
      <div class="qa-item" v-for="item in questions" :key="item.id">
        <label class="question-wrapper"> 
          <input type="checkbox" hidden>
          <span class="question-text"> {{ item.question }}</span>
          <div class="question-button"></div>
        </label>
        <div class="answer-wrapper">
          <div class="answer-inner">
            <p class="answer"> {{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>

<style scoped>

.question-sector {
  padding: 0 var(--side-padding);
  background-color: var(--main-bg-color);
  max-width: 2000px;
  margin: 0 auto 4em;  
}

.question-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
}

.qa-header {
  padding:20px 0;
  margin:0 0 1em;
  color:var(--second-main-color);
  font-size:var(--h2-font-size);
  font-weight:var(--h2-font-weight);
  text-align: center;
}

.qa-item {
  width: 100%;
}

.qa-item:last-of-type {
  justify-self: flex-end;
}

.question-wrapper {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 1px solid var(--global-700);
  margin: 0 0 0.5em;
}

.question-text {
  width: 80%;
  font-weight: 500;
  transition-duration: var(--duration)
}

.qa-item:has(:checked) .question-wrapper {
  border-color: var(--second-main-color);
}
  
.qa-item:has(:checked) .question-text {
  color: var(--second-main-color);
}

.question-button {
  width: 2em;
  aspect-ratio: 1;
  border: none;
  outline: none;
  background-color: var(--second-main-color);
  border-radius: 100%;
  position: relative;
}

.question-button::after, .question-button::before {
  content: "";
  display: block;
  width: 50%;
  height: 0.2em;
  background-color: white;
  position: absolute;
  top: calc(50% - 0.1em);
  left: 25%;
  transition-duration: var(--duration);
}

.question-button::after {
  transform: rotate(90deg);
}

:checked ~ .question-button::after {
  transform: none;
}

.answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease; 
}

.answer-inner {
  overflow: hidden;
  min-height: 0;
}

.answer {
  margin: 0;
  padding: 0 1em;
  border-radius: 0.5em;
  background-color: var(--contacts-bg-color);
  color: var(--global-500);
  transition-duration: var(--duration);
  line-height: 1.5
}

.qa-item:has(:checked) .answer-wrapper{
  grid-template-rows: 1fr;
}
.qa-item:has(:checked) .answer{
  grid-template-rows: 1fr;
  padding: 1em;
}

@media (hover) {
  .question-wrapper:hover {
    border-color: var(--second-main-color);
  }

}

@media (min-width: 1024px) {
  .question-container {
    grid-template-columns: 1fr 1fr;
  }
}

</style>