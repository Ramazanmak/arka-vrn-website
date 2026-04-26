const fences = {
    id:7,
    name:"Бетонные заборы",
    routeName:"fences",
    empty:false,
    bgImage:"/general/catalogue/fences.png",
    description:'/catalogue/fences/fences-description/fences.md',
    subcategories:[
        {
            name:"Бетонные заборы",
            message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
            caution:"Временно не производим исполнения из мраморной крошки.",
            cardType:"short",
            items:[
                {
                    name:"Неаполь (верхняя панель)",
                    folderName:"naples-top",
                    folderPath:"/catalogue/fences/naples-top/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "naples-top-smooth-gray": 1000,
                        "naples-top-smooth-coloured": 1000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                          "smooth": "Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "naples-top-smooth":{
                            "gray":"Не окрашеный",
                            "coloured":"Окрашеный в ваш цвет",
                        }
                    },
                },
                {
                    name:"Неаполь (средняя панель)",
                    folderName:"naples-mid",
                    folderPath:"/catalogue/fences/naples-mid/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "naples-mid-smooth-gray": 1000,
                        "naples-mid-smooth-coloured": 1000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                          "smooth": "Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "naples-mid-smooth":{
                            "gray":"Не окрашеный",
                            "coloured":"Окрашеный в ваш цвет",
                        }
                    },
                },
                {
                    name:"Флоренция (верхняя панель)",
                    folderName:"florence-top",
                    folderPath:"/catalogue/fences/florence-top/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "florence-top-smooth-gray": 1000,
                        "florence-top-smooth-coloured": 1000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                          "smooth": "Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "florence-top-smooth":{
                            "gray":"Не окрашеный",
                            "coloured":"Окрашеный в ваш цвет",
                        }
                    },
                },
                {
                    name:"Флоренция (средняя панель)",
                    folderName:"florence-mid",
                    folderPath:"/catalogue/fences/florence-mid/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "florence-mid-smooth-gray": 1000,
                        "florence-mid-smooth-coloured": 1000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                          "smooth": "Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "florence-mid-smooth":{
                            "gray":"Не окрашеный",
                            "coloured":"Окрашеный в ваш цвет",
                        }
                    },
                },
                {
                    name:'Панель "Кирпич"',
                    folderName:"brick-panel",
                    folderPath:"/catalogue/fences/brick-panel/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "brick-panel-smooth-gray": 1000,
                        "brick-panel-smooth-coloured": 1000,
                    },
                    choosable:{
                        types:{},
                        woods:{},
                        materials:{
                          "smooth": "Гладкий бетон"
                        },
                    },
                    colorable:true,
                    colors:{
                        "brick-panel-smooth":{
                            "gray":"Не окрашеный",
                            "coloured":"Окрашеный в ваш цвет",
                        }
                    },
                },
            ],
        }
    ]
}


export {fences}

