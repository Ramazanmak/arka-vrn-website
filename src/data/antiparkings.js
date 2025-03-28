const antiparkings = {
    id:4,
    name:"Антипарковочные элементы",
    routeName:"antiparking",
    empty:false,
    bgImage:"/general/catalogue/antiparkings.png",
    description:"Бетонные ограничители служат для обеспечения безопасного движения транспортных средств и перемещения пешеходов. Установка полусфер и столбиков возможна на любой поверхности, будь то газон, тротуарная плитка или асфальт. Мы изготавливаем ограничители как из мытого бетона (бетон с фактурой мраморной или гранитной крошки), так и бетона под покраску.",
    subcategories:[
        {
            name:"Антипарковочные полусферы",
            message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            items:[
                {
                    name:"Антипарковочная полусфера 01",
                    folderName:"hemiellipse",
                    defaultImg:"/catalogue/antiparkings/hemiellipse/hemiellipse.png",
                    description:[],
                    sizes:{
                        height:29,
                        diameter:40,
                        weight:59,
                    },
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
                    cost:{
                        "granite": 2000,
                        "marble": 2500,
                        "smooth-grey":1500,
                        "smooth-red":1700,
                        "smooth-yellow":1700
                    }
                },
                {
                    name:"Антипарковочная полусфера 02",
                    folderName:"hemisphere",
                    defaultImg:"/catalogue/antiparkings/hemisphere/hemisphere.png",
                    description:[],
                    sizes:{
                        height:25,
                        diameter:50,
                        weight:77,
                    },
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
                    cost:{
                        "granite": 2000,
                        "marble": 2500,
                        "smooth-grey":1500,
                        "smooth-red":1700,
                        "smooth-yellow":1700
                    }
                },
                
                {
                    name:"Шар антипарковочный",
                    folderName:"sphere",
                    defaultImg:"/catalogue/antiparkings/sphere/sphere.png",
                    description:[],
                    sizes:{
                        height:55,
                        diameter:50,
                        weight:178,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 7000,
                        "marble": 8600,
                    }
                },
            ],
        },
        {
            name:"Антипарковочные столбики",
            message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            items:[
                {
                    name:"Антипарковочный столбик Москва",
                    folderName:"moscow",
                    defaultImg:`/catalogue/antiparkings/moscow/moscow.png`,
                    description:[],
                    sizes:{
                        height:60,
                        width:29.5,
                        length:29.5,
                        weight:90,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 5000,
                        "marble": 6500,
                    }
                },
                {
                    name:"Антипарковочный столбик Стопхам",
                    folderName:"stopham-30",
                    defaultImg:"/catalogue/antiparkings/stopham-30/stopham-30.png",
                    description:[],
                    sizes:{
                        height:30,
                        diameter:35,
                        weight:69,
                    },
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
                    cost:{
                        "smooth-grey":1800,
                        "smooth-red":2000,
                        "smooth-yellow":2000
                    }
                },
                {
                    name:"Антипарковочный столбик Стопхам",
                    folderName:"stopham-50",
                    defaultImg:"/catalogue/antiparkings/stopham-50/stopham-50.png",
                    description:[],
                    sizes:{
                        height:50,
                        diameter:35,
                        weight:115,
                    },
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
                    cost:{
                        "smooth-grey":2800,
                        "smooth-red":3000,
                        "smooth-yellow":3000
                    }
                },
            ]
        }
    ]
}


export {antiparkings}