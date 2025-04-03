const vases = {
    id:1,
    name:"Вазоны",
    routeName:"vases",
    empty:false,
    bgImage:"/general/catalogue/vases.png",
    description:["Для обустройства территории возле офиса, улиц и площадей идеально подходят бетонные вазоны. Мы предлагаем долговечные и лаконичные цветочницы, конструкция которых обеспечивает достаточную вентиляцию для почвы: для отвода лишней жидкости на дне предусмотрены дренажные отверстия. Крупные и объемные вазоны могут быть использованы для зонирования территории, ограждения проезда автомобилей, ограничения пешеходной зоны."],
    subcategories:[
        {
            name:"Вазоны бетонные",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Анна",
                    folderName:"anna",
                    defaultImg:"/catalogue/vases/anna/anna", 
                    description:[],
                    sizes:{
                        height:45,
                        diameter:58,
                        weight:127,
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
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
                    name:"София",
                    folderName:"sofia",
                    defaultImg:"/catalogue/vases/sofia/sofia",
                    description:[],
                    sizes:{
                        height:56.6,
                        diameter:54,
                        weight:130,
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
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
                    name:"Мария",
                    folderName:"maria",
                    defaultImg:"/catalogue/vases/maria/maria",
                    description:[],
                    sizes:{
                        height:40,
                        width:59,
                        lenght:59,
                        weight:123,
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
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
                    name:"Валентина",
                    folderName:"valentina",
                    defaultImg:"/catalogue/vases/valentina/valentina",
                    description:[],
                    sizes:{
                        height:60,
                        width:45,
                        lenght:45,
                        weight:127,
                    },
                    cost:{
                        "granite": 8000,
                        "marble": 10300,
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
                    name:"Дарина",
                    folderName:"darina",
                    defaultImg:"/catalogue/vases/darina/darina",
                    description:[],
                    sizes:{
                        height:40,
                        width:45,
                        lenght:100,
                        weight:153,
                    },
                    cost:{
                        "granite": 8900,
                        "marble": 11200,
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
                    name:"Лилия",
                    folderName:"lilia",
                    defaultImg:"/catalogue/vases/lilia/lilia",
                    description:[],
                    sizes:{
                        height:40,
                        exWidth:99,
                        inWidth:38,
                        lenght:43.5,
                        weight:164,
                    },
                    cost:{
                        "granite": 8500,
                        "marble": 10800,
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
                    name:"Виктория",
                    folderName:"victoria",
                    defaultImg:"/catalogue/vases/victoria/victoria",
                    description:[],
                    sizes:{
                        height:40,
                        width:45,
                        lenght:40,
                        weight:195,
                    },
                    cost:{
                        "granite": 8800,
                        "marble": 11000,
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
                    name:"Елена",
                    folderName:"elena",
                    defaultImg:"/catalogue/vases/elena/elena",
                    description:[],
                    sizes:{
                        height:60,
                        width:59,
                        lenght:59,
                        weight:171,
                    },
                    cost:{
                        "granite": 8900,
                        "marble": 11200,
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
                    name:"Ева",
                    folderName:"eva",
                    defaultImg:"/catalogue/vases/eva/eva",
                    description:[],
                    sizes:{
                        height:40,
                        exDiameter:76,
                        inDiameter:57,
                        weight:195,
                    },
                    cost:{
                        "smooth": 7500,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                            "smooth":"Гладкий бетон",
                        },
                    }
                },
            ]
        }
    ]
}

export {vases}