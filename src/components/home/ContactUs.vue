<script setup>
import {ref} from 'vue';
import ComSocialMedia from '../common/ComHeader/ComSocialMedia.vue';

</script>

<template>
    <section class="contacts" id="contacts">
        <div class="contacts__map">

        </div>
        <div class="contacts__body">
            <h2 class="contacts__header">Наши контакты</h2>

            <div class="contacts__text">
                <span class="contacts__way"> +7-903-651-46-78</span>
                <br>
                <span class="contacts__way"> arka.zabor@yandex.ru</span>
                <br>
                <br>
                <span class="contacts__adress"> Воронежская обл., Новая Усмань, ул. Дорожная, 1-А/1</span>
                <br>
                <span class="contacts__schedule"> Пн.-Пт.: 08:00 - 17:00</span>
                <span class="contacts__schedule"> Сб.-Вс. - Выходной</span>
            </div>
            <ComSocialMedia/>
        </div>

    </section>
</template>

<style scoped>
    .contacts{
        width:100%;
        font-family: var(--main-font-family);
        line-height: 1.5em;
    }
    
    .contacts__map{
        background-color:black;
        width:100%;
        aspect-ratio: 1 / 1;
    }
    
    .contacts__body{
        color:#fff;
        background-color: var(--footer-bg-color);
        padding: 30px 20px;
        width: 100%;
        box-sizing: border-box;
    }
    
    .contacts__header{
        margin:0;
        padding:20px 0;
        font-weight:500;
        font-size:var(--h2-font-size)
        /* color:var(--second-main-color) */
    }
    
    .contacts__way{
        font-size:18px;
        font-weight:300;
        letter-spacing: 1px;
    }

    .contacts__adress, .contacts__schedule{
        display: block;
        line-height: 1.5em;
        font-size:13px;
        font-weight:300;
    }


    @media (min-width:768px){
        .contacts{
            display:grid;
            /* grid-template-columns: 1fr 1fr; */
        }
        .contacts__map{
            grid-column: 1 / 2;
            max-width: 50vw;
            aspect-ratio: 0;
        }
        .contacts__body{
            grid-column: 2 / 3;
            padding:100px 30px;
        }
        .contacts__header{
            padding:30px 0 100px;
        }
    }
</style>