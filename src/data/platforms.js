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
                    defaultImg:"/catalogue/platforms/thank/thank",
                    sizes:{
                        height:160,
                        width:260,
                        length:600,
                    },
                    description:[
                        "Открытая площадка на три евроконтейнера",
                        "Надпись в теле бетона",
                        "Дополнительные подкатные плиты обеспечивают плавный подход к площадке и удобное выкатывание контейнеров"
                    ],
                    cost:{
                        "thank-opened":100000,
                        "thank-closed":100000,
                    },
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
                    defaultImg:"/catalogue/platforms/flower/flower",
                    sizes:{
                        height:175,
                        width:360,
                        length:400,
                    },
                    description:[
                        "Открытая эксклюзивная площадка",
                        "Подходит для сбора крупногабаритных отходов",
                        "Конструкция самостоящей панели позволяет собрать площадку любых конфигураций и размеров",
                    ],
                    cost:{
                        "flower-opened":100000,
                        "flower-closed":100000,
                    },
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