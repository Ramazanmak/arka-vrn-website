<script setup>

</script>

<template>
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
</template>

<style scoped>

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
    .contacts__header{
        padding:60px 0;
    }
}

@media (min-width:1600px){
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