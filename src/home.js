//Логіка сторінки Home
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
  getCategoryList,
} from './js/products-api.js';
import refs from './js/refs.js';

import {
  closeCardProduct,
  renderCardProduct,
  renderCategories,
  renderProduct,
  totalPage,
} from './js/render-function.js';

import { currentPage } from './js/constants.js';

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
      const response = await getProductsByCategory(buttonValue);
      renderProduct(response);
    } else {
      const response = await getAllProducts();
      renderProduct(response);
    }
  } catch (error) {
    console.log(error.message);
  }
}

refs.elProducts.addEventListener('click', handleOpenCardProduct);

async function handleOpenCardProduct(e) {
  e.preventDefault();
  const element = e.target.closest('.products__item');
  if (!element) {
    return;
  }

  refs.modal.classList.add('modal--is-open');
  const productId = element.dataset.id;

  try {
    const response = await getProductById(productId);
    renderCardProduct(response);
  } catch (error) {
    console.log(error.message);
  }
}

refs.modal.addEventListener('click', handleCardProduct);

function handleCardProduct(e) {
  e.preventDefault();
  if (e.target.classList.contains('modal__close-btn')) {
    return closeCardProduct();
  }
  // додати функціонал по іншим кнопкам картки
}

refs.searchProducts.addEventListener('submit', handleSearchProducts);

async function handleSearchProducts(e) {
  e.preventDefault();
  const elements = e.target.elements;
  const search = elements.searchValue.value.trim().toLowerCase();
  if (refs.notFound.classList.contains('not-found--visible')) {
    refs.notFound.classList.remove('not-found--visible');
  }

  if (!search) {
    return console.log('Sorry, search query is empty!');
  }

  try {
    const response = await searchProducts(search, currentPage);
    refs.elProducts.innerHTML = '';
    console.log(totalPage(response));

    if (totalPage(response) === 0) {
      return refs.notFound.classList.add('not-found--visible');
    }

    renderProduct(response);

    if (totalPage(response) === currentPage)
      console.log('These are all the products found for your query.');
  } catch (error) {
    console.log(error.message);
  }

  console.log(search);
}

refs.clearBtn.addEventListener('click', handleClearSearch);

async function handleClearSearch() {
  const searchInput = refs.searchProducts.elements.searchValue;
  searchInput.value = '';
  searchInput.focus();
  refs.elProducts.innerHTML = '';

  const activeBtn = refs.elCategories.querySelector('.categories__btn--active');
  activeBtn.classList.remove('categories__btn--active');

  const button = refs.elCategories.querySelector('.categories__btn');
  button.classList.add('categories__btn--active');

  try {
    const response = await getAllProducts(currentPage);
    renderProduct(response);
  } catch (error) {
    console.log(error.message);
  }

}
