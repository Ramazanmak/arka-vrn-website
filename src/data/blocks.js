const blocks = {
    id:6,
    name:"Бетонные блоки и крышки",
    routeName:"concrete-blocks",
    empty:false,
    bgImage:"/general/catalogue/concrete-blocks.png",
    description:'/catalogue/blocks/blocks-description/blocks.md',
    subcategories:[
        {
            name:'Блоки',
            message:'',
            caution:'',
            cardType:"short",
            items:[
                {
                    name:"Блок столбовой",
                    folderName:"pillar",
                    folderPath:"/catalogue/blocks/pillar/", 
                    description:[],
                    sizes:{
                        "pillar-30x30":{
                            height:19,
                            length:30,
                            width:30,
                            weight:21.5,
                        },
                        "pillar-38x38":{
                            height:19,
                            length:38,
                            width:38,
                            weight:27,
                        }
                    },
                    cost:{
                        "pillar-30x30": 280,
                        "pillar-38x38": 400,
                    },
                    colorable:false,
                    choosable:{
                        sizeVariants:{
                            "30x30":"30см x 30см",
                            "38x38":"38см x 38см"
                        }
                    }
                },
                {
                    name:"Блок рядовой",
                    folderName:"row",
                    folderPath:"/catalogue/blocks/row/", 
                    description:[],
                    sizes:{
                        "default":{
                            height:19,
                            length:39,
                            width:19,
                            weight:22,
                        },
                    },
                    cost:{
                        "row": 260,
                    },
                    colorable:false,
                    choosable:{

                    }
                },
                {
                    name:"Подкрышник",
                    folderName:"undercarriage",
                    folderPath:"/catalogue/blocks/undercarriage/", 
                    description:[
                        'Многофункциональный бетонный блок, который может применятся как подкрышник или основание для рядового блока.'
                    ],
                    sizes:{
                        "default":{
                            height:10,
                            length:38.5,
                            width:14,
                            weight:29,
                        },
                    },
                    cost:{
                        "undercarriage": 260,
                    },
                    colorable:false,
                    choosable:{

                    }
                },
                {
                    name:"Крышка 'Плоская'",
                    folderName:"cover-flat",
                    folderPath:"/catalogue/blocks/cover-flat/", 
                    description:[],
                    sizes:{
                        "cover-flat-30x30":{
                            height:3,
                            length:30,
                            width:30,
                            weight:5,
                        },
                        "cover-flat-40x40":{
                            height:5,
                            length:40,
                            width:40,
                            weight:15,
                        },
                        "cover-flat-50x50":{
                            height:7,
                            length:50,
                            width:50,
                            weight:33,
                        }
                    },
                    cost:{
                        "cover-flat-30x30": 300,
                        "cover-flat-40x40": 400,
                        "cover-flat-50x50": 550,
                    },
                    colorable:false,
                    choosable:{
                        sizeVariants:{
                            "30x30":"30см x 30см",
                            "40x40":"40см x 40см",
                            "50x50":"50см x 50см",
                        }
                    }
                },
                {
                    name:"Крышка 'Медуза'",
                    folderName:"cover-jellyfish",
                    folderPath:"/catalogue/blocks/cover-jellyfish/", 
                    description:[
                    ],
                    sizes:{
                        "default":{
                            length:45,
                            width:45,
                            weight:21.5,
                        },
                    },
                    cost:{
                        "cover-jellyfish": 450,
                    },
                    colorable:false,
                    choosable:{

                    }
                },
                {
                    name:"Крышка 'Четырёхскатная'",
                    folderName:"cover-four-pitched",
                    folderPath:"/catalogue/blocks/cover-four-pitched/", 
                    description:[],
                    sizes:{
                        "cover-four-pitched-30x30":{
                            height:5,
                            length:30,
                            width:30,
                            weight:9.5,
                        },
                        "cover-four-pitched-38x38":{
                            height:6,
                            length:38,
                            width:38,
                            weight:15.5,
                        },
                        "cover-four-pitched-39x39":{
                            height:5,
                            length:39,
                            width:39,
                            weight:15,
                        },
                        "cover-four-pitched-49x49":{
                            height:5,
                            length:49,
                            width:49,
                            weight:22.5,
                        },
                    },
                    cost:{
                        "cover-four-pitched-30x30": 300,
                        "cover-four-pitched-38x38": 400,
                        "cover-four-pitched-39x39": 400,
                        "cover-four-pitched-49x49": 500,
                    },
                    colorable:false,
                    choosable:{
                        sizeVariants:{
                            "30x30":"30см x 30см",
                            "38x38":"38см x 38см",
                            "39x39":"39см x 39см",
                            "49x49":"49см x 49см",
                        }
                    }
                },
                {
                    name:"Крышка под фонарь",
                    folderName:"cover-under-flashlight",
                    folderPath:"/catalogue/blocks/cover-under-flashlight/", 
                    description:[
                        'бетонная крышка с отверстием для фонаря;',
                        'продаётся без фонаря.'
                    ],
                    sizes:{
                        "cover-under-flashlight-34x34":{
                            height:7,
                            length:34,
                            width:34,
                            weight:13,
                        },
                        "cover-under-flashlight-39x39":{
                            height:7,
                            length:39,
                            width:39,
                            weight:14,
                        },
                    },
                    cost:{
                        "cover-under-flashlight-34x34": 400,
                        "cover-under-flashlight-39x39": 450,
                    },
                    colorable:false,
                    choosable:{
                        sizeVariants:{
                            "34x34":"34см x 34см",
                            "39x39":"39см x 39см",
                        }
                    }
                },
                {
                    name:"Парапет 'Плоский'",
                    folderName:"parapet-flat",
                    folderPath:"/catalogue/blocks/parapet-flat/", 
                    description:[

                    ],
                    sizes:{
                        "default":{
                            height:5,
                            length:39,
                            width:19,
                            weight:9,
                        },
                    },
                    cost:{
                        "parapet-flat": 250,
                    },
                    colorable:false,
                    choosable:{

                    }
                },
                {
                    name:"Парапет 'Черепица' (широкий)",
                    folderName:"parapet-roof-tile",
                    folderPath:"/catalogue/blocks/parapet-roof-tile/", 
                    description:[
                        'бетонный парапет в форме черепицы;',
                        'широкая конфигурация позволяет просто и надёжно украшать толстые стены участков и другие поверхности.'
                    ],
                    sizes:{
                        "default":{
                            height:8.7,
                            length:50.5,
                            width:45.5,
                            weight:26.5,
                        },
                    },
                    cost:{
                        "parapet-roof-tile": 450,
                    },
                    colorable:false,
                    choosable:{

                    }
                },
            ]
        }
    ]

}


export {blocks}