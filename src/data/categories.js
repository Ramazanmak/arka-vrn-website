import {bins} from "./bins"
import {vases} from "./vases"
import {benches} from "./benches"
import { antiparkings } from "./antiparkings"






const catalogueFull = [
    vases,
    benches,
    bins,
    antiparkings,
    {
        id:5,
        name:"Мусорные площадки",
        routeName:"platforms",
        empty:false,
        bgImage:"/general/catalogue/platforms.png",
        description:'Бетонные мусорные площадки отличаются своей надежностью и долговечностью, а также послужат украшением улицы. Мы предоставляем несколько вариантов мусорных площадок: "Спасибо за чистоту" и "Цветок" в двух вариациях (открытого и закрытого типов). Доступна покраска в любые цвета.',
    },
    {
        id:6,
        name:"Бетонные блоки и крышки",
        routeName:"concrete-blocks",
        empty:true,
        bgImage:"/general/catalogue/concrete-blocks.png",
        description:"",
    }

]

export {catalogueFull}