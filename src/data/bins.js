
const bins = {
    id:3,
    name:"Урны",
    routeName:"bins",
    empty:false,
    bgImage:"/general/catalogue/bins.png",
    description:'/catalogue/bins/bins-description/bins.md',
    subcategories:[
        {
            name:"Урны",
            message:"Временно не производим исполнения из мраморной крошки.",
            caution:[],
            cardType:"short",
            items:[
                {
                    name:"Римма",
                    folderName:"rimma",
                    folderPath:"/catalogue/bins/rimma/",
                    description:[],
                    sizes:{
                        "default":{
                            height:55,
                            width:47,
                            length:42,
                            weight:65,
                        }
                    },
                    cost:{
                        "rimma-granite-rosewood": 11000,
                        "rimma-marble-rosewood": 13200,
                    },
                    colorable:false,
                    choosable:{
                        types:{},
                        woods:{
                            "rosewood":"Палисандр",
                        },
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                    }
                },
                {
                    name:"Валентина",
                    folderName:"valentina",
                    description:["Урна из мытого бетона"],
                    folderPath:"/catalogue/bins/valentina/",
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
                        woods:{ },
                        materials:{
                            "granite":"Гранитная крошка",
                            "marble":"Мраморная крошка",
                        },
                    }
                },
                {
                    name:"Металлическая вставка",
                    folderName:"metal",
                    folderPath:"/catalogue/bins/metal/",
                    description:[],
                    sizes:{
                        "default":{
                            height:45,
                            width:38,
                            length:38,
                        }
                    },
                    cost:{
                        "metal-metal": 2300,
                    },
                    colorable:false,
                    choosable:{
                        types:{},
                        woods:{ },
                        materials:{
                            "metal":"Металл",
                        },
                    }
                }
            ]
        }
    ]
}

export {bins}