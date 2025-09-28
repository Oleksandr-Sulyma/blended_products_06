//Логіка сторінки Home
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
  getCategoryList,
} from './js/products-api.js';

import { renderCategories } from './js/render-function.js';

async function init() {
  try {
    const response = await getCategoryList();
    renderCategories(response)    
  } catch (error) {
    console.log(error.message);
  }
}
init();

