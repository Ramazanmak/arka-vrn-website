<script setup>
    import {shallowRef} from 'vue'

    const achievementPhotos = shallowRef([
        {
            id:1,
            style:{
                "background-image":"url('/src/assets/imgs/general/achievements/achievements-1of4.png')",
                "grid-column":"1 / 2",
                "grid-row":"1 / 2",
                }
        },
        {
            id:2,
            style:{
                "background-image":"url('/src/assets/imgs/general/achievements/achievements-2of4.png')",
                "grid-column":"2 / 3",
                "grid-row":"1 / 2",
                }
        },
        {
            id:3,
            style:{
                "background-image":"url('/src/assets/imgs/general/achievements/achievements-3of4.png')",
                "grid-column":"1 / 2",
                "grid-row":"2 / 3",
                }
        },
        {
            id:4,
            style:{
                "background-image":"url('/src/assets/imgs/general/achievements/achievements-4of4.png')",
                "grid-column":"2 / 3",
                "grid-row":"2 / 3",
                }
        }
    ])
</script>

<template>
    <div id="about" class="achievements">
        <section class="achievements__item">
            <h2  class="achievements__header  achievements__header_straight"> Наша цель </h2>
            <p class="achievements__item-text achievements__item-text_straight">
                Уже более 25 лет мы занимаемся изготовлением бетонных изделий.Каждая технология отрабатывается многолетним опытом и доводитсядо совершенства. Наша политика - работать на качество изделий. А наша цель - делать улицы нашей Родины красивее и чище.
            </p>
            <div class="achievements__item-photolist">
                <div class="achievements__item-photolist-photo" v-for="photo in achievementPhotos" v-key="photo.id" :style="photo.style">
                </div>
            </div>
        </section>
        <section class="achievements__item">
            <h2 class="achievements__header achievements__header_reversed"> Насколько мы опытны?</h2>
            <p class="achievements__item-text  achievements__item-text_reversed">
                Свыше <span class="highlighted">2000</span> мусорных площадок нашего производства было установлено в <span class="highlighted">17</span> регионах Воронежской области за 3 года. А наши скамейки, лавки, антипарковочные столбики и полусферы вы можете встретить на улицах, зонах отдыха всего Воронежа. И это далеко не предел!
            </p>
            <div class="achievements__item-photo-single">
            </div>
        </section>
    </div>

</template>

<style scoped>
    .achievements{
        background-color: var(--main-bg-color);
        font-family: var(--main-font-family);
        padding:100px 5% 40px;
    }
    .achievements__header{
        font-size:20px;
        font-weight:500;
        color:var(--second-main-color)
    }
    .achievements__item{
        padding: 0;
        padding-bottom:30px;
    }
    .achievements__item-text{
        font-size:14px;
        line-height:2em;
        font-weight:400;
    }
    .achievements__item-photolist{
        width:100%;
        aspect-ratio:1;
        display:grid;
        gap:1em;
        
   }
    .achievements__item-photolist-photo{
        background-size:cover;
        min-width:calc(( 100% - 40px ) /2);
        aspect-ratio:1;
        border-radius:10px;
        border:1px solid var(--second-main-color);
    }
    
    .achievements__item-photolist-photo:hover{
        box-shadow:0 0 10px 2px var(--second-main-color);
        transition:100ms;
    }   

    .achievements__item-photo-single{
        background: 
            url('/src/assets/imgs/general/achievements/coverage_orange.png') no-repeat center; 
        background-size:90%;
        width:100%;
        aspect-ratio: 1.3;
    }

    /* Настройка мобильных и планшетных версий */

    @media (min-width:560px){
        .achievements{
            padding:140px 10% 40px;
        }
    }

    @media (min-width:768px){
        .achievements{
            padding:140px 13% 40px;
        }
        .achievements__header{
            font-size: 40px;
        }
        .achievements__item-text{
            font-size:16px;
        }
    }

    @media (min-width:930px){
        .achievements{
            padding:140px 18% 40px;
        }
    }



    /* Настройка компьютерных версий */

    @media (min-width:1024px){
        .achievements{
            padding:140px 9% 40px;
        }

        .achievements__item{
            display:grid;
            gap:1em;
            padding-bottom:5%;
            width:100%;
        }
        
        .achievements__header{
            margin:0;
            font-size:35px;
        }
        .achievements__header_straight{
            grid-column:1 / 2;
            grid-row: 1 / 2;
        }
        .achievements__item-text{
            font-size:16px;
        }
        .achievements__item-text_straight{
            grid-column:1 / 2;
            grid-row: 2 / 3;
            padding: 0 50px 0 0;
        }
        .achievements__item-photolist{
            grid-column: 2 / 3;
            grid-row: 1 / 3;
            width:35vw;
        }
        .achievements__item-photolist-photo{
            border:2px solid var(--second-main-color);
        }



        .achievements__header_reversed{
            grid-column:2 / 3;
            grid-row: 1 / 2;
            /* background-color: red; */
            text-align: right;
        }
        .achievements__item-text_reversed{
            grid-column:2 / 3;
            grid-row: 2 / 3;
            text-align: right;
            /* padding: 0  0 0 50px; */
        }
        
        .achievements__item-photo-single{
            grid-column: 1 / 2;
            grid-row: 1 / 3;
            width: 35vw;
        }

    }

    @media (min-width:1440px){
        .achievements__item{
            padding-bottom:8%;
        }
        .achievements__header{
            font-size:40px;
        }
        .achievements__item-text{
            font-size:24px; 
        }
    }

    @media (min-width:1600px){
        .achievements{
            padding:300px 10% 100px;
        }
        .achievements__header{
            font-size:60px;
        }
        .achievements__item-text{
            font-size:24px;
        }
    }

    @media (min-width:1920px){
        .achievements{
            padding:300px 15% 100px;
        }
        .achievements__header{
            font-size:70px;
        }
        .achievements__item-text{
            font-size:30px;
        }
    }

    @media (min-width:2200px){
        .achievements__item-text{
            font-size:35px;
        }
    }
</style>