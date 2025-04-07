<script setup>

const props = defineProps({
    itemProps:{
        type:Object,
        default(){
            return {
                name:"Пока карточка не разработана!"
            }
        }
    },
    subcategory:{
        type:String,
        defalut:"Пока неизвестно :)"
    }
})


function calcMinimalCost(item){
    const allItemCosts = Object.values(item.cost);
    const itemMinimalCost = allItemCosts.sort((a,b) => a-b)[0];
    return itemMinimalCost;
}

</script>

<template>

<div class="subcategory-item__image-wrapper">
    <picture class="subcategory-item__image-first-layer">
        <source type="image/webp":srcset="itemProps.folderPath + itemProps.folderName + '.webp'"/>
        <img 
            :src="itemProps.defaultImg + '.png'" 
            class="subcategory-item__image"/>
    </picture>
        
    </div>
    <div class="subcategory-item__body">
        <p class="subcategory-item__subcategory-name"> 
            {{subcategory}}
        </p>
        
        <h3 class="subcategory-item-header"> 
            {{ itemProps.name }}
        </h3>

        <div class="subcategory-item__footer">
            <p class="subcategory-item__cost">
                от {{ calcMinimalCost(itemProps) }} &#8381
            </p>

            <button class="subcategory-item__add-button">
                + 
            </button>
        </div>
    </div>
</template>

<style scoped>

/* ITEM */


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
        /* display: block;  */
        margin: auto;
        width:100%;
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


    /* Responsivness */
    

  
    @media (min-width:1024px){

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

        .subcategory-item__cost{
            font-size:26px;
        }
    }



</style>