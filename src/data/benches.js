const benches = {
    id:2,
    name:"Парковые диваны и скамейки",
    routeName:"benches",
    empty:false,
    bgImage:"/general/catalogue/benches.png",
    description:"Бетонные диваны и скамейки - одни из самых востребованных малых архитектурных форм. Они практичны и прочны, отличаются антивандальными свойствами. Прекрасным дополнением к скамейкам служат урны или вазоны, которые можно расположить по краям скамейки.",
    subcategories:[
        {
            name:"Парковые диваны",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            items:[
                {
                    name:"Пелагея (длина 224 см)",
                    folderName:"pelageya-224",
                    defaultImg:"/catalogue/benches/pelageya-224/pelageya-224.png",
                    description:[],
                    sizes:{
                        height:90,
                        width:224,
                        lenght:45,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 22400,
                        "granite-mahogany":22400,
                        "marble-rosewood": 25000,
                        "marble-mahogany": 25000
                    }   
                },
                {
                    name:"Пелагея (длина 174 см)",
                    folderName:"pelageya-174",
                    defaultImg:"/catalogue/benches/pelageya-174/pelageya-174.png",                    
                    description:[],
                    sizes:{
                        height:90,
                        width:174,
                        lenght:45,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 18000,
                        "granite-mahogany":18000,
                        "marble-rosewood": 20300,
                        "marble-mahogany": 20300
                    }   
                },
                {
                    name:"Пелагея (длина 118 см)",
                    folderName:"pelageya-118",
                    defaultImg:"/catalogue/benches/pelageya-118/pelageya-118.png",                    
                    description:[],
                    sizes:{
                        height:90,
                        width:118,
                        lenght:45,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 15500,
                        "granite-mahogany":15500,
                        "marble-rosewood": 17300,
                        "marble-mahogany": 17300,
                    }   
                },
                {
                    name:"Валерия",
                    folderName:"valeria",
                    defaultImg:"/catalogue/benches/valeria/valeria.png", 
                    description:[],
                    sizes:{
                        height:90,
                        width:172,
                        lenght:72,
                        weight:230,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 19200,
                        "granite-mahogany":19200,
                        "marble-rosewood": 21500,
                        "marble-mahogany": 21500,
                    }   
                },
                {
                    name:"Агата",
                    folderName:"agata",
                    defaultImg:"/catalogue/benches/agata/agata.png", 
                    description:[],
                    sizes:{
                        height:90,
                        width:172,
                        lenght:72,
                        weight:190,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 16900,
                        "granite-mahogany":16900,
                        "marble-rosewood": 19200,
                        "marble-mahogany": 19200,
                    }   
                },
                {
                    name:"Александра (со спинкой)",
                    folderName:"alexandra-back",
                    defaultImg:"/catalogue/benches/alexandra-back/alexandra-back.png", 
                    description:[],
                    sizes:{
                        height:48,
                        width:190,
                        lenght:45,
                        weight:224,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 14200,
                        "granite-mahogany":14200,
                        "marble-rosewood": 16300,
                        "marble-mahogany": 16300,
                    }
                },
            ]
        },
        {
            name:"Cкамейки",
            message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            items:[
                {
                    name:"Александра",
                    folderName:"alexandra",
                    defaultImg:"/catalogue/benches/alexandra/alexandra.png", 
                    description:[],
                    sizes:{
                        height:48,
                        width:190,
                        lenght:45,
                        weight:210,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 12300,
                        "granite-mahogany":12300,
                        "marble-rosewood": 14600,
                        "marble-mahogany": 14600,
                    }   
                },
                {
                    name:"Дина",
                    folderName:"dina",
                    defaultImg:"/catalogue/benches/dina/dina.png", 
                    description:[],
                    sizes:{
                        height:45,
                        width:182,
                        lenght:58,
                        weight:167,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 13500,
                        "granite-mahogany":13500,
                        "marble-rosewood": 15800,
                        "marble-mahogany": 15800,
                    }   
                },
                {
                    name:"Ада",
                    folderName:"ada",
                    defaultImg:"/catalogue/benches/ada/ada.png", 
                    description:[],
                    sizes:{
                        height:44,
                        width:200,
                        lenght:50,
                        weight:300,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Полисандр",
                        "mahogany":"Махагон"
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rosewood": 38800,
                        "granite-mahogany":38800,
                        "marble-rosewood": 40000,
                        "marble-mahogany": 40000,
                    }   
                },
            ]
        }
    ]
}

export {benches}