const platfrorms = {
    id:5,
    name:"Мусорные площадки",
    routeName:"platforms",
    empty:false,
    bgImage:"/general/catalogue/platforms.png",
    description:[
        "Бетонные мусорные площадки отличаются своей надежностью и долговечностью, а также послужат украшением улицы. Мы предоставляем несколько вариантов мусорных площадок: 'Спасибо за чистоту' и 'Цветок' в двух вариациях (открытого и закрытого типов). Доступна покраска в любые цвета.",
    ],
    subcategories:[
        {
            name:"Мусорные площадки",
            message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
            caution:"",
            cardType:"extended",
            items:[
                {
                    name:'Спасибо за чистоту',
                    folderName:"thank",
                    folderPath:"/catalogue/platforms/thank/",
                    sizes:{
                        "thank-opened":{
                            height:160,
                            width:260,
                            length:600,
                        },
                        "thank-closed":{
                            height:160,
                            width:300,
                            length:460,
                        }
                    },
                
                    description:[
                        "Открытая площадка на три евроконтейнера",
                        "Надпись в теле бетона",
                        "Дополнительные подкатные плиты обеспечивают плавный подход к площадке и удобное выкатывание контейнеров"
                    ],
                    cost:{
                        "thank-opened":"от 100000",
                        "thank-closed":"от 100000",
                    },
                    colorable:false,
                    choosable:{
                        types:{
                            opened:"Открытого типа",
                            closed:"Закрытого типа"
                        }, 
                    }
                },
                {
                    name:'Цветок',
                    folderName:"flower",
                    folderPath:"/catalogue/platforms/flower/",
                    sizes:{
                        "flower-opened":{
                            height:175,
                            width:360,
                            length:400,
                        },
                        "flower-closed":{
                            height:175,
                            width:680,
                            length:780,
                        }
                    },
                    description:[
                        "Открытая эксклюзивная площадка",
                        "Подходит для сбора крупногабаритных отходов",
                        "Конструкция самостоящей панели позволяет собрать площадку любых конфигураций и размеров",
                    ],
                    cost:{
                        "flower-opened":"от 100000",
                        "flower-closed":"от 100000",
                    },
                    colorable:false,
                    choosable:{
                        types:{
                            opened:"открытого типа",
                            closed:"закрытого типа"
                        },

                    }
                }
            ]
        },
        
    ]
}

export {platfrorms}