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
                    name:"Неаполь",
                    folderName:"naples",
                    folderPath:"/catalogue/fences/naples/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "naples-smooth-gray": 1000,
                        "naples-smooth-coloured": 1000,
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
                        "naples-smooth":{
                            "gray":"Не окрашеный",
                            "coloured":"Окрашеный в ваш цвет",
                        }
                    },
                },
                {
                    name:"Флоренция",
                    folderName:"florence",
                    folderPath:"/catalogue/fences/florence/",
                    description:[],
                    sizes:{
                        "default":{
                            length:200,
                        }
                    },
                    cost: {
                        "florence-smooth-gray": 1000,
                        "florence-smooth-coloured": 1000,
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
                        "florence-smooth":{
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

