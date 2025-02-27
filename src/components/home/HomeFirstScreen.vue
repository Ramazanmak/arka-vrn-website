<script setup>
import ComHeader from '../common/ComHeader/ComHeader.vue';
</script>

<template>
    <div id="first-screen" class="home-first-screen-wrapper">
        <ComHeader></ComHeader>
        <section class="home-first-screen-body">
            <h1> АРКА</h1>
            <h2> Производство МАФ-ов</h2>
            <a class="catalog-link" alt="К продукции">Продукция</a>
        </section>
    </div>

</template>

<style scoped>
    .home-first-screen-wrapper{
        background:
            linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url(../../assets/imgs/general/first-screen-background.png);
        height:100vh;
        background-size:cover;
	    background-repeat: no-repeat;
	    background-attachment: fixed;
	    background-position: top; 
    }

    .home-first-screen-body{
        color:white;
        text-align: center;
        height:50%;
        padding-top:150px;
        display:flex;
        flex-direction:column;
        justify-content:center ;
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
        padding-bottom:20px;
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
        transition:0.4s;
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
        }
        .catalog-link{
            font-size:15px;
        }
    }
 

    @media (min-width:1440px){
        h1{
            font-size:70px;
        }
        h2{
            font-size:20px;
        }
        .catalog-link{
            font-size:18px;
            padding: 15px 10px;
    }
}
</style>