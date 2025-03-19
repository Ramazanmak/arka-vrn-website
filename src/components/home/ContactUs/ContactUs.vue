<script setup>
import {ref} from 'vue';
import ComSocialMedia from '../../common/ComHeader/ComSocialMedia.vue';

</script>

<template>
    <section class="contacts" id="contacts">
        <iframe class="contacts__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.3269391624845!2d39.36895736810846!3d51.617219957523716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x413b30e7e5f7b253%3A0xad25d845941530c9!2z0JDQoNCa0JA!5e0!3m2!1sru!2sru!4v1742039652730!5m2!1sru!2sru" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <div class="contacts__body">
            <h2 class="contacts__header">Наши контакты</h2>

            <div class="contacts__text">
                <a class="contacts__way" href="tel:+79222475444"> +7-903-651-46-78</a>
                <br>
                <a class="contacts__way" href="mailto:ramazan_M_I@mail.ru"> arka.zabor@yandex.ru</a>
                <br>
                <br>
                <span class="contacts__adress"> Воронежская обл., Новая Усмань, ул. Дорожная, 1-А/1</span>
                <br>
                <span class="contacts__schedule"> Пн.-Пт.: 08:00 - 17:00</span>
                <span class="contacts__schedule"> Сб.-Вс. - Выходной</span>
            </div>
        </div>
        <div class="contact-us__map">

        </div>

    </section>
</template>

<style scoped>
    .contacts{
        background-color: var(--main-bg-color);
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
        background-color: var(--contacts-bg-color);
        padding: 50px var(--side-padding);
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
        font-weight:500;
        letter-spacing: 1px;
        color:white;
        text-decoration: none;
        transition:0.1s
    }
    .contacts__way:hover{
        color:var(--second-main-color)
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
        grid-template-columns: 1fr 1fr;
    }
    .contacts__map{
        grid-column: 1 / 2;
        max-width: 50vw;
        height: 100%;
        aspect-ratio: 0;
    }
    .contacts__body{
        grid-column: 2 / 3;
        padding:150px 50px;
    }
    .contacts__header{
        padding:60px 0;
    }
}

@media (min-width:1600px){
    .contacts__body{
        padding:220px 100px;
    }
    .contacts__header{
        padding:80px 0;
    }
    .contacts__way{
        font-size:26px;
        line-height:1.5em
    }
    .contacts__schedule, .contacts__adress{
        font-size:24px;
        line-height:1.5em;
    }
}
</style>