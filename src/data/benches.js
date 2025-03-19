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
                    img:"/catalogue/benches/pelageya-224.png",
                    description:"Парковый диван из мытого бетона",
                    sizes:{
                        height:90,
                        width:224,
                        lenght:45,
                    },
                    cost:{
                        "Гранитная крошка": 22400,
                        "Мраморная крошка": 0,
                    }
                },
                {
                    name:"Пелагея (длина 174 см)",
                    img:"/catalogue/benches/pelageya-174.png",
                    description:"Парковый диван из мытого бетона",
                    sizes:{
                        height:90,
                        width:174,
                        lenght:45,
                    },
                    cost:{
                        "Гранитная крошка": 18000,
                        "Мраморная крошка": 20300,
                    }
                },
                {
                    name:"Пелагея (длина 118 см)",
                    img:"/catalogue/benches/pelageya-118.png",
                    description:"Парковый диван из мытого бетона",
                    sizes:{
                        height:90,
                        width:118,
                        lenght:45,
                    },
                    cost:{
                        "Гранитная крошка": 15500,
                        "Мраморная крошка": 0,
                    }
                },
                {
                    name:"Валерия",
                    img:"/catalogue/benches/valeria.png",
                    description:"Парковый диван из мытого бетона",
                    sizes:{
                        height:90,
                        width:172,
                        lenght:72,
                        weight:230,
                    },
                    cost:{
                        "Гранитная крошка": 19200,
                        "Мраморная крошка": 21500,
                    }
                },
                {
                    name:"Агата",
                    img:"/catalogue/benches/agata.png",
                    description:"Парковый диван из мытого бетона",
                    sizes:{
                        height:90,
                        width:172,
                        lenght:72,
                        weight:190,
                    },
                    cost:{
                        "Гранитная крошка": 16900,
                        "Мраморная крошка": 19200,
                    }
                },
                {
                    name:"Александра (со спинкой)",
                    img:"/catalogue/benches/alexandra-back.png",
                    description:"Парковый диван из мытого бетона",
                    sizes:{
                        height:48,
                        width:190,
                        lenght:45,
                        weight:224,
                    },
                    cost:{
                        "Гранитная крошка": 14200,
                        "Мраморная крошка":16300,
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
                    img:"/catalogue/benches/alexandra.png",
                    description:"Скамейка из мытого бетона",
                    sizes:{
                        height:48,
                        width:190,
                        lenght:45,
                        weight:210,
                    },
                    cost:{
                        "Гранитная крошка": 12300,
                        "Мраморная крошка": 14600,
                    }
                },
                {
                    name:"Дина",
                    img:"/catalogue/benches/dina.png",
                    description:"Скамейка из мытого бетона",
                    sizes:{
                        height:45,
                        width:182,
                        lenght:58,
                        weight:167,
                    },
                    cost:{
                        "Гранитная крошка": 13500,
                        "Мраморная крошка": 15800,
                    }
                },
                {
                    name:"Ада",
                    img:"/catalogue/benches/ada.png",
                    description:"Скамейка из мытого бетона",
                    sizes:{
                        height:44,
                        width:200,
                        lenght:50,
                        weight:300,
                    },
                    cost:{
                        "Гранитная крошка": 38800,
                        "Мраморная крошка": 40000,
                    }
                },
            ]
        }
    ]
}

export {benches}