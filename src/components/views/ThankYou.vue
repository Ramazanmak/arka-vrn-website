<script setup>
  import ComHeader from '../common/ComHeader/ComHeader.vue';
</script>

<template>
  <ComHeader style="background-color: black;"/> 
   
  <div class="content-wrapper">
      <section class="anchor-wrapper">
        <p class="message"> Спасибо за прохождение квиза!</p>
        <a class="download-anchor" 
          href="../../../dist/general/Checklist_MAF_hidden_risks.pdf"
          download="Checklist_MAF_hidden_risks.pdf">
          Скачать чек лист
        </a>
        <router-link class="download-anchor" to="/">
          На главную
        </router-link>
      </section>
  </div>
</template>

<style scoped>

.content-wrapper { 
  font-family:var(--main-font-family);
  --font-size:16px;
  background-color: var(--main-bg-color);
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.anchor-wrapper {
  margin: auto;
  text-align: center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:10px;
}
.message {
  margin:0;
  padding: 20px 0;
  font-size: calc(var(--font-size) + 6px)

}

.download-anchor {
  font-size: var(--font-size);
  display: block;
  background-color:var(--second-main-color);
  padding:10px;
  width:150px;
  border-radius: 10px;
  font-family:var(--main-font-family);
  font-weight:500;
  text-decoration:none;
  color:white;
  transition:0.4s;
  cursor:pointer;
  margin: auto;
}


@media (min-width: 768px){
  .content-wrapper{
    --font-size:22px;
  }
  .download-anchor {
    width: 250px;
  }
}
</style>