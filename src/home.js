//Логіка сторінки Home
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
  getCategoryList,
} from './js/products-api.js';
import refs from './js/refs.js';

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

refs.elCategories.addEventListener('click', triggerCategory);

async function triggerCategory(e) {
  e.preventDefault();
  if (!e.target.classList.contains('categories__btn')) return;

  e.currentTarget
    .querySelector('.categories__btn--active')
    .classList.remove('categories__btn--active');

  const button = e.target.closest('.categories__btn');
  const buttonValue = button.textContent.trim().toLowerCase();
  button.classList.add('categories__btn--active');
  refs.elProducts.innerHTML = '';

  try {
    if (buttonValue !== 'all') {
      const responseProducts = await getProductsByCategory(buttonValue);
      renderProduct(responseProducts);
    } else {
      const responseProducts = await getAllProducts();
      renderProduct(responseProducts);
    }
  } catch (error) {
    console.log(error.message);
  }
}
