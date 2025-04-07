<script setup>
import CardRegular from './CardRegular.vue';
import CardExtended from './CardExtended.vue';
import CategoryDescription from './CategoryDescription.vue';

import {ref, computed} from 'vue'

const props = defineProps({
    categoryObject:{
        type:Object,
        default(){
            return{
                description:"Данная страница находится в разработке! :)",
                empty:true,
            }
        }
    }
})

const chosenItem = ref();
const chosenSubcategoryName = ref("")
const isExtendedCardHidden = ref(false)

const subcategories = props.categoryObject.subcategories;
const extendedCardWrapperClasses = computed(() => {
    return {
        'subcategory__extended-card-wrapper_hidden':isExtendedCardHidden.value,
        'subcategory__extended-card-wrapper_visible':!isExtendedCardHidden.value
    }       
})

function chooseItem(item, subcategoryName){
    chosenItem.value = item;
    chosenSubcategoryName.value = subcategoryName;
    isExtendedCardHidden.value = false;
}

function antichoose(){
    chosenItem.value=undefined;
    chosenSubcategoryName.value="";
    isExtendedCardHidden.value = true;
}

// На будущее для отмены скролла фона

// function handleBodyScroll(event){
//     console.log(event)
//     event.preventDefault()
// }

// function toggleBodyScroll(){
//     const body = document.querySelector('body');
//     if (!isExtendedCardHidden.value){
//         body[0].addEventListener('scroll', (event) => {
//             event.preventDefault();
//         })
//     } else {
//         body[0].removeEventListener('scroll',(event) => {
//             event.preventDefault();
//         });
//     }

// }

</script>

<template>
    <section class="category-wrapper" @keydown.escape="antichoose">
        <h2 v-if="props.categoryObject.empty"> 
            {{ props.categoryObject.description }}
        </h2>
    
        <div v-else class="content-wrapper">
            <div class="category">
                <div 
                    v-for="subcategory in subcategories" 
                    class="subcategory"
                >
                    <h2  
                        class="subcategory-name"
                    >
                     {{ subcategory.name }}
                    </h2>

                    <!-- Если требуются короткие карточки -->
                    <div 
                        class="subcategory__list-regular" 
                        v-if="subcategory.cardType === 'short'"
                    >
                        
                        <article
                            class="subcategory-item"
                            v-for="item in subcategory.items"
                            @click="chooseItem(item, subcategory.name)"

                            >
                            <CardRegular 
                                :itemProps="item" 
                                :subcategory="subcategory.name"
                            />
                        </article>

                        
                    </div>
                    <!-- Если требуются длинные карточки сразу -->
                    <div 
                        class="subcategory__list-extended"
                        v-else-if="subcategory.cardType === 'extended'"
                    >
                        <article
                            class="subcategory-item-extended"
                            v-for="item in subcategory.items"
                        >
                            <CardExtended 
                                :itemProps="item" 
                                :subcategory="subcategory.name"/>
                        </article>
                    </div>
                </div>

                <div :class="[
                        'subcategory__extended-card-wrapper',
                        extendedCardWrapperClasses
                        ]"
                    v-if="chosenSubcategoryName !== ''"
                    @click="antichoose"
                    @scroll.stop
                    >
                    <div class="subcategory__extended-card">
                        <CardExtended
                            :itemProps="chosenItem"
                            :subcategory="chosenSubcategoryName"
                            @click.stop
                        />
                    </div>
                </div>
            </div>

            <CategoryDescription :description="props.categoryObject.description[0]"/>
        </div>
    </section>
</template>

<style scoped>

    /* GENERAL */

    .category-wrapper{
        background-color: var(--main-bg-color);
        width:100%;
        font-family: var(--main-font-family);
        padding:70px var(--side-padding) 50px;
        box-sizing: border-box;
    }

    .subcategory-name{
        padding:20px 0;
        color:var(--second-main-color);
        font-size:var(--h2-font-size);
        font-weight:var(--h2-font-weight);
        text-align: center;
    }
    
    .subcategory-item{
        border-radius:10px;
        padding:10px;
        margin:25px auto;
        transition:0.2s;
        height:400px;
        max-width: 300px;
        border-top:2px solid var(--second-main-color);
        border-bottom:2px solid var(--second-main-color);
        box-shadow: 0 0 5px -2px var(--contacts-bg-color);  
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .subcategory-item-extended{
        margin:60px auto 120px;
    }
    .subcategory-item:hover{
        box-shadow: 0 0 20px 1px var(--contacts-bg-color);
        border-top:2px solid var(--contacts-bg-color);
        border-bottom:2px solid var(--contacts-bg-color);
    }
    .subcategory-item:hover  h3{
        color:var(--second-main-color);

    }
    .subcategory-item:hover > img{
        transform:scale(1.3);
    }

    .subcategory__extended-card-wrapper{
        position: fixed;
        left:0;
        top:0;
        z-index:2;
        margin:auto;
        box-sizing: border-box;
        padding: 20px var(--side-padding);
        background-color: rgba(0,0,0,0.7);
        width: 100%;
        height:100vh;
        backdrop-filter: blur(5px) brightness(90%);
        transition-duration:0.4s;
        overflow-y: scroll;
    }
    .subcategory__extended-card-wrapper::-webkit-scrollbar{
        width:0;
    }
    
    .subcategory__extended-card-wrapper_hidden{
        visibility:hidden;
    }
    .subcategory__extended-card-wrapper_visible{
        visibility: visible;
    }
    
    /* RESPONSIVENESS */

    @media (min-height:800px){
        .subcategory__extended-card-wrapper{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
    }


    @media (min-width:560px){
        .subcategory__list-regular{
            display: flex;
            flex-flow: row wrap;
            justify-content: center;

        }
        .subcategory-item{
            width:40%;
            margin:10px;
            height:360px;
        }

    }

    @media (min-width:768px){
        .subcategory-item{
            height:400px;
        }
    }

    @media (min-width:1024px){
        .subcategory-item{
            width:25%;
            margin:15px;
        }
        .subcategory__extended-card-wrapper{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    @media (min-width:1440px){
        
        .subcategory-item{
            width:28%;
            max-width: 300px;
            height:450px
        }

    }

    @media (min-width:1600px){
        .subcategory-item{
            width:28%;
            max-width: 400px;
            height:550px
        }
    }

    @media (min-width:1920px){
        .subcategory-item{
            height:600px;
            max-width:400px;
        }
    }

    @media (min-width: 2560px){
        .subcategory-item{
            height:600px;
            max-width:450px;
        }
    }
</style>