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
                    name:"Пелагея (длина 224 см)",
                    folderName:"pelageya-224",
                    folderPath:"/catalogue/benches/pelageya-224/",
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            length:224,
                            width:45,
                        }
                    },
                    cost:{
                        "pelageya-224-granite-rosewood": 23000,
                        "pelageya-224-granite-mahogany":23000,
                        "pelageya-224-marble-rosewood": 25300,
                        "pelageya-224-marble-mahogany": 25300
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
                    name:"Пелагея (длина 174 см)",
                    folderName:"pelageya-174",
                    folderPath:"/catalogue/benches/pelageya-174/",                    
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            length:174,
                            width:45,
                        }
                    },
                    cost:{
                        "pelageya-174-granite-rosewood": 18500,
                        "pelageya-174-granite-mahogany":18500,
                        "pelageya-174-marble-rosewood": 20800,
                        "pelageya-174-marble-mahogany": 20800
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
                            length:172,
                            width:72,
                            weight:230,
                        }
                    },
                    cost:{
                        "valeria-granite-rosewood": 19700,
                        "valeria-granite-mahogany":19700,
                        "valeria-marble-rosewood": 22000,
                        "valeria-marble-mahogany": 22000,
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
                    name:"Агата (длина 172 см)",
                    folderName:"agata-172",
                    folderPath:"/catalogue/benches/agata-172/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            length:172,
                            width:72,
                            weight:190,
                        }
                    },
                    cost:{
                        "agata-172-granite-rosewood": 17400,
                        "agata-172-granite-mahogany":17400,
                        "agata-172-marble-rosewood": 19700,
                        "agata-172-marble-mahogany": 19700,
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
                    name:"Агата (ширина 222 см)",
                    folderName:"agata-222",
                    folderPath:"/catalogue/benches/agata-222/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:90,
                            length:222,
                            width:72,
                        }
                    },
                    cost:{
                        "agata-222-granite-rosewood": 21900,
                        "agata-222-granite-mahogany":21900,
                        "agata-222-marble-rosewood": 24200,
                        "agata-222-marble-mahogany": 24200,
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
                            length:190,
                            width:45,
                            weight:224,
                        }
                    },
                    cost:{
                        "alexandra-back-granite-rosewood": 14700,
                        "alexandra-back-granite-mahogany":14700,
                        "alexandra-back-marble-rosewood": 16800,
                        "alexandra-back-marble-mahogany": 16800,
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
                            length:210,
                            width:44.5,
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
                            length:190,
                            width:45,
                            weight:210,
                        }
                    },
                    cost:{
                        "alexandra-granite-rosewood": 12800,
                        "alexandra-granite-mahogany":12800,
                        "alexandra-marble-rosewood": 15100,
                        "alexandra-marble-mahogany": 15100,
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
                            length:182,
                            width:58,
                            weight:167,
                        }
                    },
                    cost:{
                        "dina-granite-rosewood": 14000,
                        "dina-granite-mahogany":14000,
                        "dina-marble-rosewood": 16300,
                        "dina-marble-mahogany": 16300,
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
                            length:200,
                            width:50,
                            weight:300,
                        }
                    },
                    cost:{
                        "ada-granite-rosewood": 39500,
                        "ada-granite-mahogany":39500,
                        "ada-marble-rosewood": 41000,
                        "ada-marble-mahogany": 41000,
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
                            length:210,
                            width:44.5,
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