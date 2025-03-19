
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
            caution:"",
            items:[
                {
                    name:"Римма",
                    img:"/catalogue/bins/rimma.png",
                    description:"Урна из мытого бетона с деревянной отделкой",
                    sizes:{
                        height:55,
                        width:47,
                        lenght:45,
                        weight:65,
                    },
                    cost:{
                        "Гранитная крошка": 11000,
                        "Мраморная крошка": 13200,
                    }
                },
                {
                    name:"Валентина",
                    img:"/catalogue/bins/valentina.png",
                    description:"Урна из мытого бетона",
                    sizes:{
                        height:60,
                        width:45,
                        lenght:45,
                        weight:127,
                    },
                    cost:{
                        "Гранитная крошка": 8000,
                        "Мраморная крошка": 10300,
                    }
                },
                {
                    name:"Металлическая вставка",
                    img:"/catalogue/bins/metal.png",
                    description:"",
                    sizes:{
                        height:45,
                        width:38,
                        lenght:38,
                    },
                    cost:{
                        "default": 11000,
                    }
                }
            ]
        }
    ]
}

export {bins}