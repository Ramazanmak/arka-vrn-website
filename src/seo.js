import { SITE_URL } from "./site-routes";

export function getCanonical(path){ 
  if (path === '/'){
    return `${SITE_URL}/`
  }

  return `${SITE_URL}/${path}`
}

export function getHomeSeo() {
  return {
    title: 'АРКА — малые архитектурные формы из бетона в Воронеже',
    description:
      'Производство МАФов из бетона в Воронеже: вазоны, лавки, урны, антипарковочные элементы, контейнерные площадки, бетонные блоки и заборы.',
    canonical: getCanonical('/'),
  }
}

export function getCategorySeo(category) {
  return {
    title: category.seoTitle || `${category.name} в Воронеже - купить от производителя | ARKA`,
    description: category.seoDescription || `${category.name} для благоустройства территорий. Производство в Воронеже, доставка по области, работа с юрлицами, ИП, УК, ТСЖ и застройщиками.`,
    canonical: getCanonical(`categories/${category.routeName}`),
  }
}

export function getProductSeo(product) {
  return {
    title: `${product.subcategoryName} "${product.name}" — купить в Воронеже от производителя | АРКА`,
    description:
      `${product.name}: ${product.subcategoryName || product.categoryName || 'изделие для благоустройства'}. Производство МАФов из бетона в Воронеже, доставка по области, варианты исполнения и расчет стоимости.`,
    canonical: getCanonical(`categories/${product.category}/${product.id}`),

  }
}

