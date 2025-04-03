
const bins = {
    id:3,
    name:"Урны",
    routeName:"bins",
    empty:false,
    bgImage:"/general/catalogue/bins.png",
    description:["Бетон - это один из самых надежных материалов для изготовления урн. Мы предлагаем лаконичные бетонные урны, а так же урны, где комбинируется дерево и бетон. Наш ассортимент постоянно расширяется, но если вы не нашли нужную урну, то мы возьмем индивидуальный заказ на проектирование."],
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
                    defaultImg:"/catalogue/bins/rimma/rimma",
                    description:[],
                    sizes:{
                        height:55,
                        width:47,
                        lenght:42,
                        weight:65,
                    },
                    cost:{
                        "granite-rousewood": 11000,
                        "annmarble-rousewood": 13200,
                    },
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
                    description:"Урна из мытого бетона",
                    defaultImg:"/catalogue/bins/valentina/valentina",
                    sizes:{
                        height:60,
                        width:45,
                        lenght:45,
                        weight:127,
                    },
                    cost:{
                        "granite-rousewood": 11000,
                        "annmarble-rousewood": 13200,
                    },
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
                    defaultImg:"/catalogue/bins/metal/metal",
                    description:[],
                    sizes:{
                        height:45,
                        width:38,
                        lenght:38,
                    },
                    cost:{
                        "metal": 2300,
                    },
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