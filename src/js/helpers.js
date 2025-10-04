import refs from './refs';
import { limit } from './constants';
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api.js';

import { renderProduct } from './render-function.js';

export {
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollItem,
  lastPage,
  loadProducts,
  loadSearchProducts,
};

// функція показує кнопку "Завантажити ще", якщо є ще сторінки для завантаження
function showLoadMoreButton(total, currentPage) {
  // const lastPage = Math.ceil(total / limit);

  if (currentPage < lastPage(total)) {
    refs.loadMoreButton.classList.remove('is-hidden');
  } else {
    hideLoadMoreButton();
  }
}

// функція ховає кнопку "Завантажити ще"
function hideLoadMoreButton() {
  refs.loadMoreButton.classList.add('is-hidden');
}

function scrollItem(item) {
  if (item) {
    const itemHeight = item.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}

// функція обчислює загальну кількість сторінок
const lastPage = total => Math.ceil(total / limit);

// функція завантажує продукти в залежності від категорії та поточної сторінки
async function loadProducts(activeCategory, currentPage) {
  let data;
  let total = 0;
  try {
    if (activeCategory !== 'all') {
      ({ data, total } = await getProductsByCategory(
        activeCategory,
        currentPage
      ));
    } else {
      ({ data, total } = await getAllProducts(currentPage));
    }
    renderProduct(data);
    if (lastPage(total) === currentPage) {
      console.log('These are all the products found for your query.');
    }
    showLoadMoreButton(total, currentPage);
    if (currentPage > 1) {
      const item = refs.elProducts.querySelector('.products__item');
      scrollItem(item);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    if (currentPage < lastPage(total)) {
      refs.loadMoreButton.disabled = false;
    }
  }
}

//функція завантажує продукти в залежності від пошукового запиту та поточної сторінки
async function loadSearchProducts(search, currentPage) {
  let data;
  let total = 0;

  try {
    ({ data, total } = await searchProducts(search, currentPage));

    if (lastPage(total) === 0) {
      return refs.notFound.classList.add('not-found--visible');
    }
    renderProduct(data);
    if (lastPage(total) === currentPage) {
      console.log('These are all the products found for your query.');
    }
    showLoadMoreButton(total, currentPage);
    if (currentPage > 1) {
      scrollItem(item);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    if (currentPage < lastPage(total)) {
      refs.loadMoreButton.disabled = false;
    }
  }
}
