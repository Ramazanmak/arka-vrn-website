<script setup>

import {ref, computed, watchEffect} from 'vue';

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
        default:"Пока не известно :)"
    }
})





const namesOfProps = {
    sizes: 'Размеры',
    description:'Описание',
    cost:'Цена',
    types:'Типы',
    materials:'Основной материал',
    woods:'Порода древисины',
    colors:'Цвет',
    height:'Высота',
    width:'Ширина',
    length:'Длина',
    diameter:'Диаметр',
    exDiameter:'Внешний диаметр',
    inDiameter:'Внутренний диаметр',
    weight:'Масса',
    exWidth:'Внешная протяжённость',
    inWidth:'Вутренняя протяжённость',
}

const unitsOfProps = {
    weight:'кг',
    height:'см',
    length:'см',
    width:'см',
    diameter:'см',
    exDiameter:'см',
    inDiameter:'см',
    exWidth:'см',
    inWidth:'см',
}

const allChoosableProps = [
    "types",
    "woods",
    "materials",
    "colors",
    "cost"
]



const chosenPropsValues = ref({
    types:"",
    woods:"",
    materials:"",
    colors:"",
    cost:"",
});

// Установка начального значения выбираемых параметров


Object.keys(chosenPropsValues.value).forEach((el) =>{
    const choosable = props.itemProps.choosable;
    if (Object.keys(choosable).includes(el)){
        chosenPropsValues.value[el] = Object.keys(choosable[el])[0];
    }
})

setTimeout(() =>{
    console.log(chosenPropsValues.value)
},0)


// Установка начальных значений цены и изображения

const imgPath = ref(props.itemProps.defaultImg);
const cost = ref(props.itemProps.folderName)

watchEffect(() => {
    cost.value=props.itemProps.folderName
    imgPath.value = props.itemProps.defaultImg

    Object.values(chosenPropsValues.value).forEach((value) => {
        if(value != ""){
            cost.value = cost.value + '-' + value
            imgPath.value = imgPath.value +'-'+ value
        }
    })
})



</script>

<template>
    <div class="item-content">
        <div class="item-content__general-block">
            <picture class="item-content__img-container">
                <source type="image/webp":srcset="imgPath + '.webp'"/>
                <source type="image/png":srcset="imgPath + '.png'"/>
                <img 
                    :src="imgPath + '.png'" 
                    class="item-content__img"/>
            </picture>
            <div class="item-content__main-info">
                <p class="item-content__subcategory-name"> {{ subcategory }}</p>
                <h3 class="item-content__header"> {{ itemProps.name }} </h3>
                <div class="item-content__cost-block">
                    <div class="item-content__footer">
        
                        <button class="item-content__add-button">
                            + 
                        </button>
                        <p class="item-content__cost">
                            {{ itemProps.cost[cost]}} &#8381
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="item-content__detailed-block">
  
            <!-- Здесь описание статических параметров -->
            <div class="item-content__static-params">

                <!-- Описание размеров -->
                <ul class="item-content__setting">
                    <h4 class="item-content__setting-header"> Размеры </h4>
                    <li class="item-content__setting-option"
                        v-for="(sizeValue,sizeName) in itemProps.sizes">
                        <p class="item-content__setting-text">
                            {{ namesOfProps[sizeName] }}: {{ sizeValue }}
                             {{ unitsOfProps[sizeName] }};
                        </p>
                    </li>
                </ul>


            </div>

                

            <!-- Здесь описание параметров, выбираемых пользователем -->
            <ul
                v-for="(parValue,parName) in itemProps.choosable"
                class="item-content__setting"
                >
                <h4 class="item-content__setting-header"> 
                    {{ namesOfProps[parName] }}
                </h4>

                <li 
                    v-for="(optionValue, optionName) in parValue" 
                    class="item-content__setting-option">
                    <input  
                        type="radio" 
                        :value="optionName"
                        v-model="chosenPropsValues[parName]"
                        class="item-content__radio"

                    >
                    <label class="item-content__setting-text"> 
                        {{ optionValue }}
                    </label>
                </li>

            </ul>

            <!-- Описание словесное -->
            <h4 class="item-content__setting-header"> Описание</h4>
            <ul 
                v-if="itemProps.description.length > 0" 
                class="item-content__description">

                <li class="item-content__description-point"
                    v-for="point in itemProps.description">
                    <p class="item-content__setting-text">
                        {{ point }}
                    </p>
                </li>

            </ul>


            
        </div>
    </div>
</template>

