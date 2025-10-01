import { limit } from './constants.js';
import refs from './refs.js';

// функція рендерить список категорій у контейнер
export function renderCategories(categories) {
  categories.unshift('All');
  const markup = categories
    .map(
      category => `
     <li class="categories__item">
      <button class="categories__btn ${
        category === 'All' ? 'categories__btn--active' : ''
      }" type="button">${category}</button>
    </li>`
    )
    .join('');
  refs.elCategories.insertAdjacentHTML('beforeend', markup);
}

// функція створює HTML-розмітку для продуктів
function murkupProdect(products) {
  return products
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
    <p class="products__category">Category:${category} </p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');
}
// функція рендерить продукти у список на сторінці
export function renderProduct(products) {
  refs.elProducts.insertAdjacentHTML('beforeend', murkupProdect(products));
}

// функція створює HTML-розмітку для картки продукту
function markupCardProduct(product) {
  const tags = product.tags
    .map(
      el =>
        `<li>${el}</li>`
    )
    .join('');
  return `
    <img class="modal-product__img" src="${product.thumbnail}" alt="${product.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping:${product.warrantyInformation}</p>
        <p class="modal-product__return-policy">Return Policy:${product.returnPolicy}</p>
        <p class="modal-product__price">Price: ${product.price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
    `;
}

// функція рендерить картку продукту у модальне вікно
export function renderCardProduct(product) {
  refs.cardProduct.innerHTML = markupCardProduct(product);
}

// функція закриває картку продукту
export function closeCardProduct() {
refs.cardProduct.innerHTML = '';
refs.modal.classList.remove('modal--is-open')  
}

// функція обчислює загальну кількість сторінок
export const lastPage = (response) => Math.ceil(total / limit);