<script setup>

import {ref, computed, watchEffect, watchSyncEffect} from 'vue';

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
    sizeVariants:'Варианты размеров',
    description:'Описание',
    cost:'Цена',
    types:'Типы',
    materials:'Основной материал',
    woods:'Порода древесины',
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
    materials:"",
    woods:"",
    sizeVariants:""
});

const chosenColors = ref("");


const isColorsAllowed = computed(() => {
    const firstCondition = props.itemProps.colorable;
    const secondCondition = (chosenPropsValues.value["materials"] !== 'granite');
    const thirdCondition = (chosenPropsValues.value["materials"] !== 'marble');
    const result = firstCondition && secondCondition && thirdCondition
    return result
})

// Установка начальных значений цены и изображения
const preConfigurationId= ref(props.itemProps.folderName)

const configurationId = computed(()=>{
    if (chosenColors.value == ""){
        return preConfigurationId.value
    }
    return preConfigurationId.value + '-' + chosenColors.value;
})

const imgPath = computed(() => {
    return props.itemProps.folderPath + configurationId.value
})

// Установка начального значения выбираемых параметров

watchEffect(() =>{

    Object.keys(chosenPropsValues.value).forEach((el) =>{
        const choosable = props.itemProps.choosable;
        if (Object.keys(choosable).includes(el)){
            chosenPropsValues.value[el] = Object.keys(choosable[el])[0];
        } else {
            chosenPropsValues.value[el] = "";
        }
    })
})



watchEffect(() => {
    preConfigurationId.value=props.itemProps.folderName

    Object.values(chosenPropsValues.value).forEach((value) => {
        if(value != "" && value != undefined){
            preConfigurationId.value = preConfigurationId.value + '-' + value
        }
    })
})


watchEffect(() => {
    if (isColorsAllowed.value){
        chosenColors.value = Object.keys(props.itemProps.colors[preConfigurationId.value])[0];
    }
})

function makeChoice(optionName,parName){
    chosenPropsValues.value[parName] = optionName
    console.log(configurationId.value)
}
function makeColorChoice(optionName){
    chosenColors.value = optionName
    console.log(configurationId.value)
}



watchEffect(() => {
    if (!isColorsAllowed.value){
        chosenColors.value = "";
    }
})


</script>

<template>
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
                <h4 class="item-content__header"> {{ itemProps.name }} </h4>
                <div class="item-content__cost-block">
                    <div class="item-content__footer">
        
                        <button class="item-content__add-button">
                            + 
                        </button>
                        <p class="item-content__cost">
                            {{ itemProps.cost[configurationId]}} &#8381
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
                    <h5 class="item-content__setting-header"> Размеры </h5>
                    <li class="item-content__setting-option"
                        v-for="(sizeValue,sizeName) in (itemProps.sizes[configurationId] || itemProps.sizes[`default`])">

                        <p class="item-content__setting-text">
                            {{ namesOfProps[sizeName] }}: {{ sizeValue }}
                             {{ unitsOfProps[sizeName] }}  &nbsp
                        </p>
                    </li>
                </ul>


            </div>

                

            <!-- Здесь описание параметров, выбираемых пользователем -->
            <template v-for="(parValue,parName) in itemProps.choosable">
                <ul
                    v-if="Object.keys(parValue).length > 0"
                    class="item-content__setting"
                    >
                    <h5 class="item-content__setting-header"> 
                        {{ namesOfProps[parName] }}
                    </h5>
    
                    <li 
                        v-for="(optionValue, optionName) in parValue" 
                        class="item-content__setting-option"
                        @click="makeChoice(optionName,parName)">
                        <input  
                            type="radio" 
                            :value="optionName"
                            v-model="chosenPropsValues[parName]"
                            class="item-content__radio"
                            @click.stop
                        >
                        <label class="item-content__setting-text"> 
                            {{ optionValue }}
                        </label>
                    </li>
    
                </ul>
            </template>

            <!-- Здесь описание цветов -->
            <template v-if="isColorsAllowed">
                <ul
                    v-if="Object.keys(itemProps['colors']).length > 0"
                    class="item-content__setting"
                    >

                    <h5 class="item-content__setting-header"> 
                        {{ namesOfProps['colors'] }}
                    </h5>
                    
                    <li
                        v-for="(optionValue, optionName) in itemProps.colors[preConfigurationId]" 
                        class="item-content__setting-option"
                        @click="makeColorChoice(optionName)">

                        <input  
                            type="radio" 
                            :value="optionName"
                            v-model="chosenColors"
                            class="item-content__radio"
                            @click.stop
                        >
                        <label class="item-content__setting-text"> 
                            {{ optionValue }}
                        </label>
                    </li>
                </ul>
            </template>



            <!-- Описание словесное -->
            <template v-if="itemProps.description.length > 0" >
                <h5 class="item-content__setting-header"> Описание</h5>
                <ul class="item-content__description">
    
                    <li class="item-content__description-point"
                        v-for="point in itemProps.description">
                        <p class="item-content__setting-text">
                            {{ point }}
                        </p>
                    </li>
    
                </ul>
            </template>


            
        </div>
</template>

<style scoped>
    *{
        --font-base:15px;
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
        max-height:220px;

    }

    .item-content__main-info{
        flex-grow:0;
        padding: 15px 10px;
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
        font-size:calc(var(--font-base) + 3px);
        font-weight:600;
        color:var(--contacts-bg-color) ;
        transition-duration:0.4s;

    }

      /* Настройка подвала карточки */


      .item-content__footer{
        display: flex;
        flex-direction:row;
        justify-content:space-between;
        align-items: center;
    }

    .item-content__cost{
        flex-grow: 1;
        padding-left:20px;
        margin:0;
        font-weight:500;
        font-size:calc(var(--font-base) + 3px);
        color:var(--second-main-color);
        text-align: left;
    }

    .item-content__add-button{
        font-size:calc(var(--font-base) + 3px);
        height:1.3em;
        width:1.3em;
        background-color: var(--contacts-bg-color);
        border:none;
        border-radius:5px;
        color:#fff;
        transition: 0.2s;
        flex-grow: 0;
    }

    .item-content__add-button:hover{
        background-color: var(--second-main-color);
    }

    /* БЛОК С ПОДРОБНЫМИ НАСТРОЙКАМИ */
    .item-content__detailed-block{
        padding:20px 10px;
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
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
        font-size:calc(var(--font-base) - 1px);
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
            --font-base:19px
        }
        .item-content{
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            width:100%;
            max-width: none;
        }
      
        .item-content__general-block{
            height:450px;
            width:45%;
            flex-grow: 0;
            padding-right:30px;
            border-bottom:none;
            border-right:1px solid var(--contacts-bg-color)
        }
        .item-content__detailed-block{
            /* background-color: red; */
            max-height: 450px   ;
            overflow: scroll;
            scrollbar-width: none;
            width:50%;
            flex-grow:1;
            padding-left:30px;
        }
    }

    @media (min-width:1440px){
        *{
            --font-base:23px
        }
        .item-content__setting-header{
            padding:25px 0 0 0;
        }

        .item-content__general-block{
            /* background-color: green; */
            width:45%;
            flex-grow: 0;
            padding:0 30px;
        }
        .item-content__detailed-block{
            /* background-color: red; */
            width:45%;
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
            height:550px;
            padding:0 30px;
        }
        
        .item-content__detailed-block{
            max-height:550px;
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
            height:600px;
            padding:0 30px;
        }
        .item-content__detailed-block{
            max-height:600px;
        }
    }
</style>