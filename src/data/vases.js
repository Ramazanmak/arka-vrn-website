const vases = {
    id:1,
    name:"Вазоны",
    routeName:"vases",
    empty:false,
    bgImage:"/general/catalogue/vases.png",
    description:"Для обустройства территории возле офиса, улиц и площадей идеально подходят бетонные вазоны. Мы предлагаем долговечные и лаконичные цветочницы, конструкция которых обеспечивает достаточную вентиляцию для почвы: для отвода лишней жидкости на дне предусмотрены дренажные отверстия. Крупные и объемные вазоны могут быть использованы для зонирования территории, ограждения проезда автомобилей, ограничения пешеходной зоны.",
    subcategories:[
        {
            name:"Вазоны",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            items:[
                {
                    name:"Анна",
                    img:"/catalogue/vases/anna.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:45,
                        diameter:58,
                        weight:127,
                    },
                    cost:{
                        "Гранитная крошка": 8000,
                        "Мраморная крошка": 10300,
                    }
                },
                {
                    name:"София",
                    img:"/catalogue/vases/sofia.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:56.6,
                        diameter:54,
                        weight:130,
                    },
                    cost:{
                        "Гранитная крошка": 8000,
                        "Мраморная крошка": 10300,
                    }
                },
                {
                    name:"Мария",
                    img:"/catalogue/vases/maria.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:40,
                        width:59,
                        lenght:59,
                        weight:123,
                    },
                    cost:{
                        "Гранитная крошка": 8000,
                        "Мраморная крошка": 10300,
                    }
                },
                {
                    name:"Валентина",
                    img:"/catalogue/vases/valentina.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:60,
                        width:45,
                        lenght:45,
                        weight:127,
                    },
                    cost:{
                        "Гранитная крошка": 8000,
                        "Мраморная крошка": 10300,
                    }
                },
                {
                    name:"Дарина",
                    img:"/catalogue/vases/darina.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:40,
                        width:45,
                        lenght:100,
                        weight:153,
                    },
                    cost:{
                        "Гранитная крошка": 8900,
                        "Мраморная крошка": 11200,
                    }
                },
                {
                    name:"Лилия",
                    img:"/catalogue/vases/lilia.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:40,
                        exWidth:99,
                        inWidth:38,
                        lenght:43.5,
                        weight:164,
                    },
                    cost:{
                        "Гранитная крошка": 8500,
                        "Мраморная крошка": 10800,
                    }
                },
                {
                    name:"Виктория",
                    img:"/catalogue/vases/victoria.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:40,
                        width:45,
                        lenght:40,
                        weight:195,
                    },
                    cost:{
                        "Гранитная крошка": 8800,
                        "Мраморная крошка": 11000,
                    }
                },
                {
                    name:"Елена",
                    img:"/catalogue/vases/elena.png",
                    description:"Вазон из мытого бетона",
                    sizes:{
                        height:60,
                        width:59,
                        lenght:59,
                        weight:171,
                    },
                    cost:{
                        "Гранитная крошка": 8900,
                        "Мраморная крошка": 11200,
                    }
                },
                {
                    name:"Ева",
                    img:"/catalogue/vases/eva.png",
                    description:"Вазон из гладкого бетона",
                    sizes:{
                        height:40,
                        exDiameter:76,
                        inDiameter:57,
                        weight:195,
                    },
                    cost:{
                        "default": 7500,
                    }
                },
            ]
        }
    ]
}

export {vases}