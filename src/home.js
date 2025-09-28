//Логіка сторінки Home
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
  getCategoryList,
} from './js/products-api.js';

import { renderCategories, renderProduct } from './js/render-function.js';

async function init() {
  try {
    const response = await getCategoryList();
    renderCategories(response);
    const responseProdacts = await getAllProducts();
    renderProduct(responseProdacts);
  } catch (error) {
    console.log(error.message);
  }
}
init();
