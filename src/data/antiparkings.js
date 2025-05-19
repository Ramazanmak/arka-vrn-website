const antiparkings = {
    id:4,
    name:"Антипарковочные элементы",
    routeName:"antiparking",
    empty:false,
    bgImage:"/general/catalogue/antiparkings.png",
    description:'/catalogue/antiparkings/antiparkings-description/antiparkings.md',
    subcategories:[
        {
            name:"Антипарковочные полусферы",
            message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Антипарковочная полусфера 01",
                    folderName:"hemiellipse",
                    folderPath:"/catalogue/antiparkings/hemiellipse/",
                    description:[],
                    sizes:{
                        "default":{
                            height:29,
                            diameter:40,
                            weight:59,
                        }
                    },
                    _cost: {
                        "hemiellipse-granite": 2200,
                        "hemiellipse-marble": 2700,
                        "hemiellipse-smooth-grey": 1500,
                        "hemiellipse-smooth-red": 1700,
                        "hemiellipse-smooth-yellow": 1700,
                        "hemiellipse-smooth-white":1700
                    },
                    get cost() {
                        return this._cost
                    },
                    set cost(value) {
                        this._cost = value
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "hemiellipse-smooth":{
                            "grey":"Не окрашеный",
                            "red":"Красный",
                            "yellow":"Жёлтый",
                            "white":"Белый"
                        }
                    },
                },
                {
                    name:"Антипарковочная полусфера 02",
                    folderName:"hemisphere",
                    folderPath:"/catalogue/antiparkings/hemisphere/",
                    description:[],
                    sizes:{
                        "default":{
                            height:25,
                            diameter:50,
                            weight:77,
                        }
                    },
                    cost:{
                        "hemisphere-granite": 2200,
                        "hemisphere-marble": 2700,
                        "hemisphere-smooth-grey":1500,
                        "hemisphere-smooth-red":1700,
                        "hemisphere-smooth-yellow":1700,
                        "hemisphere-smooth-white":1700
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "hemisphere-smooth":{
                            "grey":"Не окрашеный",
                            "red":"Красный",
                            "yellow":"Жёлтый",
                            "white":"Белый",
                        }

                    },
                },
                
                {
                    name:"Шар антипарковочный",
                    folderName:"sphere",
                    folderPath:"/catalogue/antiparkings/sphere/",
                    description:[],
                    sizes:{
                        "default":{
                            height:55,
                            diameter:50,
                            weight:178,
                        }
                    },
                    cost:{
                        "sphere-granite": 7200,
                        "sphere-marble": 8800,
                    },
                    colorable:false,
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                    }
                },
            ],
        },
        {
            name:"Антипарковочные столбики",
            message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Антипарковочный столбик Москва",
                    folderName:"moscow",
                    folderPath:`/catalogue/antiparkings/moscow/`,
                    description:[
                    ],
                    sizes:{
                        "default":{
                            height:60,
                            width:29.5,
                            length:29.5,
                            weight:90,
                        }
                    },
                    cost:{
                        "moscow-granite": 5500,
                        "moscow-marble": 7000,
                    },
                    colorable:false,
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                    }
                },
                {
                    name:"Антипарковочный столбик 'Стопхам' (30см)",
                    folderName:"stopham-30",
                    folderPath:"/catalogue/antiparkings/stopham-30/",
                    description:[],
                    sizes:{
                        "default":{
                            height:30,
                            diameter:35,
                            weight:69,
                        }
                    },
                    cost:{
                        "stopham-30-smooth-grey":1800,
                        "stopham-30-smooth-red":2000,
                        "stopham-30-smooth-yellow":2000,
                        "stopham-30-smooth-white":2000,
                        "stopham-30-granite":1800,
                        "stopham-30-marble":2000,
                    },
                    choosable:{     
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "stopham-30-smooth":{
                            "grey":"Не окрашенный",
                            "red":"Красный",
                            "yellow":"Жёлтый",
                            "white":"Белый"
                        }
                    },
                },
                {
                    name:"Антипарковочный столбик 'Стопхам' (50см)",
                    folderName:"stopham-50",
                    folderPath:"/catalogue/antiparkings/stopham-50/",
                    description:[],
                    sizes:{
                        "default":{
                            height:50,
                            diameter:35,
                            weight:115,
                        }
                    },

                    cost:{
                        "stopham-50-smooth-grey":2800,
                        "stopham-50-smooth-red":3000,
                        "stopham-50-smooth-yellow":3000,
                        "stopham-50-smooth-white":3000,
                        "stopham-50-granite":2800,
                        "stopham-50-marble":3000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "stopham-50-smooth":{
                            "grey":"Не окрашеный",
                            "red":"Красный",
                            "yellow":"Жёлтый",
                            "white":"Белый"
                        }
                    },
                },
                {
                    name:"Антипарковочный столбик 'Стопхам' (75см)",
                    folderName:"stopham-75",
                    folderPath:"/catalogue/antiparkings/stopham-75/",
                    description:[],
                    sizes:{
                        "default":{
                            height:75,
                            diameter:35,
                            weight:161,
                        }
                    },

                    cost:{
                        "stopham-75-smooth-grey":3800,
                        "stopham-75-smooth-red":4000,
                        "stopham-75-smooth-yellow":4000,
                        "stopham-75-smooth-white":4000,
                        "stopham-75-granite":3800,
                        "stopham-75-marble":4000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон",
                        },
                    },
                    colorable:true,
                    colors:{
                        "stopham-75-smooth":{
                            "grey":"Не окрашеный",
                            "red":"Красный",
                            "yellow":"Жёлтый",
                            "white":"Белый"
                        }
                    },
                },
            ]
        }
    ]
}


export {antiparkings}



/*
    .subcategory-item-extended-wrapper{
        height:80vh;
        margin:60px auto;
        border-radius:10px;
        padding:30px 10px;
        max-width: 450px;
        border-top:2px solid var(--second-main-color);
        border-bottom:2px solid var(--second-main-color);
        box-shadow: 0 0 5px -2px var(--contacts-bg-color);      
        box-sizing: border-box;
        transition:0.4s;
    }
    .subcategory-item-extended{
        height:100%;
        overflow-y: scroll;
        scrollbar-width: none;
    }


    @media (min-width:560px){
        .item-content{
            padding:30px;
        }
    }

    @media (min-width: 1024px){
        .item-content{
            display: flex;
            flex-direction:row;
            justify-content: space-between;
            width:100%;
            max-width: none;
        }
    }
*/