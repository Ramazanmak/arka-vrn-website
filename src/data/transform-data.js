import { catalogueFull } from "./categories.js";

const catalogueExp = []

catalogueFull.forEach(category => {
  category.subcategories.forEach(subcategory => {
    subcategory.items.forEach(item => {
      catalogueExp.push({
        id: item.folderName,
        category: category.id,
        categoryName: category.name,
        subcategory: subcategory.id,
        subcategoryName: subcategory.name,
        photos: [... Object.keys(item.cost)],
        ...item,
        colors: item.colors ? item.colors[Object.keys(item.colors)[0]] : {}
      })
    })
  })
}) 

export {catalogueExp};
