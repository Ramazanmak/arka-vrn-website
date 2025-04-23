<script setup>
import CardRegular from './CardRegular.vue';
import CardExtended from './CardExtended.vue';
import CategoryDescription from './CategoryDescription.vue';
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';

import {ref, computed, onBeforeUnmount, onMounted} from 'vue'

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
    toggleBodyScroll()
}

function antichoose(){
    chosenItem.value=undefined;
    chosenSubcategoryName.value="";
    isExtendedCardHidden.value = true;
    toggleBodyScroll()
}

function toggleBodyScroll(){
    const body = document.querySelector('body');
    if (!isExtendedCardHidden.value){
        body.style.overflow = 'hidden'
    } else {
        body.style.overflow = 'auto'
    }

}

onBeforeUnmount(()=>{
    const body = document.querySelector('body');
    body.style.overflow = 'auto'
})

onMounted(()=>{
    tippy('#extended-card-basket-btn',{
        theme:'arka',
        content:"Корзина пока не работает, но скоро будет!",
        placement:'bottom-end',
        zIndex:1,
        maxWidth:'200px',
    })
})

</script>

<template>
    <section class="category-wrapper" @keydown.escape="antichoose">
        <CategoryDescription 
            :description="props.categoryObject.description"
            :routeName="categoryObject.routeName"/>

        <h2 v-if="props.categoryObject.empty"> 
            {{ props.categoryObject.description }}
        </h2>
    
        <div v-else class="content-wrapper">
            <div id="category" class="category">
                <div 
                    v-for="subcategory in subcategories" 
                    class="subcategory"
                >
                    <h3  
                        class="subcategory-name"
                    >
                     {{ subcategory.name }}
                    </h3>

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
                        <div 
                            class="subcategory__extended-inner-wrapper"
                            @click.stop>
                            <CardExtended
                                :itemProps="chosenItem"
                                :subcategory="chosenSubcategoryName"
                                
                            />
                        </div>
                        <picture 
                            class="subcategory__extended-card-close"
                            @click.prevent = "antichoose">
                            <source type="img/svg" src="/general/close_btn.svg">
                            <source type="img/png" src="/general/close_btn.png">
                            <img 
                                class="subcategory__extended-card-close-image" 
                                src="/general/close_btn.png" 
                                alt="Закрыть">
                        </picture>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>

    /* GENERAL */

    .category-wrapper{
        background-color: var(--main-bg-color);
        width:100%;
        font-family: var(--main-font-family);
        padding:50px var(--side-padding) 100px;
        box-sizing: border-box;
    }

    .subcategory-name{
        padding:20px 0;
        margin:0;
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
        margin:60px auto;
        border-radius:10px;
        padding:10px;
        max-width: 450px;
        background-color: var(--main-bg-color);
        transition:0.2s;
        border-top:2px solid var(--second-main-color);
        border-bottom:2px solid var(--second-main-color);
        box-shadow: 0 0 5px -2px var(--contacts-bg-color);      
        box-sizing: border-box;
        transition:0.4s;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        left:0;
        top:0;
        z-index:2;
        box-sizing: border-box;
        padding:0 10px;
        background-color: rgba(0,0,0,0.7);
        width: 100%;
        height:100vh;
        backdrop-filter: blur(5px) brightness(90%);
        transition-duration:0.4s;
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
    .subcategory__extended-card{
        background-color: var(--main-bg-color);
        position:relative;
        max-height:85vh;
        padding:30px 10px;
        border-radius:10px;
        max-width: 450px;
        border-top:2px solid var(--second-main-color);
        border-bottom:2px solid var(--second-main-color);
        box-shadow: 0 0 5px -2px var(--contacts-bg-color);      
        box-sizing: border-box;
        transition:0.4s;
    }
    
    .subcategory__extended-inner-wrapper{
        height:100%;
        overflow-y: scroll;
        scrollbar-width: none;
        background-color: var(--main-bg-color);
    }
    
    .subcategory__extended-card-close{
        position:absolute;
        padding:5px;
        border-radius: 5px;
        right:10px;
        top:10px;
        background-color: var(--main-bg-color);
    }
    .subcategory__extended-card-close-image{
        width:20px;
    }
    /* RESPONSIVENESS */

    @media (min-height:860px){
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
        .subcategory-item-extended{
            padding:30px;
        }
        .subcategory__extended-card{
            padding:20px 20px;
        }
    }

    @media (min-width:768px){
        .subcategory-item{
            height:400px;
        }

        .subcategory__extended-card-close{
            right:20px;
            top:20px;
        }
        .subcategory__extended-card-close-image{
            width:25px;
        }
    }

    @media (min-width:1024px){
        .subcategory-item{
            width:25%;
            margin:15px;
        }
        .subcategory-item-extended{
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            width:100%;
            max-width: none;
            
        }
        .subcategory__extended-card-wrapper{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
        .subcategory__extended-card{
            width:85%;
            max-width: none;
            max-height: none;
            height:500px;
        }

        .subcategory__extended-inner-wrapper{
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            align-items: center;
            width:100%;
            max-width: none;
            overflow-y: hidden;
        }

        .subcategory__extended-card-close{
            right:15px;
            top:15px;
        }
        
        .subcategory__extended-card-close-image{
            width:28px;
        }
    }
    @media (min-width:1440px){
        
        .subcategory-item{
            width:28%;
            max-width: 300px;
            height:450px
        }

        .subcategory__extended-card{
            width:75%;
            height:600px;
        }

        .subcategory__extended-card-close{
            right:20px;
            top:20px;
        }
        
        .subcategory__extended-card-close-image{
            width:33px;
        }

    }

    @media (min-width:1600px){
        .subcategory-item{
            width:28%;
            max-width: 400px;
            height:550px;
            margin:20px;
        }
        
    }

    @media (min-width:1920px){
        .subcategory-item{
            height:600px;
            max-width:400px;
            margin:25px;
        }
        .subcategory__extended-card{
            width:70%;
            height:700px;
        }
    }

    @media (min-width: 2560px){
        .subcategory-item{
            height:600px;
            max-width:450px;
            margin:30px
        }
        .subcategory__extended-card{
            width:65%;
            height:800px;
        }
    }
</style>