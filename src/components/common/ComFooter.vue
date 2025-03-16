<script setup>

</script>

<template>
    <footer>
        <div class="copyright-wrapper">
            <div class="copyright">
                <h2 class="footer__header">
                    COPYRIGHT
                </h2>
                АРКА © 2025 все права защищены
            </div>
            <div class="privacy">
                <p class="privacy__text">
                    ИП Яшугин С.В. (arka-vrn.ru) 2020. Любое использование либо копирование материалов или подборки материалов сайта, элементов дизайна и оформления допускается с разрешения правообладателя и с указанием ссылки на источник arka-vrn.ru. Цены на товары и услуги, указанные на сайте, не являются публичной офертой.
                </p>
            </div>
        </div>
    </footer>

</template>

<style scoped>
    footer{
        background-color: #1f1f1f;
        padding:20px var(--side-padding);
        width:100%;
        font-family: var(--main-font-family);
        line-height: 1.5em;
        box-sizing: border-box;
    }
    .footer__header{
        color:#525252;
        font-size:var(--h2-font-size);
        font-weight:var(--h2-font-weight);
        margin:0;
        padding-bottom:20px;
    }
    .copyright-wrapper{
        padding-top:20px;
        color:white;
        font-weight:200;
        font-size:12px
    }

    .privacy{
        padding:30px 0 0;
    }

    @media(min-width:768px){
        .copyright-wrapper{
            display:flex;
            flex-flow: row wrap;
            justify-content:space-between;
            align-items: center;
            padding-top:70px;
            padding-bottom:70px;
        }
        .privacy{
            padding-top:0;
            padding-left:70px;
            margin:0;
            width:55%;        
            flex-grow: 1;
        }
        .copyright{
            text-align: center;
            width: 32%;
            flex-grow: 0;
            flex-shrink:1;
        }
        .privacy__text{
            margin:0 auto;
        }
    }

    @media (min-width:1600px){
        footer{
            padding:50px var(--side-padding);
        }
        .footer__header{
            padding-bottom:40px;
        }
        .privacy__text, .copyright{
            font-size:20px;
            line-height:1.5em;
        }
        .copyright{
            text-align:left;
        }
    }

    @media (min-width:2400px){
        footer{
            padding:100px var(--side-padding);
        }
        .privacy__text, .copyright{
            font-size:23px;
            line-height:1.5em;
        }
    }
</style>