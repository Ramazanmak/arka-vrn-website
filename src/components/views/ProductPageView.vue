<script setup>
  import ComHeader from '../common/ComHeader/ComHeader.vue';
  import {reactive, ref, computed, watchEffect, onMounted, watch} from 'vue'
  import {useRoute, useRouter} from 'vue-router';
  import { catalogue } from '../../data/catalogue';
  import { namesOfProps, allChoosableProps, unitsOfProps} from '../../data/vocabulary'
  import ComFooter from '../common/ComFooter.vue';
  import tippy from 'tippy.js';
  import { getProductSeo } from '../../seo';
  import { useHead } from '@unhead/vue';

  
  const route = useRoute();
  const router = useRouter();

  const data = ref(catalogue.find(el => el.id === route.params.slug));

  // SEO optimization

  useHead(() => {
    if (!data.value) {
      return {
        title: 'Товар не найден | АРКА',
        meta: [
          {
            name: 'robots',
            content: 'noindex',
          },
        ],
      }
    }

    const seo = getProductSeo(data.value)

    return {
      title: seo.title,
      meta: [
        {
          name: 'description',
          content: seo.description,
        },
        {
          property: 'og:title',
          content: seo.title,
        },
        {
          property: 'og:description',
          content: seo.description,
        },
        {
          property: 'og:url',
          content: seo.canonical,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: seo.canonical,
        },
      ],
    }
  })


  function popRouter() {
    router.back();
  }


  onMounted(()=>{
    tippy('[data-tippy-content]',{
      theme:'arka',
      placement:'top-end',
      zIndex:3,
      maxWidth:'200px',
    })
  })

  // Initiating useful objects of the state
  
  const chosenPropsValues = ref({
    types: "",
    materials: "",
    woods: "",
    sizeVariants: ""
  });

  const isColorAllowed = ref(false);
  const chosenColors = ref("");
  const uncolouredConfId = ref("");

  // Setting initial state


  onMounted(() =>{
    //initial states of parameters
    
    Object.keys(chosenPropsValues.value).forEach((el) =>{
      const choosable = data.value.choosable;
      if (Object.keys(choosable).includes(el)){
          chosenPropsValues.value[el] = Object.keys(choosable[el])[0];
      } else {
          chosenPropsValues.value[el] = "";
      }
    })

    //calculating accessibility to color

    const firstCondition = data.value.colorable;
    const secondCondition = (chosenPropsValues.value["materials"] !== 'granite');
    const thirdCondition = (chosenPropsValues.value["materials"] !== 'marble');
    isColorAllowed.value = firstCondition && secondCondition && thirdCondition

    if (isColorAllowed.value && Object.keys(data.value.colors).length > 0){
      chosenColors.value = Object.keys(data.value.colors)[0]
    }

  })


  // state of configuration id
  
  watchEffect(() => {
    let base = ref("");
    base.value = data.value.id;
    
    for (let prop in chosenPropsValues.value) {
      if (chosenPropsValues.value[prop] != '' && chosenPropsValues.value[prop] != undefined){
        base.value = base.value + '-' + chosenPropsValues.value[prop];
      }
    }

    if (isColorAllowed.value && chosenColors.value == ""){
      chosenColors.value = Object.keys(data.value.colors)[0]
    }

    const firstCondition = data.value.colorable;
    const secondCondition = (chosenPropsValues.value["materials"] !== 'granite');
    const thirdCondition = (chosenPropsValues.value["materials"] !== 'marble');
    isColorAllowed.value = firstCondition && secondCondition && thirdCondition;

    uncolouredConfId.value = base.value
  })

  watch(isColorAllowed, () => {
    if (isColorAllowed.value && Object.keys(data.value.colors).length > 0 && chosenColors.value == ""){
      chosenColors.value = Object.keys(data.value.colors)[0]
    }
    
  })

  const colouredConfId = computed(() => {
    let res;
    if (chosenColors.value != "" && isColorAllowed.value) {
      res = uncolouredConfId.value + '-' + chosenColors.value;
    } else {
      res = uncolouredConfId.value;
    }
    // console.log("From colouredConfID");
    return res;

  })

  const imageSource = ref("");
  
  function changeImageSource(newId, isFromGallary = false) {
    let res = data.value.folderPath;

    if (isFromGallary) {
      res += newId;
    } else {
      if (Object.keys(data.value.photos).includes(newId)) {
        res += newId;
      } else {
        res += Object.keys(data.value.photos)[0];
      }
    }
    imageSource.value = res;
    // console.log(imageSource.value)
  }

  function changeImageSourceFromGallary(newId) {
    
    changeImageSource(newId, true);

    
    if (Object.keys(data.value.photos).includes(newId) && Object.keys(data.value.cost).includes(newId)){
      Object.keys(chosenPropsValues.value).forEach((prop) => {
        chosenPropsValues.value[prop] = data.value.photos[newId][prop];
      })
      chosenColors.value = data.value.photos[newId].colors;
    }
    // console.log(newId)
  }


  watchEffect(() => {
    // console.log(colouredConfId.value);
    changeImageSource(colouredConfId.value);
  })



