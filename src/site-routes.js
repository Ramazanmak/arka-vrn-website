import { catalogueFull } from "./data/categories.js";
import { catalogue } from "./data/catalogue.js";

export const SITE_URL = 'https://arka-vrn.ru';

export function getStaticRoutes() {

  const categoryRoutes = catalogueFull
    .filter((category) => !category.empty)
    .map((category) => `/categories/${category.routeName}`);

  const productRoutes = catalogue.map((product) => {
    return `/categories/${product.category}/${product.id}`;
  })

  return [
    '/',
    ...categoryRoutes,
    ...productRoutes,
  ]
}

