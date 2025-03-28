
const bins = {
    id:3,
    name:"Урны",
    routeName:"bins",
    empty:false,
    bgImage:"/general/catalogue/bins.png",
    description:"Бетон - это один из самых надежных материалов для изготовления урн. Мы предлагаем лаконичные бетонные урны, а так же урны, где комбинируется дерево и бетон. Наш ассортимент постоянно расширяется, но если вы не нашли нужную урну, то мы возьмем индивидуальный заказ на проектирование.",
    subcategories:[
        {
            name:"Урны",
            message:"Временно не производим исполнения из мраморной крошки.",
            caution:[],
            items:[
                {
                    name:"Римма",
                    folderName:"rimma",
                    defaultImg:"/catalogue/bins/rimma/rimma.png",
                    description:[],
                    sizes:{
                        height:55,
                        width:47,
                        lenght:42,
                        weight:65,
                    },
                    types:{},
                    woods:{
                        "rosewood":"Палисандр",
                    },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rousewood": 11000,
                        "annmarble-rousewood": 13200,
                    }
                },
                {
                    name:"Валентина",
                    folderName:"valentina",
                    description:"Урна из мытого бетона",
                    defaultImg:"/catalogue/bins/valentina/valentina.png",
                    sizes:{
                        height:60,
                        width:45,
                        lenght:45,
                        weight:127,
                    },
                    types:{},
                    woods:{ },
                    materials:{
                        "granite":"Гранитная крошка",
                        "marble":"Мраморная крошка",
                    },
                    cost:{
                        "granite-rousewood": 11000,
                        "annmarble-rousewood": 13200,
                    }
                },
                {
                    name:"Металлическая вставка",
                    folderName:"metal",
                    defaultImg:"/catalogue/bins/metal/metal.png",
                    description:[],
                    sizes:{
                        height:45,
                        width:38,
                        lenght:38,
                    },
                    types:{},
                    woods:{ },
                    materials:{
                        "metal":"Металл",
                    },
                    cost:{
                        "metal": 2300,
                    }
                }
            ]
        }
    ]
}

export {bins}