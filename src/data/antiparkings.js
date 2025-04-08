const antiparkings = {
    id:4,
    name:"Антипарковочные элементы",
    routeName:"antiparking",
    empty:false,
    bgImage:"/general/catalogue/antiparkings.png",
    description:["Бетонные ограничители служат для обеспечения безопасного движения транспортных средств и перемещения пешеходов. Установка полусфер и столбиков возможна на любой поверхности, будь то газон, тротуарная плитка или асфальт. Мы изготавливаем ограничители как из мытого бетона (бетон с фактурой мраморной или гранитной крошки), так и бетона под покраску."],
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
                    cost:{
                        "hemiellipse-granite": 2200,
                        "hemiellipse-marble": 2700,
                        "hemiellipse-smooth-grey":1700,
                        "hemiellipse-smooth-red":1900,
                        "hemiellipse-smooth-yellow":1900
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
                            "yellow":"Жёлтый"
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
                        "hemisphere-smooth-grey":1700,
                        "hemisphere-smooth-red":1900,
                        "hemisphere-smooth-yellow":1900
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
                            "yellow":"Жёлтый"
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
                        "sphere-granite": 7000,
                        "sphere-marble": 8600,
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
                        "moscow-granite": 5000,
                        "moscow-marble": 6500,
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
                    name:"Антипарковочный столбик Стопхам",
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
                        "stopham-30-smooth-yellow":2000
                    },
                    choosable:{     
                        types:{},
                        woods:{},
                        materials:{
                            "smooth":"Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "stopham-30-smooth":{
                            "grey":"Не окрашенный",
                            "red":"Красный",
                            "yellow":"Жёлтый"
                        }
                    },
                },
                {
                    name:"Антипарковочный столбик Стопхам",
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
                        "stopham-50-smooth-yellow":3000
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "smooth":"Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "stopham-50-smooth":{
                            "grey":"Не окрашеный",
                            "red":"Красный",
                            "yellow":"Жёлтый"
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