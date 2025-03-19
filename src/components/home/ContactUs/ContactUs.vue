<script setup>
import {ref} from 'vue';
import ComSocialMedia from '../../common/ComHeader/ComSocialMedia.vue';
import ContactUsText from './ContactUsText.vue';


</script>

<template>
    <section class="contacts" id="contacts">
        <iframe class="contacts__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.3269391624845!2d39.36895736810846!3d51.617219957523716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x413b30e7e5f7b253%3A0xad25d845941530c9!2z0JDQoNCa0JA!5e0!3m2!1sru!2sru!4v1742039652730!5m2!1sru!2sru" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <div class="contacts__body">
            <ContactUsText/>
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
    
}

@media (min-width:1600px){
    .contacts__body{
        padding:220px 100px;
    }
   
}
</style>