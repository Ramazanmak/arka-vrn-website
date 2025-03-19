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
                    img:"/catalogue/antiparkings/hemiellipse-stone.png",
                    description:"Парковочная полусфера из мытого бетона",
                    sizes:{
                        height:29,
                        diameter:40,
                        weight:59,
                    },
                    cost:{
                        "Гранитная крошка": 2000,
                        "Мраморная крошка": 2500,
                    }
                },
                {
                    name:"Антипарковочная полусфера 02",
                    img:"/catalogue/antiparkings/hemisphere-stone.png",
                    description:"Парковочная полусфера из мытого бетона",
                    sizes:{
                        height:25,
                        diameter:50,
                        weight:77,
                    },
                    cost:{
                        "Гранитная крошка": 2000,
                        "Мраморная крошка": 2500,
                    }
                },
                {
                    name:"Антипарковочная полусфера 01",
                    img:"/catalogue/antiparkings/hemiellipse.png",
                    description:"Парковочная полусфера из гладкого бетона",
                    sizes:{
                        height:30,
                        diameter:40,
                    },
                    cost:{
                        "Серый бетон": 1500,
                        "В цвете": 1700,
                    }
                },
                {
                    name:"Антипарковочная полусфера 02",
                    img:"/catalogue/antiparkings/hemisphere.png",
                    description:"Парковочная полусфера из гладкого бетона",
                    sizes:{
                        height:25,
                        diameter:50,
                    },
                    cost:{
                        "Серый бетон": 1500,
                        "В цвете": 1700,
                    }
                },
                {
                    name:"Шар антипарковочный",
                    img:"/catalogue/antiparkings/sphere.png",
                    description:"Парковочный шар из мытого бетона",
                    sizes:{
                        height:55,
                        diameter:50,
                        weight:178,
                    },
                    cost:{
                        "Гранитная крошка": 7000,
                        "Мраморная крошка": 8600,
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
                    img:"/catalogue/antiparkings/moskow.png",
                    description:"Парковочный столбик из мытого бетона",
                    sizes:{
                        height:60,
                        width:29.5,
                        length:29.5,
                        weight:90,
                    },
                    cost:{
                        "Гранитная крошка": 5000,
                        "Мраморная крошка": 6500,
                    }
                },
                {
                    name:"Антипарковочный столбик Стопхам",
                    img:"/catalogue/antiparkings/stopham-30.png",
                    description:"Парковочный столбик из гладкого бетона",
                    sizes:{
                        height:30,
                        diameter:35,
                        weight:69,
                    },
                    cost:{
                        "Серый бетон": 1800,
                        "В цвете": 2000,
                    }
                },
                {
                    name:"Антипарковочный столбик Стопхам",
                    img:"/catalogue/antiparkings/stopham-50.png",
                    description:"Парковочный столбик из гладкого бетона",
                    sizes:{
                        height:50,
                        diameter:35,
                        weight:115,
                    },
                    cost:{
                        "Серый бетон": 2800,
                        "В цвете": 3000,
                    }
                },
            ]
        }
    ]
}


export {antiparkings}