

const catalogueFull = [
    {
      id:"vases",
      name:"Вазоны",
      routeName:"vases",
      empty:false,
      bgImage:"/general/catalogue/vases.png",
      description:'/catalogue/vases/vases-description/vases.md',
      subcategories:[
        {
          id: "concreteVases",
          name:"Вазоны бетонные",
          message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
          caution:"Временно не производим исполнения из мраморной крошки.",
          cardType:"short",
        },
        {
          id: "metalVases",
          name:"Вазоны металлические",
          message:"Металлические вазоны, обшитые деревом. В комплект вазона входит пластиковое корыто объемом 90л для посадки растений. Дерево обработано тонирующими пропитками с синтетическими смолами и покрыто атмосферостойким лаком в два слоя. Металлический каркас окрашен грунт-эмалью",
          cardType:"short",
        }
      ]
    },
    {
      id:"benches",
      name:"Парковые диваны и скамейки",
      routeName:"benches",
      empty:false,
      bgImage:"/general/catalogue/benches.png",
      description:'/catalogue/benches/benches-description/benches.md',
      subcategories:[
        {
          id: "parkSofas",
          name:"Парковые диваны",
          message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
          caution:"Временно не производим исполнения из мраморной крошки.",
          cardType:"short",
        },
        {
          id:"parkBenches",
          name:"Cкамейки",
          message:"Исполняются в вариантах из мытого бетона на гранитной крошке.",
          caution:"Временно не производим исполнения из мраморной крошки.",
          cardType:"short",
        }
      ]
    },
    {
      id:"bins",
      name:"Урны",
      routeName:"bins",
      empty:false,
      bgImage:"/general/catalogue/bins.png",
      description:'/catalogue/bins/bins-description/bins.md',
      subcategories:[
        {
          id: "bins", 
          name:"Урны",
          message:"Временно не производим исполнения из мраморной крошки.",
          caution:[],
          cardType:"short",
        }
      ],
    },
    {
      id:"antiparkings",
      name:"Антипарковочные элементы",
      routeName:"antiparkings",
      empty:false,
      bgImage:"/general/catalogue/antiparkings.png",
      description:'/catalogue/antiparkings/antiparkings-description/antiparkings.md',
      subcategories:[
        {
          id: "antiparkingHemispheres",
          name:"Антипарковочные полусферы",
          message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
          caution:"Временно не производим исполнения из мраморной крошки.",
          cardType:"short",
        },
        {
          id: "antiparkingColumns",
          name:"Антипарковочные столбики",
          message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
          caution:"Временно не производим исполнения из мраморной крошки.",
          cardType:"short",
        }
      ]
    },
    {
      id:"platforms",
      name:"Мусорные площадки",
      routeName:"platforms",
      empty:false,
      bgImage:"/general/catalogue/platforms.png",
      description:'/catalogue/platforms/platforms-description/platforms.md',
      subcategories:[
        {
          id: "platforms",
          name:"Мусорные площадки",
          message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
          caution:"",
          cardType:"short",
        },
      ]
    },
    {
      id:"blocks",
      name:"Бетонные блоки и крышки",
      routeName:"concrete-blocks",
      empty:false,
      bgImage:"/general/catalogue/concrete-blocks.png",
      description:'/catalogue/blocks/blocks-description/blocks.md',
      subcategories:[
        {
          id: "blocks",
          name:'Блоки',
          message:'',
          caution:'',
          cardType:"short",
        }
      ]
    },
    {
      id:"fences",
      name:"Бетонные заборы",
      routeName:"fences",
      empty:false,
      bgImage:"/general/catalogue/fences.png",
      description:'/catalogue/fences/fences-description/fences.md',
      subcategories:[
        {
          id: "concreteFences",
          name:"Бетонные заборы",
          message:"Исполняются в вариантах из мытого и гладкого бетона. Доступна покраска гладкого бетона в любой цвет.",
          caution:"Временно не производим исполнения из мраморной крошки.",
          cardType:"short",
        }
      ]
    }
  ]

export {catalogueFull}