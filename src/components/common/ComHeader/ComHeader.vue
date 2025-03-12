<script setup>

import ComBurger from './ComBurger.vue';
import ComSocialMedia from './ComSocialMedia.vue';
import { ref, computed, reactive} from 'vue';

// elements states
const asideIsHidden = ref(true)
const burgerIsChanged = computed(() => {
    return !asideIsHidden.value
})
const socialMediaListIsHidden = ref(true)
const socialMediaIconActivated = computed(() =>{
    return !socialMediaListIsHidden.value
});


const asideClasses = computed(() => {
    return [
        'aside-nav',
        {'aside-nav_hidden':asideIsHidden.value}
    ]
});

const socialMediaListClasses = computed(() => {
    return [
        'social-media-list',
        {'social-media-list_hidden':socialMediaListIsHidden.value}
    ]
})
const socialMediaIconClasses = computed(() => {
    return [
        'social-media-list__icon',
        {'social-media-list__icon_activated':socialMediaIconActivated.value}
    ]
})


function toggleAside(){
    asideIsHidden.value = !asideIsHidden.value;
}

function toggleSocialMediaList(){
    socialMediaListIsHidden.value = !socialMediaListIsHidden.value
}

defineExpose({
    asideIsHidden,
    socialMediaListIsHidden,
    toggleAside,
    toggleSocialMediaList
})

</script>

<template>
        <header>
            <nav>
                <ComBurger @click="toggleAside()" :class="{change:burgerIsChanged}"></ComBurger>
                <div class="nav-list">
                    <a class="nav__button" href="#about"> О нас </a>
                    <a class="nav__button" href="#catalogue"> Каталог </a>
                    <a class="nav__button" href=""> Контакты </a>
                    <a class="nav__button" href=""> Галерея</a>
                </div>
            </nav>
    
            <div class="logo">
                <img class="logo__img" src="../../../assets/imgs/general/new_logo_dark_v3.png" alt="Логотип"/>
            </div>
    
            <div class="social-media">
                <ComSocialMedia></ComSocialMedia>
                <div class="social-media-list-box">
                    <img :class="socialMediaIconClasses" src="../../../assets/imgs/general/contact.svg" @click="toggleSocialMediaList"/>
                </div>
            </div>
        </header>
    
        <aside :class="asideClasses">
            <a class="aside-nav__link" href="#about" @click="toggleAside()"> О нас </a>
            <a class="aside-nav__link" href="#catalogue" @click="toggleAside()"> Каталог </a>
            <a class="aside-nav__link" href="#about"  @click="toggleAside()"> Контакты </a>
            <a class="aside-nav__link" href="#about"  @click="toggleAside()"> Галерея</a>
        </aside>
    
        <div :class="socialMediaListClasses">
    
            <a class="social-media-list__item" href="#" @click = "toggleSocialMediaList()"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="white" class="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg> 
            </a>
            <a class="social-media-list__item" href="#" @click = "toggleSocialMediaList()"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="white" class="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
            </a>
            <a class="social-media-list__item" href="#" @click = "toggleSocialMediaList()">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="white" class="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
            </a>
        </div>


</template>

<style scoped>

header{
    width:100%;
    box-sizing:border-box;
    background-color:#000;
    color:white;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    padding:5px 10px;
    position:fixed;
    z-index:2;
}

/* Navigational panel */
nav{
    display:flex;
    flex-direction:row;
    align-items: center;  
    width:calc(100%/3);
}



.nav-list{
    display:none;
}


/* Logo-block */

.logo{
    width:calc(100%/3);;
}
.logo__img{
    display:block;
    margin:5px auto;
    height:25px;
}

/* Social-media block */

.social-media{
    width:calc(100%/3);
    display:flex;
    flex-direction:row-reverse;
    align-items:center
}

.social-media-list{
    background-color:#000;
    position:absolute;
    display:flex;
    flex-direction:column;
    border-bottom-left-radius: 20px;
    right:0;
    top:calc(30px + 15px);
    transition:0.4s;
    position:fixed;
    z-index:1;
}

.social-media-list__icon{
    display:block;
    margin:auto 0 0 auto;
    height:30px;
    transition:0.6s;
}

.social-media-list__item{
    background-color: #000;
    padding:5px 2px 5px 0;
    width:45px;
    border-bottom-left-radius: 20px;
}

.social-media-list_hidden{
    transform: translate(0, -101%);
}
.social-media-list__icon_activated{
    transform: rotate(180deg);
}

/* Aside menu */

.aside-nav{
    background-color: #000;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:calc(100vh - 30px - 15px);
    width:50vw;
    position:fixed;
    bottom:0;
    z-index:2;
    transition:0.5s;
}


.aside-nav__link{
    color:white;
    display:block;
    margin:10px 1vw;
    text-decoration: none;
    text-transform: uppercase;
    font-family: var(--main-font-family);
    font-weight:600;
}

.aside-nav_hidden{
    transform: translate(-101%, 0)
}

/* ADAPTATION FOR DIFFERENT SCREENS */


@media (min-width:560px){
    .logo__img{
        height:30px;
    }
    .social-media-list__icon{
        display:block;
        margin-left:auto;
        height: 35px;
    }
    .aside-nav{
        height: calc(100% - 35px - 15px);
        width:40%;
    }
    .social-media-list{
        top:calc( 35px + 15px)
    }
    .social-media-list__item{
        padding: 10px 5px 10px 5px;
    }
}


@media (min-width:768px){
    .logo__img{
       height:35px
    }
    .social-media-list__icon{
        display:block;
        margin-left:auto;
        height: 40px;
    }
    .aside-nav{
        height: calc(100% - 40px - 15px);
        width:30%;
    }
    .social-media-list{
        top:calc( 40px + 15px)
    }
    .social-media-list__item{
        padding: 10px 8px 10px 8px;
    }
}

@media (min-width:1024px){
    .aside-nav{
        display:none;
    }
    header{
        padding:25px;
        position:absolute;
        background:none;
    }
    .nav-list{
        display:flex;
    }
    .nav__button{
        color:white;
        display:block;
        margin:0 6px;
        text-decoration: none;
        text-transform: uppercase;
        font-family: var(--main-font-family);
        font-weight:600;
        font-size:12px;
    }
    .logo__img{
        height:35px;
    }
    .nav__open, .social-media-list-box{
        display:none;
    }

    .social-media{
        display:flex;
        flex-direction: row-reverse;
        align-items: center;
    }
    .social-media-list{
        display:none
    }
}


@media (min-width:1440px){
    header{
        padding:25px;
    }
    .nav__button{
        font-size:15px;
        margin:0 9px;
    }
    .logo__img{
        height:35px;
    }
}

@media (min-width:1600px){
    header{
        padding:35px;
    }
    .nav__button{
        font-size:16px;
        margin:0 12px;
    }
    .logo__img{
        height:45px;
    }
}

@media (min-width:1920px){
    header{
        padding:45px;
    }
    .nav__button{
        font-size:22px;
        margin:0 12px;
    }
    .logo__img{
        height:45px;
    }
}
</style>



<!-- #636363 - хороший цвет 
     #3c3c3c тоже
-->