<style scoped>
    *{
        --font-base:15px;
    }

    .item-content{
        border-radius:10px;
        padding:10px;
        max-width: 300px;
        transition:0.2s;
        margin:auto;
        border-top:2px solid var(--second-main-color);
        border-bottom:2px solid var(--second-main-color);
        box-shadow: 0 0 5px -2px var(--contacts-bg-color);      
        box-sizing: border-box;
    }

    .item-content:hover{
        box-shadow: 0 0 20px 1px var(--contacts-bg-color);
        border-top:2px solid var(--contacts-bg-color);
        border-bottom:2px solid var(--contacts-bg-color);
    }
    /* БЛОК С ОБЩЕЙ ИНФОРМАЦИЕЙ */


    .item-content__general-block{
        box-sizing: border-box;
        /* background-color: red; */
        padding-bottom:10px;
        height:420px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom:1px solid var(--contacts-bg-color);
    }
    .item-content__img-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
        flex-grow:1;
        border-radius: 10px;
    }

    .item-content__img{
        padding-top:20px;
        display:block;
        max-width:100%;
        max-height:225px;
    }

    .item-content__main-info{
        flex-grow:0;
        padding: 15px 0;
    }

    .item-content__subcategory-name{
        font-size:var(--font-base);
        font-weight:500;
        color:var(--contacts-bg-color);
        filter:opacity(0.5);
        border-top:1px solid var(--contacts-bg-color);
        margin:0;
        padding-top:20px;
    
    }

    .item-content__header{
        padding:15px 0;
        margin:0;
        font-size:calc(var(--font-base) + 9px);
        font-weight:600;
        color:var(--contacts-bg-color) ;
        transition-duration:0.4s;
    }

      /* Настройка подвала карточки */


      .item-content__footer{
        display: flex;
        flex-direction:row;
        justify-content:space-between;
        align-items: end;
        /* width:60%; */
    }

    .item-content__cost{
        flex-grow: 1;
        padding-left:20px;
        margin:0;
        font-weight:500;
        font-size:calc(var(--font-base));
        color:var(--second-main-color);
        text-align: left;
    }

    .item-content__add-button{
        font-size:calc(var(--font-base));
        padding:0 7px;
        aspect-ratio: 1 / 1;
        height:1.5em;
        background-color: var(--contacts-bg-color);
        border:none;
        border-radius: 10px;
        color:#fff;
        transition: 0.2s;
        flex-grow: 0;
    }

    /* БЛОК С ПОДРОБНЫМИ НАСТРОЙКАМИ */
    .item-content__detailed-block{
        padding:20px 0;
        display:flex;
        flex-direction: column;
        justify-content: center;
    }
    .item-content__setting-header{
        margin:0;
        padding:10px 0 0 0;
        color:var(--contacts-bg-color);
        font-size:calc(var(--font-base) + 2px)
    }

    /* Настройка списков типа ul */
    .item-content__setting {
        padding:0 0 10px 0;
        margin:0;
    }

    .item-content__description{
        padding-left:20px;
        margin:0;
    }
    .item-content__description ::marker {
        color:var(--second-main-color)
    }

    /* Настройка элементов списка типа li */
    .item-content__setting-option{
        list-style: none;
        display: inline-block;
        padding:10px 10px 0 0;
    }

    .item-content__description-point{
        list-style: disc;
        padding-top:10px
    }

    .item-content__setting-text{
        margin:0;
        font-size:calc(var(--font-base) - 4px);
    }

    .item-content__radio{
        display:inline-block;
        margin-right:10px;
        accent-color:var(--second-main-color);
        transition:0.5s;
    }


  

    @media (min-width:560px){
        *{
            --font-base:18px
        }
        .item-content{
            max-width:450px;
            padding:30px;
        }
        .item-content__general-block{
            height:450px;
        }
        .item-content__setting-header{
            padding:15px 0 0 0;
        }
        .item-content__description-point{
            padding-top:15px
        }
    }

    @media (min-width:1024px){
        *{
            --font-base:17px
        }
        .item-content{
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            width:100%;
            max-width: none;
            margin:60px 0 150px 0;
        }
      
        .item-content__general-block{
            height:450px;
            width:45%;
            flex-grow: 0;
            padding-right:30px;
            border-bottom:none;
        }
        .item-content__detailed-block{
            /* background-color: red; */
            width:50%;
            flex-grow:1;
            padding-left:30px;
            border-left:1px solid var(--contacts-bg-color)
        }
    }

    @media (min-width:1440px){
        *{
            --font-base:22px
        }
        .item-content__general-block{
            height:450px;
        }

        .item-content__setting-header{
            padding:25px 0 0 0;
        }

        .item-content__general-block{
            /* background-color: green; */
            width:40%;
            flex-grow: 0;
            padding:0 30px;
        }
        .item-content__detailed-block{
            /* background-color: red; */
            width:50%;
            flex-grow:1;
            padding:20px 0 20px 50px;
        }
    }

    @media (min-width:1600px){
        *{
            --font-base:24px
        }
        .item-content__header{
            padding:15px 0; 
        }

        .item-content__img{
            max-height: 275px;
        }
        .item-content__footer{
            padding-top:10px;
        }
        .item-content__setting-header{
            padding:40px 0 0 0;
        }
        .item-content__general-block{
            /* background-color: green; */
            height:550px;
            width:40%;
            flex-grow: 0;
            padding:0 30px;
        }
    }

    @media (min-width:1920px){
        *{
            --font-base:29px
        }
        .item-content__header{
            padding:15px 0;
        }
        .item-content__img{
            max-height: 305px;
        }
          .item-content__setting-header{
            padding:40px 0 0 0;
        }
        .item-content__setting-text{
            padding-top: 5px;
        }
        .item-content__general-block{
            /* background-color: green; */
            height:600px;
            width:40%;
            flex-grow: 0;
            padding:0 30px;
        }
    }
</style>