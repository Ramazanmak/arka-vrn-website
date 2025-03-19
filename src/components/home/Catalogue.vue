<script setup>
import {ref, reactive} from 'vue'

const catalogueItems = ref([
    {
        id:1,
        name:"Вазоны",
        routeName:"vases",
        src1:"/general/catalogue/vases.webp",
        src2:"/general/catalogue/vases.png"
       
    },
    {
        id:2,
        name:"Парковые диваны и скамейки",
        routeName:"benches",
        src1:"/general/catalogue/benches.webp",
        src2:"/general/catalogue/benches.png"
    },
    {
        id:3,
        name:"Урны",
        routeName:"bins",
        src1:"/general/catalogue/bins.webp",
        src2:"/general/catalogue/bins.png"
    },
    {
        id:4,
        name:"Антипарковочные элементы",
        routeName:"antiparking",
        src1:"/general/catalogue/antiparkings.webp",
        src2:"/general/catalogue/antiparkings.png"
    },
    {
        id:5,
        name:"Мусорные площадки",
        routeName:"platforms",
        src1:"/general/catalogue/platforms.webp",
        src2:"/general/catalogue/platforms.png"
    },
    {
        id:6,
        name:"Бетонные блоки и крышки",
        routeName:"concrete-blocks",
        src1:"/general/catalogue/concrete-blocks.webp",
        src2:"/general/catalogue/concrete-blocks.png"
    }

])
</script>

<template>
    <section class="catalogue" id="catalogue" >
        <h2 class="catalogue__header"> Наша продукция </h2>
        
        <div class="catalogue__body">
            <router-link
                class="catalogue__body-link" 
                v-for="category in catalogueItems" 
                :to="'/categories/'+category.routeName"
                
            >
                <picture class="catalogue__image-block">
                    <h3 class="catalogue__caption">{{ category.name }}</h3>
                    <source type="image/webp" :srcset="category.src1">
                    <img class="catalogue__image" :src="category.src2" :alt="category.name">
                </picture>
                <div class="catalogue__more-wrapper">
                    <img class="catalogue__more-logo" src="/general/catalogue/arrow.png" alt="more">
                    </img>
                </div>
            </router-link>
        </div>
    </section>
</template>

<style scoped>
    .catalogue{
        background-color: var(--main-bg-color);
        padding:70px var(--side-padding) 50px;
        font-family: var(--main-font-family);
    }
    .catalogue__header{
        margin:0;
        padding-bottom:20px;
        font-size:var(--h2-font-size);
        color:var(--second-main-color);
        font-weight:500;
    }
    
    .catalogue__body-link{
        display:block;
        background-color: white;
        text-decoration:none;   
        color:black;
        padding:7px;
        margin-top:20px;
        aspect-ratio:3/2;
        position:relative;
        border-radius:10px;
        max-width: 100%;
    }
    .catalogue__body-link:hover{
        transition:0.4s;
        color:var(--second-main-color);
    }
    
    .catalogue__body-link:hover .catalogue__image{
        filter:blur(1px) brightness(0.5)
    }
    
    .catalogue__body-link:hover .catalogue__more-wrapper{
        opacity: 100%;
    }
    
    
    .catalogue__image-block{
        display:flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        height:100%;
    }
    
    .catalogue__more-wrapper{
        display:flex;
        align-items: center;
        width:14%;
        aspect-ratio: 1/1;
        background-color: var(--second-main-color);
        border-radius:100%;
        position:absolute;
        top:35%;
        left:45%;  
        opacity: 0%;
        
    }
    
    .catalogue__more-logo{
        display:block;
        margin:auto;
        height: 50%;
    }

    .catalogue__image{
        display:block;
        padding-bottom:8px;
        width:100%;
        filter:blur(0) brightness(1);
        transition:0.4s;
    }
    /* Удалить с новой фоткой */
    .catalogue__image:last-of-type{
        aspect-ratio: 600/337;
    }
    
    .catalogue__caption{
        font-size:12px;
        margin:0;
        text-align:center;
        padding:3px 0;
        text-transform: uppercase;
        font-weight:500;
        width:100%;
    }
    
    @media (min-width:450px){
        .catalogue__caption{
            font-size:14px;
        }
    }
    
    @media (min-width:560px){
        .catalogue__body-link{
            padding:15px;
        }
        .catalogue__caption{
            font-size:15px;
        }
    }
    
    @media (min-width:768px){
        .catalogue__body{
            display:flex;
            flex-flow:row wrap;
            justify-content: space-around;
        }
        .catalogue__body-link{
            max-width:45%;
            padding:7px;
        }
        .catalogue__caption{
            font-size:10px;
        }
        .catalogue__header{
            text-align:center;
        }
    }
    
    @media (min-width:1024px){
        .catalogue__body-link{
            padding: 10px;
            max-width: 30%;
        }
        .catalogue__caption{
            font-size:11px;
        }
    }
    
    @media (min-width:1440px){
        .catalogue__caption{
            font-size:16px
        }

        .catalogue__more-wrapper{
            width:12%;
            bottom:10%;
            right:8%;
        }
    }

    @media (min-width:1920px){
        .catalogue__caption{
            font-size:18px;
        }
    }
</style>