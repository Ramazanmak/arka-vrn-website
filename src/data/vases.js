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
                    folderPath:"/catalogue/vases/anna/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:45,
                            diameter:58,
                            weight:127,
                        }
                    },
                    cost:{
                        "anna-granite": 8000,
                        "anna-marble": 10300,
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
                    name:"София",
                    folderName:"sofia",
                    folderPath:"/catalogue/vases/sofia/",
                    description:[],
                    sizes:{
                        "default":{
                            height:56.6,
                            diameter:54,
                            weight:130,
                        }
                    },
                    cost:{
                        "sofia-granite": 8000,
                        "sofia-marble": 10300,
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
                    name:"Мария",
                    folderName:"maria",
                    folderPath:"/catalogue/vases/maria/",
                    description:[],
                    sizes:{
                        "default":{
                            height:40,
                            width:59,
                            length:59,
                            weight:123,
                        }
                    },
                    cost:{
                        "maria-granite": 8000,
                        "maria-marble": 10300,
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
                    name:"Валентина",
                    folderName:"valentina",
                    folderPath:"/catalogue/vases/valentina/",
                    description:[],
                    sizes:{
                        "default":{
                            height:60,
                            width:45,
                            length:45,
                            weight:127,
                        }
                    },
                    cost:{
                        "valentina-granite": 8000,
                        "valentina-marble": 10300,
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
                    name:"Дарина",
                    folderName:"darina",
                    folderPath:"/catalogue/vases/darina/",
                    description:[],
                    sizes:{
                        "default":{
                            height:40,
                            width:45,
                            length:100,
                            weight:153,
                        }
                    },
                    cost:{
                        "darina-granite": 8900,
                        "darina-marble": 11200,
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
                    name:"Лилия",
                    folderName:"lilia",
                    folderPath:"/catalogue/vases/lilia/",
                    description:[],
                    sizes:{
                        "default":{
                            height:40,
                            exWidth:99,
                            inWidth:38,
                            length:43.5,
                            weight:164,
                        }
                    },
                    cost:{
                        "lilia-granite": 8500,
                        "lilia-marble": 10800,
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
                    name:"Виктория",
                    folderName:"victoria",
                    folderPath:"/catalogue/vases/victoria/",
                    description:[],
                    sizes:{
                        "default":{
                            height:40,
                            width:45,
                            length:40,
                            weight:195,
                        }
                    },
                    cost:{
                        "victoria-granite": 8800,
                        "victoria-marble": 11000,
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
                    name:"Елена",
                    folderName:"elena",
                    folderPath:"/catalogue/vases/elena/",
                    description:[],
                    sizes:{
                        "default":{
                            height:60,
                            width:59,
                            length:59,
                            weight:171,
                        }
                    },
                    cost:{
                        "elena-granite": 8900,
                        "elena-marble": 11200,
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
                    name:"Ева",
                    folderName:"eva",
                    folderPath:"/catalogue/vases/eva/",
                    description:[],
                    sizes:{
                        "default":{
                            height:40,
                            exDiameter:76,
                            inDiameter:57,
                            weight:195,
                        }
                    },
                    cost:{
                        "eva-smooth": 7500,
                    },
                    colorable:false,
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