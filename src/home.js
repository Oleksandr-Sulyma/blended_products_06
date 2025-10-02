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
} from './js/render-function.js';

import { showLoadMoreButton, scrollItem } from './js/helpers.js';
import { currentPage } from './js/constants.js';

let locCurrentPage = currentPage;

async function init() {
  try {
    const response = await getCategoryList();
    renderCategories(response);
    const { data, total } = await getAllProducts();
    renderProduct(data);
    showLoadMoreButton(total, locCurrentPage);
  } catch (error) {
    console.log(error.message);
  }
}
init();

refs.elCategories.addEventListener('click', triggerCategory);

async function triggerCategory(e) {
  e.preventDefault();
  if (!e.target.classList.contains('categories__btn')) return;
  locCurrentPage = 1;

  e.currentTarget
    .querySelector('.categories__btn--active')
    .classList.remove('categories__btn--active');

  const button = e.target.closest('.categories__btn');
  const buttonValue = button.textContent.trim().toLowerCase();
  button.classList.add('categories__btn--active');
  refs.elProducts.innerHTML = '';

  try {
    if (buttonValue !== 'all') {
      const { data, total } = await getProductsByCategory(buttonValue);
      renderProduct(data);
      showLoadMoreButton(total, locCurrentPage);
    } else {
      const { data, total } = await getAllProducts();
      renderProduct(data);
      showLoadMoreButton(total, locCurrentPage);
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
    const responseProductsCard = await getProductById(productId);
    renderCardProduct(responseProductsCard);
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

refs.loadMoreButton.addEventListener('click', triggerLoadMore);

async function triggerLoadMore(e) {
  e.preventDefault();

  locCurrentPage += 1;
  refs.loadMoreButton.disabled = true;

  const activeCategory = refs.elCategories
    .querySelector('.categories__btn.categories__btn--active')
    .textContent.trim()
    .toLowerCase();

  try {
    if (activeCategory !== 'all') {
      const { data, total } = await getProductsByCategory(
        activeCategory,
        locCurrentPage
      );
      renderProduct(data);
      showLoadMoreButton(total, locCurrentPage);
    } else {
      const { data, total } = await getAllProducts(locCurrentPage);
      renderProduct(data);
      showLoadMoreButton(total, locCurrentPage);
    }
    const galleryItem = refs.elProducts.querySelector('.products__item');
    scrollItem(galleryItem);
  } catch (error) {
    console.log(error.message);
  } finally {
    refs.loadMoreButton.disabled = false;
  }
}
