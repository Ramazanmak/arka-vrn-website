<script setup>
import {useRouter, useRoute} from "vue-router"

const firstScreenProps = defineProps({
    isMain:{
        type:Boolean,
    },
    pageName:{
        type:String,
        default:"APKA"
    },
    bgImage:{
        type:String,
        default:"/general/first-screen-background.png"
    }
})

const backgroundStyle =
    `backdrop-filter: brightness(0.3);
     background-size:cover;
     background-repeat:repeat;
     background-attachment:fixed;
     background-position:center;
     height:100vh;`

const router = useRouter();
const route = useRoute();

    function findElement(id){
        const el = document.getElementById(id);
        el.scrollIntoView({behavior:"smooth"});
    }

    function scrollTo(id){
        if (route.path != '/'){
            router.push('/')
        }
        setTimeout(findElement,0,id);
    }
</script>

<template>
    <div id="first-screen" class="home-first-screen-wrapper">

        <section class="home-first-screen-body">
            <h1 class="main-header">
                Лавки, урны, вазоны и контейнерные площадки “под ключ” <span class="highlighted"> за 7 дней </span> с экономией до <span class="highlighted"> 480 000 ₽ </span> благодаря собственному производству <span class="highlighted"> без посредников </span>
            </h1>
            <ul class="about-list">
                <li class="about-list__item"> 
                    Стандарты ГОСТ и гарантия 3 года — приёмка проходит с первого раза, без доработок и штрафов. 
                </li>
                <li class="about-list__item">
                    Долговечность 25 лет — минимальный уход, исключаем повторные закупки и ремонт.
                </li>
                <li class="about-list__item">
                    Антивандальное исполнение — бетон М400, лавку или урну невозможно опрокинуть или унести.
                </li>
                <li class="about-list__item">
                    120+ выполненных гос-контрактов и 20 муниципалитетов-клиентов — подтверждённый опыт работы по 44-ФЗ.
                </li>
            </ul>
            <p class="invitation-to-quiz">
                Пройдите опрос за 60 секунд и получите чек-лист «7 скрытых рисков при закупке МАФ: как сэкономить до 1 млн ₽ и избежать срыва сроков»
            </p>

            <a class="check-list-link">
                Пройти опрос и получить чек лист
            </a>
        </section>
    </div>

</template>

<style scoped>
    .home-first-screen-wrapper{
        background:
            linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
            url('/general/first-screen-background.png');
        background-size:cover;
        background-repeat:repeat;
        background-attachment:fixed;
        background-position:center;
        height:100vh;
        display:flex;
        flex-direction: column;
        justify-content:flex-end;
        font-family:var(--main-font-family);
        --bullet-size:10px;
        --padding-bottom:4vh;
    }
    .home-first-screen-body{
        height:calc(100% - 45px);
        color:white;
        text-align: center;
        display:flex;
        flex-direction:column;
        justify-content:center;
        max-width: 80%;
        margin:0 auto;
    }
        
    .main-header {
        font-size:17px;
        color:white;
        text-align:left;
        margin:0 auto;
        padding:0 0 var(--padding-bottom);
    }
    
    .about-list{
        font-size:11px;
        text-align: left;
        line-height:1.5em;
        margin:0;
        padding: 0;
        list-style-type:none;
        padding:0 0 var(--padding-bottom);
    }

    .about-list__item{
        padding:5px 20px;
        position: relative;
        /* background-color: red; */
    }
    .about-list__item::before{
        content:'';
        position:absolute;
        left:0;
        top:10px;
        width: var(--bullet-size); /* Нужная ширина */
        height: var(--bullet-size); /* Нужная высота */
        background-image: url('/general/bullet-icon.svg');
        background-size: contain; /* Масштабирует картинку по размеру блока */
        background-repeat: no-repeat;
    }

    .invitation-to-quiz{
        font-size:10px;
        text-align: left;
        padding:0 0 var(--padding-bottom);
        margin:0;
    }
    .check-list-link{
        background-color:var(--second-main-color);
        padding:10px;
        max-width:250px;
        border-radius: 10px;
        font-family:var(--main-font-family);
        font-size:11.5px;
        font-weight:500;
        text-decoration:none;
        color:white;
        transition:0.4s;
        cursor:pointer;
    }

    .catalog-link:hover{
        box-shadow:#fff  0 0 10px;
    }






    /* Настройка по ширине экрана */


    @media (min-width: 560px){
        .main-header{
            font-size:21px;
        }
        .about-list{
            font-size: 12px;
        }
        .invitation-to-quiz{
            font-size: 11px;
        }
        .check-list-link{
            font-size:14px;
        }
    }
    @media (min-width:768px){
        .main-header{
            font-size:25px;
        }
        .about-list{
            font-size: 15px;
        }
        .invitation-to-quiz{
            font-size: 14px;
        }
        .check-list-link{
            font-size:15px;
        }
    }

    @media (min-width:1024px){

        .home-first-screen-body{
            height:90vh;
        }
        .main-header{
            font-size:28px;
        }
        .about-list{
            font-size: 15px;
            padding-left:40px
        }
        .invitation-to-quiz{
            font-size: 14px;
            padding-left:40px
        }
        .check-list-link{
            font-size:15px;
            max-width:300px;
            margin-left:40px
        }
    }
 

    @media (min-width:1440px){
        .home-first-screen-body{
            height:100vh;
        }
        .main-header{
            font-size:36px;
        }
        .about-list{
            font-size: 17px;
        }
        .invitation-to-quiz{
            font-size: 16px;
        }
        .check-list-link{
            font-size:17px;
        }
    }

    @media (min-width:1920px){
        .main-header{
            font-size:43px;
        }
        .about-list{
            font-size: 18px;
        }
        .invitation-to-quiz{
            font-size: 17px;
        }
        .check-list-link{
            font-size:18px;
        }
    }

    /* Под разную высоту мобилок */

    @media (min-width:360px) and (max-width:450px) and (min-height:750px) {

        .main-header{
            font-size:21px;
        }
        .about-list{
            font-size: 12px;
        }
        .invitation-to-quiz{
            font-size: 11px;
        }
        .check-list-link{
            font-size:14px;
        }
    }

    @media (min-width:360px) and (min-height:1010px) {

        .main-header{
            font-size:37px;
        }
        .about-list{
            font-size: 18px;
        }
        .invitation-to-quiz{
            font-size: 17px;
        }
        .check-list-link{
            font-size:18px;
            min-width:300px;
        }
    }
</style>