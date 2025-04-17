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
    `background:
        linear-gradient(rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.5)) repeat,
        url(${firstScreenProps.bgImage});
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
    <div id="first-screen" class="home-first-screen-wrapper" :style="backgroundStyle">

        <section class="home-first-screen-body">
            <h1> {{ firstScreenProps.pageName }}</h1>
            <template v-if="firstScreenProps.isMain" >
                <h2> Производство МАФ-ов</h2>
                <a class="catalog-link" alt="К продукции" @click="scrollTo('catalogue')">Продукция</a>
            </template>
            <template v-else="firstScreenProps.isMain" >
                <a class="catalog-link" style="margin-top:40px" alt="К продукции" @click="findElement('category')">К товарам</a>
            </template>
        </section>
    </div>

</template>

<style scoped>
    .home-first-screen-wrapper{
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .home-first-screen-body{
        height:100%;
        color:white;
        text-align: center;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items: center;
        padding-bottom:100px;
    }

    h1, h2{
        font-family:var(--main-font-family);
    } 

    h1{
        font-size:30px;
        font-weight:500
    }

    h2{
        font-size:12px;
        font-weight:300;
        padding-bottom:2%;
    }
  

    .catalog-link{
        background-color:var(--second-main-color);
        display:block;
        width:40%;
        max-width: 200px;
        padding: 20px 15px;
        border-radius: 5px;
        margin:0 auto;
        font-family:var(--main-font-family);
        font-size:15px;
        font-weight:500;
        text-transform: uppercase;
        text-decoration:none;
        color:white;
        transition:0.4s;
        cursor:pointer;
    }

    .catalog-link:hover{
        box-shadow:#fff  0 0 10px;
    }

    @media (min-width:768px){
        h1{
            font-size:50px
        }
        h2{
            font-size:14px;
        }
    }

    @media (min-width:1024px){
        .home-first-screen-body{
            font-size:100px;
            height:80vh;
        }
        .catalog-link{
            font-size:15px;
        }
    }
 

    @media (min-width:1440px){
        h1{
            font-size:70px;
            /* padding-top:100px; */
        }
        h2{
            font-size:20px;
        }
        .catalog-link{
            font-size:18px;
            padding: 15px 10px;
    }
}

    @media (min-width:1920px){
        h1{
            font-size:90px;
        }
        h2{
            font-size:30px;
        }
        .catalog-link{
            font-size:28px;
            padding: 30px 100px;
    }
    }
</style>