<script setup>
import {ref, onMounted, watchEffect} from 'vue'
import showdown from 'showdown';


const descriptionObject = defineProps({
    description:{
        type:String,
        default:"Описания пока что нет :(",
    },
    routeName:{
        type:String,
        default:''
    }
})

const converter = new showdown.Converter();

function fillWithHtml(htmlText){
    const descriptionTextBlock = document.querySelector('.description__text');
    descriptionTextBlock.innerHTML = htmlText + descriptionTextBlock.innerHTML;
}

async function fetchDescription(){
    const response = fetch(descriptionObject.description)
        .then(value => value.text())
        .then(text => {
            const htmlText= converter.makeHtml(text);
            fillWithHtml(htmlText)
        })

    return response
}

onMounted(() => {
    fetchDescription();
})



</script>


<template>
    <div class="description">
        <h2 class="description__header">
            Описание
        </h2>
        <div class="description__text">
            <template v-if="routeName==='platforms'">
                <div class="description__extra">
                    <picture class="description__extra-image-wrapper">
                        <source type="img/webp" src="/catalogue/platforms/platforms-description/building-block.webp">
                        <source type="img/png" src="/catalogue/platforms/platforms-description/building-block.png">
                        <img class="description__extra-image" src="/catalogue/platforms/platforms-description/building-block.png"/>
                    </picture>
                    
                    <div class="description__extra-text">
                        <h3 class="description__extra-header">
                            Самостоящая панель
                        </h3>
                        Конструкция данной панели, из которой состоит мусорная площадка "Цветок", позволяет собрать площадку любых конфигураций.
                        <h4 class="description__extra-text-header">
                            Размеры
                        </h4>
                        <ul class="description__extra-list">
                            <li>
                                Высота: 175 см
                            </li>
                            <li>
                                Ширина: 200 см
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
    .description{
        padding:0px 0px 20px;
    }
    
    .description__header{
        padding:20px 0;
        color:var(--second-main-color);
        font-size:var(--h2-font-size);
        font-weight:var(--h2-font-weight);
        text-align: center;
    }
    
    .description__text{
        font-size: 16px;
        line-height: 1.5em;
        padding:5px;
        border-top:1px solid var(--contacts-bg-color);
        border-bottom:1px solid var(--contacts-bg-color);
        border-radius: 10px;
    }

    .description__extra{
        padding:20px 0 0;
        margin-top:20px;
        border-top:1px solid var(--contacts-bg-color);
 
    }

    .description__extra-image-wrapper{
        display: block;
        padding:10px;
        margin:auto;
        width:80%;
        aspect-ratio: 1 / 1;
        box-sizing: border-box;
    }
    .description__extra-text-header{
        margin:0;
        padding:10px 0 0;
    }
    .description__extra-image{
        max-width: 100%;
    }
    .description__extra-text{
        padding:20px 10px;
        margin:0;
    }

    @media (min-width:768px){
        .description__text{
            font-size: 19px;
            padding: 10px 5%;
            border-top:1px solid var(--contacts-bg-color);
            border-bottom:1px solid var(--contacts-bg-color);
            border-radius: 20px;
        }
        .description{
            padding:50px 0 40px;
        }
        .description__extra{
            padding: 0;
            margin-top:40px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom:none;
        }
        .description__extra-header{
            text-align: left;
        }
        .description__extra-image-wrapper{
            padding:0;
            width:35%;
        }
        .description__extra-text{
            width:50%
        }
    }
    @media (min-width:1024px){
        .description__extra{
            padding:40px 0;
        }
    }
    @media (min-width:1440px){
        .description__text{
            font-size: 22px;
        }
    }
    @media (min-width:1920px){
        .description__text{
            margin:auto;
            font-size: 29px;
        }
    }
    @media (min-width:2560px){
        .description__text{
            font-size: 38px;
        }
    }
</style>

<style>

    .description__text strong{
        color:var(--second-main-color)
    }
    .description__text ul{
        padding: 0 0 0 20px;
        /* background-color:green; */
    }
    @media (min-width:1440px){
        .description__text ul{
            padding: 0 0 0 40px;
        }
    }
    .description__text ul ::marker{
        color: var(--second-main-color);
    }

    .description__text img{
        max-width: 100%;
    }

</style>
