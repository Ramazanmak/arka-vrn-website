<script setup>
import { ref } from 'vue';

const advantages = ref([
    {
        id:1,
        name:"Низкие цены",
        text:"У нас нет лишних наценок, потому что мы производители. Гарантируем лучшие цены в сочетании с отличным качеством",
        src:"../../src/assets/imgs/general/advantages/cost.png"
    },
    {
        id:2,
        name:"Высокое качество",
        text:"Мы изготавливаем нашу продукцию только из высококачественного сырья, строго соблюдая все стандарты производства бетонных изделий",
        src:"../../src/assets/imgs/general/advantages/quality.png"
    },
    {
        id:3,
        name:"Многолетний опыт",
        text:"Уже более 25 лет мы производим железобетонные изделия высокого качества, проверенные временем",
        src:"../../src/assets/imgs/general/advantages/experience.png"
    },
    {
        id:4,
        name:"Высококлассное оборудование",
        text:"Производство продукции осуществляется на высокотехнологичном оборудовании",
        src:"../../src/assets/imgs/general/advantages/equipment.png"
    },
    {
        id:5,
        name:"Погрузка",
        text:"Мы осуществляем БЕСПЛАТНУЮ погрузку изделий на транспортное средство",
        src:"../../src/assets/imgs/general/advantages/loading.png"
    },
    {
        id:6,
        name:"Доставка",
        text:"Мы будем рады помочь Вам с транспортировкой наших изделий до места установки",
        src:"../../src/assets/imgs/general/advantages/delivery.png"
    },
    {
        id:7,
        name:"Широкий ассортимент",
        text:"Вы сможете подобрать подходящий и интересный именно Вам вариант, исходя из предпочтений стиля, дизайна и цены",
        src:"../../src/assets/imgs/general/advantages/range.png"
    }
])
</script>

<template>
    <section class="advantages" id="advantages">
        <h2 class="advantages__header"> Наши преимущества </h2>
        <p class="advantages__description">Мы работаем на качество и долговечность наших изделий</p>

        <div class="advantages__body">
            <div class="advantages__item-wrapper" v-for="adv in advantages" :key="adv.id">
                <img class="advantages__item-image" :src="adv.src" :alt="adv.name">
                <div class="advantages__item-description">
                    <h3 class="advantages__item-header"> <span>{{ adv.name }} </span></h3>
                    <p class="advantages__item-text"> {{ adv.text }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .advantages{
        background-color: var(--main-bg-color);
        padding:50px var(--side-padding) 50px;
        font-family: var(--main-font-family);
        --h3-adv-font-size:calc((var(--h2-font-size)) - 7px)
    }

    .advantages__header{

        margin:0;
        padding-bottom:15px;
        font-size:var(--h2-font-size);
        color:var(--second-main-color);
        text-align:center;
    }

    .advantages__description{
        text-align:center;
        font-size:16px;
        font-weight:300;
        line-height: 1.5;
        padding-bottom:10px;
    }

    .advantages__body{
        background-image: url("../../assets/imgs/general/advantages/loading.png");
        display:flex;
        width:100%;
        flex-flow:row wrap;
        justify-content: space-around;
    }

    .advantages__item-wrapper{
        padding:10px 5px;
        text-align: center;
        width:90%;
        /* border:1px solid black;  */
    }

    .advantages__item-image{
        padding:15px 0;
        display:block;
        margin:0 auto;
        width:40%;
        aspect-ratio: 1 / 1;
    }

    .advantages__item-description{
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        /* border:1px solid red; */
    }
    .advantages__item-header{
        margin:0;
        font-size:20px;
        font-weight:400;
        height:2.5em;
    }

    .advantages__item-text{
        font-size:12px;
        font-weight:300;
        padding:0 8% 30px;
    }

    @media (min-width:480px){
        .advantages__item-wrapper{
            width:40%;
        }
        .advantages__item-header{
            padding-bottom:15px;
        }
    }

    @media (min-width:1024px){
        .advantages__body{
            justify-content:center;
        }
        .advantages__item-wrapper{
            width:23%;
        }
    }

    @media (min-width:1440px){
        .advantages__description{
            font-size:18px;
        }

        .advantages__item-header{
            font-size:21px;
        }
        .advantages__item-text{
            font-size:14px;
        }
    }

    @media (min-width:1920px){
        .advantages__item-header{
            font-size:25px;
        }
        .advantages__item-text{
            font-size:16px;
        }
    }
</style>
