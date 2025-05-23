const benches = {
    id:2,
    name:"Парковые диваны и скамейки",
    routeName:"benches",
    empty:false,
    bgImage:"/general/catalogue/benches.png",
    description:'/catalogue/benches/benches-description/benches.md',
    subcategories:[
        {
            name:"Парковые диваны",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Пелагея (ширина 224 см)",
                    folderName:"pelageya-224",
                    folderPath:"/catalogue/benches/pelageya-224/",
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            width:224,
                            length:45,
                        }
                    },
                    cost:{
                        "pelageya-224-granite-rosewood": 22400,
                        "pelageya-224-granite-mahogany":22400,
                        "pelageya-224-marble-rosewood": 25000,
                        "pelageya-224-marble-mahogany": 25000
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Пелагея (ширина 174 см)",
                    folderName:"pelageya-174",
                    folderPath:"/catalogue/benches/pelageya-174/",                    
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            width:174,
                            length:45,
                        }
                    },
                    cost:{
                        "pelageya-174-granite-rosewood": 18000,
                        "pelageya-174-granite-mahogany":18000,
                        "pelageya-174-marble-rosewood": 20300,
                        "pelageya-174-marble-mahogany": 20300
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                
                {
                    name:"Валерия",
                    folderName:"valeria",
                    folderPath:"/catalogue/benches/valeria/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            width:172,
                            length:72,
                            weight:230,
                        }
                    },
                    cost:{
                        "valeria-granite-rosewood": 19200,
                        "valeria-granite-mahogany":19200,
                        "valeria-marble-rosewood": 21500,
                        "valeria-marble-mahogany": 21500,
                    },  
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Агата (ширина 174 см)",
                    folderName:"agata-174",
                    folderPath:"/catalogue/benches/agata-174/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            width:174,
                            length:72,
                            weight:190,
                        }
                    },
                    cost:{
                        "agata-174-granite-rosewood": 17400,
                        "agata-174-granite-mahogany":17400,
                        "agata-174-marble-rosewood": 19700,
                        "agata-174-marble-mahogany": 19700,
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Агата (ширина 224 см)",
                    folderName:"agata-224",
                    folderPath:"/catalogue/benches/agata-224/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            width:224,
                            length:72,
                        }
                    },
                    cost:{
                        "agata-224-granite-rosewood": 21900,
                        "agata-224-granite-mahogany":21900,
                        "agata-224-marble-rosewood": 24200,
                        "agata-224-marble-mahogany": 24200,
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Александра (со спинкой)",
                    folderName:"alexandra-back",
                    folderPath:"/catalogue/benches/alexandra-back/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:48,
                            width:190,
                            length:45,
                            weight:224,
                        }
                    },
                    cost:{
                        "alexandra-back-granite-rosewood": 14200,
                        "alexandra-back-granite-mahogany":14200,
                        "alexandra-back-marble-rosewood": 16300,
                        "alexandra-back-marble-mahogany": 16300,
                    },
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Павлина (со спинкой)",
                    folderName:"pavlina-back",
                    folderPath:"/catalogue/benches/pavlina-back/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:44,
                            width:210,
                            length:44.5,
                            weight:210,
                        }
                    },
                    cost:{
                        "pavlina-back-granite-rosewood": 16000,
                        "pavlina-back-granite-mahogany":16000,
                        "pavlina-back-marble-rosewood": 18000,
                        "pavlina-back-marble-mahogany": 18000,
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
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
                    folderPath:"/catalogue/benches/alexandra/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:48,
                            width:190,
                            length:45,
                            weight:210,
                        }
                    },
                    cost:{
                        "alexandra-granite-rosewood": 12300,
                        "alexandra-granite-mahogany":12300,
                        "alexandra-marble-rosewood": 14600,
                        "alexandra-marble-mahogany": 14600,
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Дина",
                    folderName:"dina",
                    folderPath:"/catalogue/benches/dina/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:45,
                            width:182,
                            length:58,
                            weight:167,
                        }
                    },
                    cost:{
                        "dina-granite-rosewood": 13500,
                        "dina-granite-mahogany":13500,
                        "dina-marble-rosewood": 15800,
                        "dina-marble-mahogany": 15800,
                    },   
                    colorable:false,
                    choosable:{
                        
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
                {
                    name:"Ада",
                    folderName:"ada",
                    folderPath:"/catalogue/benches/ada/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:44,
                            width:200,
                            length:50,
                            weight:300,
                        }
                    },
                    cost:{
                        "ada-granite-rosewood": 38800,
                        "ada-granite-mahogany":38800,
                        "ada-marble-rosewood": 40000,
                        "ada-marble-mahogany": 40000,
                    },
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                          
                    }
                },
                {
                    name:"Павлина",
                    folderName:"pavlina",
                    folderPath:"/catalogue/benches/pavlina/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:44,
                            width:210,
                            length:44.5,
                            weight:210,
                        }
                    },
                    cost:{
                        "pavlina-granite-rosewood": 15000,
                        "pavlina-granite-mahogany":15000,
                        "pavlina-marble-rosewood": 17000,
                        "pavlina-marble-mahogany": 17000,
                    },   
                    colorable:false,
                    choosable:{
                        types:{},
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                        woods:{
                            "rosewood":"Палисандр",
                            "mahogany":"Махагон"
                        },
                    }
                },
            ]
        }
    ]
}

export {benches}