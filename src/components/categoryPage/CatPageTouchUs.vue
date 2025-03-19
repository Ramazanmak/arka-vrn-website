<script setup>

import ContactUsText from '../home/ContactUs/ContactUsText.vue';

</script>

<template>
    <section class="cat-contacts">
        <ContactUsText/>
    </section>
</template>

<style scoped>
    .cat-contacts{
        background-color: var(--contacts-bg-color);
        color:#fff;
        width:100%;
        font-family: var(--main-font-family);
        line-height: 1.5em;
        padding: 20px   var(--side-padding) 50px;
        width: 100%;
        box-sizing: border-box;
        text-align: left;
    }

    @media (min-width:768px){
        .cat-contacts{
            text-align: center;
        }
    }
</style>