</script>

<template>
  <ComHeader></ComHeader>
  <div class="wrapper">
    <div class="top-layer">
      <button class="back-button" @click="popRouter()">
        <img class="back-arrow" style="color:white; fill:white" src="/general/catalogue/long-arrow.svg" alt="more">
        </img> 
      </button>
    </div>
    <div class="meta-info">
      <h2 class="name"> {{ data.name }}</h2>
      <h3 class="subcategory"> Категория: <span class="highlighted">{{ data.subcategoryName }}</span></h3>
    </div>

    <div class="main-info">

      <!-- Block of images-->
      <div class="image-block">
        <picture class="image-wrapper">
          <source type="image/webp" :srcset="imageSource + '.webp'">
          <img class="image" loading="lazy" :src="imageSource  + '.png'" >
        </picture>
        <div class="photo-gallery">
          <picture class="gallery-photo-wrapper" 
            :class="{'gallery-photo-wrapper_chosen': colouredConfId == photo}" v-for="photo of Object.keys(data.photos)"
            @click="() => changeImageSourceFromGallary(photo)">

            <source type="image/webp" :srcset="data.folderPath + photo + '.webp'">
            <img class="gallery-photo"  loading="lazy" :src="data.folderPath + photo + '.png'" >
          </picture>
        </div>
      </div>

      <!-- Block of parameters-->
      <transition>
        
        <div class="parameters">
          <!-- Sizes-->
          <section class="parameter-section">
            <h2 class="parameter-name">Габариты</h2>
            <div class="parameter-values-list">
              <span v-for="(sizeValue, sizeName) of data.sizes[uncolouredConfId] || data.sizes['default']"> {{namesOfProps[sizeName]}}: {{sizeValue + ' ' + unitsOfProps[sizeName] + ';' }} </span>
            </div>
          </section>
          <!-- Choosable parameters-->
          <template v-for="(parValue, parName) of data.choosable">
            <section class="parameter-section"  v-if="Object.keys(data.choosable[parName]).length > 0">
  
              <h2 class="parameter-name"> {{ namesOfProps[parName] }}</h2>
              <ul
                class="parameter-values-list"
                v-if="Object.keys(parValue).length > 0"
                >
                <li
                  class="parameter-value"
                  v-for="(optionTranslation, optionName) in parValue"
                  >
                  <label class="parameter-value-label">
                    <input type="radio" :value="optionName" v-model="chosenPropsValues[parName]" class="parameter-radio" hidden>
                    <span> {{ optionTranslation}} </span>
                  </label>
                </li>
              </ul>
            </section>
          </template>
  
          <transition>
            <section class="parameter-section" :class="{'parameter-section_hidden' : !isColorAllowed}" v-if="isColorAllowed">
              <h2 class="parameter-name"> Цвет</h2>
              <ul class="parameter-values-list">
                <li
                  class="parameter-value"
                  v-for="(optionTranslation, optionName) in data.colors"
                  >
                  <label class="parameter-value-label">
                    <input  
                      type="radio" 
                      :value="optionName"
                      v-model="chosenColors"
                      class="parameter-radio"
                      @click.stop
                      hidden
                    >
                    <span> {{ optionTranslation}} </span>
                  </label>
                </li>
              </ul>
            </section>
          </transition>
  
  
          <div class="buy-part">
            <span class="cost"> {{ data.cost[colouredConfId] }} ₽</span>
            <div>
              <button class="to-basket" data-tippy-content="Корзина пока не работает, но скоро будет!"> Добавить в корзину </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="extra-info">

    </div>
  </div>

  <ComFooter></ComFooter>
