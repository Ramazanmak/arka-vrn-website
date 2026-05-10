<script setup>



</script>

<template>
  <section class="hero">
    <div class="hero__body">
      

      <div class="hero__title-subsection">
        <div class="hero__history"> 
          <div class="hero__history-point"></div>
          <span class="hero__history-text"> Производим качественные МАФ-ы с 1998 года </span>
        </div>
        
        <h1 class="hero__title">
          Малые архитектурные формы c доставкой и установкой
        </h1>
        
        <p class="hero__subtitle">
          Производим <strong class="highlighted">вазоны, лавки, урны, антипарковочные элементы, контейнерные площадки </strong>. В нашем богатом ассортименте также представлены <strong class="highlighted"> кашпо, парковые диваны и заборные блоки</strong> в различных стилях.
        </p>

        
  
      </div>
  
      <div class="hero__link-subsection">
        <p class="hero__subtitle hero__subtitle_bordered">
          Приятные цены, гарантия качества и высокая клиентоориентированность - это то, что отличает нашу компанию.
        </p>
        <div class="hero__catalogue-link-wrapper">
          <a class="hero__catalogue-link" href="#catalogue">
            Смотреть каталог 
          </a>
          <a class="hero__catalogue-download"
          target="_blank"
          href="https://arka-vrn.ru/catalogue-brochure.pdf"
          download="catalogue-brochure.pdf">
            <svg class="hero__download-symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" aria-hidden="true" viewBox="0 0 16 16">
    
              <path fill="currentColor" d="M2.5 8v1.9c0 1.011.002 1.664.049 2.158.045.471.12.64.172.726a1.5 1.5 0 0 0 .495.495c.085.053.255.127.726.172.494.047 1.147.049 2.158.049h3.8c1.011 0 1.664-.002 2.158-.049.471-.045.64-.12.726-.172a1.5 1.5 0 0 0 .495-.495c.053-.085.127-.255.172-.726.047-.494.049-1.147.049-2.158V8H15v1.9c0 1.964 0 2.946-.442 3.667a3 3 0 0 1-.99.99C12.845 15 11.863 15 9.9 15H6.1c-1.964 0-2.946 0-3.667-.442a3 3 0 0 1-.99-.99C1 12.845 1 11.863 1 9.9V8zm6.25.19 2.22-2.22 1.06 1.06L8 11.06 3.97 7.03l1.06-1.06 2.22 2.22V1h1.5z"></path>
    
            </svg>
          </a>
        </div>
        <a class="hero-link"
          href="#advantages">
          Преимущества
        </a>
      </div>
    </div>

  </section>


</template>

<style>
.hero {
  padding: calc(var(--headerHeight) + 5vh) var(--side-padding) 0;
  margin: 0 auto 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero__history {
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1em;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2em;
  padding: 0.5em 1em;
  border: 2px solid var(--second-main-color);
  border-radius: 1em;
  background-color: var(--global-500);
  color: var(--contacts-bg-color);
}

.hero__history-point{
  content:'';
  display: block;
  width: 0.8em;
  aspect-ratio: 1;
  border-radius: 100%;
  font-size: 1.2em;
  background-color: var(--second-main-color);
}


.hero__body{
  max-width: 600px;
  margin: auto;
}


.hero__title{
  margin:0 0 2rem;
  color:var(--contacts-bg-color);
  font-size: clamp(1.4em, 2em, 3em);
}

.hero__subtitle{
  color: var(--global-700);
  font-size: clamp(1em, 1.2em, 1.4em);
  margin: 0 0 1.5em;
  line-height: 1.5;
}

.hero__subtitle_bordered{
  padding: 0.5em;
  border-radius: 0.5em;
  font-size: clamp(0.8em, 1em, 1.2em);
  font-weight:500;
  border: 2px solid var(--second-main-color);
  color: var(--contacts-bg-color)
  /* color: var(--global-500);
  background-color: var(--global-700); */
}

.hero__link-subsection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.hero__catalogue-link-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1em;
  border: 1px solid var(--second-main-color);
}


.hero__catalogue-link {
  display:block;
  background-color: var(--second-main-color);
  padding: 0.5em;
  width:80%;
  border-radius: 0.8em;
  font-family:var(--main-font-family);
  font-size:1em;
  font-weight:500;
  text-decoration:none;
  text-align: center;
  color:white;
  transition:0.4s;
  cursor:pointer;
}

.hero__catalogue-download {
  flex-grow: 1;
}
.hero__download-symbol {
  display: block;
  width: 1.4em;
  margin: auto;
  color: var(--global-700);
  transition: var(--duration);
  border-radius: 1em;
}

.hero-link {
  display:block;
  background-color: var(--second-main-color);
  padding: 0.5em; 
  width: 100%;
  border-radius: 1em;
  font-family:var(--main-font-family);
  font-size:1em;
  font-weight:500;
  text-decoration:none;
  text-align: center;
  color:white;
  transition:0.4s;
  cursor:pointer;
}

@media (hover){
  .hero__catalogue-link:hover, .hero-link:hover {
    background-color: var(--second-main-color-pale);
  } 
  .hero__catalogue-download:hover {
    .hero__download-symbol {
      color: var(--second-main-color);
    }
  }
}
@media (hover: none){
  .hero__catalogue-link:active, .hero-link:active {
    background-color: var(--second-main-color-pale);
  } 
  .hero__catalogue-download:active {
    .hero__download-symbol {
      color: var(--second-main-color);
    }
  }
}

@media (min-aspect-ratio: 1) {
  .hero {
    min-height: 100vh;
  }
}

@media (min-width: 768px) {
  .hero__title{
    font-size: clamp(1.6em, 2.5em, 3.2em);
  }

  .hero__subtitle{
    font-size: clamp(1.2em, 1.4em, 1.6em);
  }
  .hero__subtitle_bordered{
    font-size: clamp(1em, 1.1em, 1.6em);
  }
}

@media (min-width: 1024px) {
  .hero__body {
    max-width: none;
    display: flex;
    justify-content: center;
    gap: 2em;
  }

  .hero__history{
    margin-left: 0;
  }

  .hero__title-subsection {
    width: 60%;
    
    .hero__title {
      font-size: clamp(1.8em, 2.5em, 3.3em);
    }
  }

  .hero__link-subsection {
    align-self: center;
    width: 30%;
  }
}
</style>