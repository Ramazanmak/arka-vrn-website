import {ref} from 'vue'

const namesOfProps = ref({
    sizes: 'Габариты',
    sizeVariants:'Варианты размеров',
    description:'Описание',
    cost:'Цена',
    types:'Типы',
    materials:'Основной материал',
    woods:'Порода древесины',
    colors:'Цвет',
    height:'Высота',
    width:'Ширина',
    length:'Длина',
    diameter:'Диаметр',
    exDiameter:'Внешний диаметр',
    inDiameter:'Внутренний диаметр',
    weight:'Масса',
    exWidth:'Внешная протяжённость',
    inWidth:'Вутренняя протяжённость',
})

const unitsOfProps = ref({
    weight:'кг',
    height:'см',
    length:'см',
    width:'см',
    diameter:'см',
    exDiameter:'см',
    inDiameter:'см',
    exWidth:'см',
    inWidth:'см',
})

const allChoosableProps = ref([
    "types",
    "woods",
    "materials",
    "colors",
    "cost"
])

export {namesOfProps, unitsOfProps, allChoosableProps}