</template>

<style>

/* мы объясним, что делают эти классы дальше! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.wrapper {
  padding: var(--headerHeight) var(--side-padding) 0;
  margin: 0 0 4em
}


.back-button{
  position: fixed;
  border-radius: 100%;
  border: none;
  width: var(--headerHeight);
  aspect-ratio: 1;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: transparent;

  .back-arrow {
    display: block;
    margin: auto;
    height: 50%;
    transform: rotate(90deg)
  }
}

.meta-info{
  padding-top: 0.5em;
  
  .name {
    font-size: 1.5em;
    margin: 0 0 0.5em;
  }
  .subcategory {
    font-size: 1em;
    color: var(--global-700);
    margin: 0 0 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--global-700);
  }
}

.image-block {
  width: 100%;
  margin: 0 0 1em;
}

.image-wrapper {
  width: 100%;
  display: block;
  
  border-radius: 1em;
  .image {
    border-radius: 0.9em;
    display: block;
    max-width: 80%;
    max-height: 300px;
    aspect-ratio: initial;
    margin: 0;
  }

}

.photo-gallery {
  width: 100%;
  padding: 0.5em 0;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  overflow-x: auto;

  .gallery-photo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 3em;
    width: 4em;
    aspect-ratio: 1;
    border-radius: 1em;
    transition-duration: var(--duration);
    opacity: 0.5;
    border: 1px solid transparent;
  }
  .gallery-photo-wrapper_chosen{
    border: 1px solid var(--second-main-color);
    opacity: 1;
  }
  
  .gallery-photo {
    max-width: 90%;
    max-height: 70px;
    padding:0.2em;
  }
}

.parameters {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1em;
  border-radius: 1em;
  background-color: var(--global-500);
  border: 2px solid var(--global-600);
  transition-duration: var(--duration);
  
  .parameter-section {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1em;
    margin: 0 0 2em;
    transition-duration: var(--duration);
    top: 0%;
  }


  .parameter-name {
    font-size: 0.9em;
    width: 30%;
    color: var(--contacts-bg-color);
    text-align: left;
    margin: 0;
  }

  .parameter-values-list {
    width: 50%;
    display: flex;
    flex-flow: row wrap;
    gap: 0.5em;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.8em;

    .parameter-radio {
      margin: 3px 0 0;
    }

    .parameter-value-label{
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 5px;
      border-radius: 0.5em;
      border: 1px solid var(--global-700);
      background-color: white;
      gap: 0.8em;
      transition-duration: var(--duration)
    }

    .parameter-value-label:has(:checked) {
      background-color: var(--second-main-color);
      color: white;
    }

    .parameter-radio {
      accent-color: var(--second-main-color)
    }
  }
}

.buy-part {
  padding-top: 1em;
  border-top: 1px solid var(--global-700);
  margin-top: auto; 

  .cost {
    display:block;
    margin: 0 0 1rem;
    font-size: 1.7em;
    font-weight: 800;
  }

  .to-basket {
    display:block;
    width: 100%;
    margin: 0 0 1em;
    border:2px solid var(--second-main-color);
    background-color: var(--second-main-color);
    padding:0.5em 1.5em;
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
}


@media (min-width: 768px){
  .meta-info{
    padding: 5vh 8vw;
  }
  .main-info{
    display: flex;
    padding: 0 8vw;
    flex-direction: row;
    justify-content: space-between;
    gap: 1em;
    
    .parameters {
      width: 50%;
      .parameter-name {
        font-size: 0.9em;
        width: 35%;
      } 
      
      .parameter-values-list {
        font-size: 0.9em;
        width: 55%;

        .parameter-value-label {
          padding: 10px;
        }
      }
    }

    .image-block {
      width: 50%;
      margin-bottom: 0;

      .image-wrapper {
        width: 100%;
        .image {
          display: block;
          max-width: 100%;
        }
      }
    }
  }
  .back-button {
    top: 13vh;
    left: 4vh;
    width: 3em;
    background-color: var(--contacts-bg-color);
  }
}


</style>