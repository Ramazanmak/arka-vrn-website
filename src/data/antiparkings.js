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
                    defaultImg:"/catalogue/antiparkings/hemiellipse/hemiellipse",
                    description:[],
                    sizes:{
                        height:29,
                        diameter:40,
                        weight:59,
                    },
                    cost:{
                        "granite": 2200,
                        "marble": 2700,
                        "smooth-grey":1700,
                        "smooth-red":1900,
                        "smooth-yellow":1900
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон"
                        },
                        colors:{
                            "grey":"Серый",
                            "red":"Красный",
                            "yellow":"Жёлтый"
                        },
                    }
                },
                {
                    name:"Антипарковочная полусфера 02",
                    folderName:"hemisphere",
                    defaultImg:"/catalogue/antiparkings/hemisphere/hemisphere",
                    description:[],
                    sizes:{
                        height:25,
                        diameter:50,
                        weight:77,
                    },
                    cost:{
                        "granite": 2200,
                        "marble": 2700,
                        "smooth-grey":1700,
                        "smooth-red":1900,
                        "smooth-yellow":1900
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                            "smooth":"Гладкий бетон"
                        },
                        colors:{
                            "grey":"Серый",
                            "red":"Красный",
                            "yellow":"Жёлтый"
                        },
                    }
                },
                
                {
                    name:"Шар антипарковочный",
                    folderName:"sphere",
                    defaultImg:"/catalogue/antiparkings/sphere/sphere",
                    description:[],
                    sizes:{
                        height:55,
                        diameter:50,
                        weight:178,
                    },
                    cost:{
                        "granite": 7000,
                        "marble": 8600,
                    },
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
                    defaultImg:`/catalogue/antiparkings/moscow/moscow`,
                    description:[],
                    sizes:{
                        height:60,
                        width:29.5,
                        length:29.5,
                        weight:90,
                    },
                    cost:{
                        "granite": 5000,
                        "marble": 6500,
                    },
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
                    defaultImg:"/catalogue/antiparkings/stopham-30/stopham-30",
                    description:[],
                    sizes:{
                        height:30,
                        diameter:35,
                        weight:69,
                    },
                    cost:{
                        "smooth-grey":1800,
                        "smooth-red":2000,
                        "smooth-yellow":2000
                    },
                    choosable:{     
                        types:{},
                        woods:{},
                        materials:{
                            "smooth":"Гладкий бетон"
                        },
                        colors:{
                            "grey":"Серый",
                            "red":"Красный",
                            "yellow":"Жёлтый"
                        },
                        
                    }
                },
                {
                    name:"Антипарковочный столбик Стопхам",
                    folderName:"stopham-50",
                    defaultImg:"/catalogue/antiparkings/stopham-50/stopham-50",
                    description:[],
                    sizes:{
                        height:50,
                        diameter:35,
                        weight:115,
                    },
                    cost:{
                        "smooth-grey":2800,
                        "smooth-red":3000,
                        "smooth-yellow":3000
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "smooth":"Гладкий бетон"
                        },
                        colors:{
                            "grey":"Серый",
                            "red":"Красный",
                            "yellow":"Жёлтый"
                        },
                    }
                },
            ]
        }
    ]
}


export {antiparkings}