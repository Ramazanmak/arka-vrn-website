const vases = {
    id:1,
    name:"Вазоны",
    routeName:"vases",
    empty:false,
    bgImage:"/general/catalogue/vases.png",
    description:"Для обустройства территории возле офиса, улиц и площадей идеально подходят бетонные вазоны. Мы предлагаем долговечные и лаконичные цветочницы, конструкция которых обеспечивает достаточную вентиляцию для почвы: для отвода лишней жидкости на дне предусмотрены дренажные отверстия. Крупные и объемные вазоны могут быть использованы для зонирования территории, ограждения проезда автомобилей, ограничения пешеходной зоны.",
    subcategories:[
        {
            name:"Вазоны бетонные",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            items:[
                {
                    name:"Анна",
                    folderName:"anna",
                    defaultImg:"/catalogue/vases/anna/anna.png", 
                    description:[],
                    sizes:{
                        height:45,
                        diameter:58,
                        weight:127,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
                    }
                },
                {
                    name:"София",
                    folderName:"sofia",
                    defaultImg:"/catalogue/vases/sofia/sofia.png",
                    description:[],
                    sizes:{
                        height:56.6,
                        diameter:54,
                        weight:130,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
                    }
                },
                {
                    name:"Мария",
                    folderName:"maria",
                    defaultImg:"/catalogue/vases/maria/maria.png",
                    description:[],
                    sizes:{
                        height:40,
                        width:59,
                        lenght:59,
                        weight:123,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
                    }
                },
                {
                    name:"Валентина",
                    folderName:"valentina",
                    defaultImg:"/catalogue/vases/valentina/valentina.png",
                    description:[],
                    sizes:{
                        height:60,
                        width:45,
                        lenght:45,
                        weight:127,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
                    }
                },
                {
                    name:"Дарина",
                    folderName:"darina",
                    defaultImg:"/catalogue/vases/darina/darina.png",
                    description:[],
                    sizes:{
                        height:40,
                        width:45,
                        lenght:100,
                        weight:153,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8900,
                        "marble": 11200,
                    }
                },
                {
                    name:"Лилия",
                    folderName:"lilia",
                    defaultImg:"/catalogue/vases/lilia/lilia.png",
                    description:[],
                    sizes:{
                        height:40,
                        exWidth:99,
                        inWidth:38,
                        lenght:43.5,
                        weight:164,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8500,
                        "marble": 10800,
                    }
                },
                {
                    name:"Виктория",
                    folderName:"victoria",
                    defaultImg:"/catalogue/vases/victoria/victoria.png",
                    description:[],
                    sizes:{
                        height:40,
                        width:45,
                        lenght:40,
                        weight:195,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8800,
                        "marble": 11000,
                    }
                },
                {
                    name:"Елена",
                    folderName:"elena",
                    defaultImg:"/catalogue/vases/elena/elena.png",
                    description:[],
                    sizes:{
                        height:60,
                        width:59,
                        lenght:59,
                        weight:171,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite": 8900,
                        "marble": 11200,
                    }
                },
                {
                    name:"Ева",
                    folderName:"eva",
                    defaultImg:"/catalogue/vases/eva/eva.png",
                    description:[],
                    sizes:{
                        height:40,
                        exDiameter:76,
                        inDiameter:57,
                        weight:195,
                    },
                    types:{},
                    woods:{},
                    materials:{
                        "smooth":"Гладкий бетон",
                    },
                    cost:{
                        "smooth": 7500,
                    }
                },
            ]
        }
    ]
}

export {vases}