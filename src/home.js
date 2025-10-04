//Логіка сторінки Home
import {
  getAllProducts,
  // getProductById,
  // searchProducts,
  getCategoryList,
} from './js/products-api.js';
import refs from './js/refs.js';

import {
  // closeCardProduct,
  // renderCardProduct,
  renderCategories,
  renderProduct,
} from './js/render-function.js';

import {
  showLoadMoreButton,
  // scrollItem,
  // lastPage,
  loadProducts,
  loadSearchProducts,
} from './js/helpers.js';

import { handleOpenCardProduct, handleCardProduct } from './js/modal.js';

let currentPage = 1;
let search;
const searchInput = refs.searchProducts.elements.searchValue;

// ініціалізація сторінки
async function init() {
  console.log(currentPage);

  try {
    let data;
    let total = 0;
    const response = await getCategoryList();
    renderCategories(response);
    ({ data, total } = await getAllProducts());
    renderProduct(data);
    showLoadMoreButton(total, currentPage);
    console.log(currentPage);
  } catch (error) {
    console.log(error.message);
  }
}
init(currentPage);

// функціонал вибору категорії товарів
refs.elCategories.addEventListener('click', triggerCategory);

async function triggerCategory(e) {
  currentPage = 1;
  searchInput.value = '';
  e.preventDefault();
  if (!e.target.classList.contains('categories__btn')) return;

  e.currentTarget
    .querySelector('.categories__btn--active')
    ?.classList.remove('categories__btn--active');

  const button = e.target.closest('.categories__btn');
  button.classList.add('categories__btn--active');
  const activeCategory = button.textContent.trim().toLowerCase();
  refs.elProducts.innerHTML = '';
  loadProducts(activeCategory, currentPage);
}

// функціонал пошуку товарів за допомогою форми
refs.searchProducts.addEventListener('submit', handleSearchProducts);

async function handleSearchProducts(e) {
  e.preventDefault();
  currentPage = 1;
  search = e.target.elements.searchValue.value.trim().toLowerCase();
  const activeBtn = refs.elCategories.querySelector('.categories__btn--active');
  if (activeBtn) {
    activeBtn.classList.remove('categories__btn--active');
    refs.elProducts.innerHTML = '';
  }

  if (refs.notFound.classList.contains('not-found--visible')) {
    refs.notFound.classList.remove('not-found--visible');
  }

  if (!search) {
    return console.log('Sorry, search query is empty!');
  }

  loadSearchProducts(search, currentPage);
}

// функціонал кнопки Clear
refs.clearBtn.addEventListener('click', handleClearSearch);

async function handleClearSearch() {
  // const searchInput = refs.searchProducts.elements.searchValue;
  searchInput.value = '';
  searchInput.focus();
  refs.elProducts.innerHTML = '';

  const button = refs.elCategories.querySelector('.categories__btn');
  button.classList.add('categories__btn--active');

  let data;
  let total = 0;

  try {
    ({ data, total } = await getAllProducts());
    renderProduct(data);
    showLoadMoreButton(total, currentPage);
  } catch (error) {
    console.log(error.message);
  }
}

// функціонал кнопки Load More
refs.loadMoreButton.addEventListener('click', triggerLoadMore);

console.log(currentPage);
async function triggerLoadMore(e) {
  e.preventDefault();
  refs.loadMoreButton.disabled = true;
  let activeCategory = refs.elCategories.querySelector(
    '.categories__btn.categories__btn--active'
  );

  if (activeCategory) {
    activeCategory = activeCategory.textContent.trim().toLowerCase();
  }

  currentPage += 1;

  if (activeCategory) {
    loadProducts(activeCategory, currentPage);
  } else if (search) {
    loadSearchProducts(search, currentPage);
  }
}

// відкриття картки товару
refs.elProducts.addEventListener('click', handleOpenCardProduct);



