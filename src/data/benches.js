const benches = {
    id:2,
    name:"Парковые диваны и скамейки",
    routeName:"benches",
    empty:false,
    bgImage:"/general/catalogue/benches.png",
    description:["Бетонные диваны и скамейки - одни из самых востребованных малых архитектурных форм. Они практичны и прочны, отличаются антивандальными свойствами. Прекрасным дополнением к скамейкам служат урны или вазоны, которые можно расположить по краям скамейки."],
    subcategories:[
        {
            name:"Парковые диваны",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Пелагея (длина 224 см)",
                    folderName:"pelageya-224",
                    defaultImg:"/catalogue/benches/pelageya-224/pelageya-224",
                    description:[],
                    sizes:{
                        height:90,
                        width:224,
                        lenght:45,
                    },
                    cost:{
                        "granite-rosewood": 22400,
                        "granite-mahogany":22400,
                        "marble-rosewood": 25000,
                        "marble-mahogany": 25000
                    },   
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Пелагея (длина 174 см)",
                    folderName:"pelageya-174",
                    defaultImg:"/catalogue/benches/pelageya-174/pelageya-174",                    
                    description:[],
                    sizes:{
                        height:90,
                        width:174,
                        lenght:45,
                    },
                    cost:{
                        "granite-rosewood": 18000,
                        "granite-mahogany":18000,
                        "marble-rosewood": 20300,
                        "marble-mahogany": 20300
                    },   
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Пелагея (длина 118 см)",
                    folderName:"pelageya-118",
                    defaultImg:"/catalogue/benches/pelageya-118/pelageya-118",                    
                    description:[],
                    sizes:{
                        height:90,
                        width:118,
                        lenght:45,
                    },
                    cost:{
                        "granite-rosewood": 15500,
                        "granite-mahogany":15500,
                        "marble-rosewood": 17300,
                        "marble-mahogany": 17300,
                    },   
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Валерия",
                    folderName:"valeria",
                    defaultImg:"/catalogue/benches/valeria/valeria", 
                    description:[],
                    sizes:{
                        height:90,
                        width:172,
                        lenght:72,
                        weight:230,
                    },
                    cost:{
                        "granite-rosewood": 19200,
                        "granite-mahogany":19200,
                        "marble-rosewood": 21500,
                        "marble-mahogany": 21500,
                    },  
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Агата",
                    folderName:"agata",
                    defaultImg:"/catalogue/benches/agata/agata", 
                    description:[],
                    sizes:{
                        height:90,
                        width:172,
                        lenght:72,
                        weight:190,
                    },
                    cost:{
                        "granite-rosewood": 16900,
                        "granite-mahogany":16900,
                        "marble-rosewood": 19200,
                        "marble-mahogany": 19200,
                    },   
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Александра (со спинкой)",
                    folderName:"alexandra-back",
                    defaultImg:"/catalogue/benches/alexandra-back/alexandra-back", 
                    description:[],
                    sizes:{
                        height:48,
                        width:190,
                        lenght:45,
                        weight:224,
                    },
                    cost:{
                        "granite-rosewood": 14200,
                        "granite-mahogany":14200,
                        "marble-rosewood": 16300,
                        "marble-mahogany": 16300,
                    },
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
            ]
        },
        {
            name:"Cкамейки",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Александра",
                    folderName:"alexandra",
                    defaultImg:"/catalogue/benches/alexandra/alexandra", 
                    description:[],
                    sizes:{
                        height:48,
                        width:190,
                        lenght:45,
                        weight:210,
                    },
                    cost:{
                        "granite-rosewood": 12300,
                        "granite-mahogany":12300,
                        "marble-rosewood": 14600,
                        "marble-mahogany": 14600,
                    },   
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Дина",
                    folderName:"dina",
                    defaultImg:"/catalogue/benches/dina/dina", 
                    description:[],
                    sizes:{
                        height:45,
                        width:182,
                        lenght:58,
                        weight:167,
                    },
                    cost:{
                        "granite-rosewood": 13500,
                        "granite-mahogany":13500,
                        "marble-rosewood": 15800,
                        "marble-mahogany": 15800,
                    },   
                    choosable:{
                        
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Ада",
                    folderName:"ada",
                    defaultImg:"/catalogue/benches/ada/ada", 
                    description:[],
                    sizes:{
                        height:44,
                        width:200,
                        lenght:50,
                        weight:300,
                    },
                    cost:{
                        "granite-rosewood": 38800,
                        "granite-mahogany":38800,
                        "marble-rosewood": 40000,
                        "marble-mahogany": 40000,
                    },
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Полисандр",
                            "mahogany":"Махагон"
                        },
                          
                    }
                },
            ]
        }
    ]
}

export {benches}