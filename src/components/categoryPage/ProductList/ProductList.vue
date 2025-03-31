<script setup>
import RegCard from './CardRegular.vue';
import PlatformCard from './CardPlatform.vue';
import CategoryDescription from './CategoryDescription.vue';

const props = defineProps({
    categoryObject:{
        type:Object,
        default(){
            return{
                description:"Данная страница находится в разработке! :)",
                empty:true,
            }
        }
    }
})

const subcategories = props.categoryObject.subcategories;
console.log(subcategories)

function calcMinimalCost(item){
    const allItemCosts = Object.values(item.cost);
    const itemMinimalCost = allItemCosts.sort((a,b) => a-b)[0];
    return itemMinimalCost;
}

</script>

<template>
    <section class="category-wrapper">
        <h2 v-if="props.categoryObject.empty"> {{ props.categoryObject.description }}</h2>
    
        <div v-else class="content-wrapper">
            <div class="category">
                <div 
                    v-for="subcategory in subcategories" 
                    class="subcategory"
                >
                    <h2  
                        class="subcategory-name"
                    >
                     {{ subcategory.name }}
                    </h2>


                    <div class="subcategory__list">
                        <article
                            class="subcategory-item"
                            v-for="item in subcategory.items"
                            >
                            <div class="subcategory-item__image-wrapper">
                                <pirture class="subcategory-item__image-first-layer">
                                    <source type="image/webp" :srcset="item.defaultImg + '.webp'">
                                    <source type="image/png" :srcset="item.defaultImg + '.png'">
                                    <img 
                                        :src="item.defaultImg + '.png'"
                                        class="subcategory-item__image"
                                        />
                                </pirture>
                            </div>
                            <div class="subcategory-item__body">
                                
                                <p class="subcategory-item__subcategory-name"> {{subcategory.name}}</p>
                                
                                <h3 class="subcategory-item-header"> 
                                    {{ item.name }}
                                </h3>

                                <div class="subcategory-item__footer">
                                    <p class="subcategory-item__cost">
                                        от {{ calcMinimalCost(item) }}р.
                                    </p>

                                    <button class="subcategory-item__add-button">
                                        + 
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>

                </div>
            </div>

            <CategoryDescription :description="props.categoryObject.description"/>
        </div>
    </section>
</template>

<style scoped>

    /* GENERAL */

    .category-wrapper{
        background-color: var(--main-bg-color);
        width:100%;
        font-family: var(--main-font-family);
        padding:70px var(--side-padding) 50px;
        box-sizing: border-box;
    }

    .subcategory-name{
        padding:20px 0;
        color:var(--second-main-color);
        font-size:var(--h2-font-size);
        font-weight:var(--h2-font-weight);
        text-align: center;
    }
    
    /* ITEM */

    .subcategory-item{
        border-radius:10px;
        padding:10px;
        margin:25px auto;
        transition:0.2s;
        height:400px;
        max-width: 300px;
        border-top:2px solid var(--second-main-color);
        border-bottom:2px solid var(--second-main-color);
        box-shadow: 0 0 5px -2px var(--contacts-bg-color);  
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .subcategory-item:hover{
        box-shadow: 0 0 20px 1px var(--contacts-bg-color);
        border-top:2px solid var(--contacts-bg-color);
        border-bottom:2px solid var(--contacts-bg-color);
    }
    .subcategory-item:hover  h3{
        color:var(--second-main-color);

    }
    .subcategory-item:hover > img{
        transform:scale(1.3);
    }


    /* IMAGE */

    .subcategory-item__image-wrapper{
        flex-grow:1;
    }
    
    .subcategory-item__image-first-layer{
        height: 100%;
        display: flex;
        flex-flow:column;
        justify-content: center;
        align-items: center;
    }
    
    .subcategory-item__image{
        display: block;
        background-size: cover;
        margin: auto;
        width:100%;
        transform: scale(1.0);
        padding-bottom:10px;
    }
    
    .subcategory-item__subcategory-name{
        font-size:15px;
        font-weight:500;
        color:var(--contacts-bg-color);
        filter:opacity(0.5);
        border-top:1px solid var(--contacts-bg-color);
        margin:0;
        padding-top:10px;
    }

    .subcategory-item-header{
        padding:5px 0 20px 0;
        height:2em;
        margin:0;
        font-size:20px;
        font-weight:600;
        color:var(--contacts-bg-color) ;
        transition-duration:0.4s;
    }

    /* FOOTER */
    .subcategory-item__body{
        flex-grow:0;
    }

    .subcategory-item__footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:flex-end;
        padding-bottom:10px;
    }

    .subcategory-item__cost{
        margin:0;
        padding:0;
        font-weight:500;
        transition:0.4s;
    }

    .subcategory-item__add-button{
        font-size:25px;
        padding:0 7px;
        margin-right:10px;
        aspect-ratio: 1 / 1;
        background-color: var(--contacts-bg-color);
        border:none;
        border-radius: 10px;
        color:#fff;
        transition: 0.2s;
    }

    .subcategory-item__add-button:hover{
        background-color: var(--second-main-color);
    }


    /* RESPONSIVENESS */



    @media (min-width:560px){
        .subcategory-item{
            width:40%;
            margin:10px;
            height:360px;
        }

        .subcategory__list{
            display: flex;
            flex-flow: row wrap;
            justify-content: center;

        }
    }

    @media (min-width:768px){
        .subcategory-item{
            height:400px;
        }
    }
    @media (min-width:1024px){
        .subcategory-item{
            width:25%;
            margin:15px;
        }
        .subcategory-item__cost{
            font-size:16px;
        }
    }
    @media (min-width:1440px){
        .subcategory-item__subcategory-name{
            font-size:16px;
        }
        .subcategory-item-header{
            font-size:22px;
            padding:10px 0 25px 0;
        }

        .subcategory-item{
            width:28%;
            max-width: 300px;
            height:450px
        }

        .subcategory-item__cost{
            font-size:18px;
        }

        .subcategory-item__add-button{
            padding:0 10px;
            font-size:30px;
        }
    }

    @media (min-width:1600px){
        .subcategory-item__subcategory-name{
            font-size:18px;
        }
        .subcategory-item{
            width:28%;
            max-width: 400px;
            height:550px
        }
        .subcategory-item-header{
            font-size:26px;
            padding:15px 0 30px 0;
        }
        .subcategory-item__cost{
            font-size:24px;
        }
    }

    @media (min-width:1920px){
        .subcategory-item__subcategory-name{
            font-size:23px;
        }
        .subcategory-item-header{
            font-size:32px;
        }
        .subcategory-item{
            height:600px;
            max-width:400px;
        }
        .subcategory-item__cost{
            font-size:26px;
        }
    }

    @media (min-width: 2560px){
        .subcategory-item{
            height:600px;
            max-width:450px;
        }
    }
</style>