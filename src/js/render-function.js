import refs from './refs.js';

export function renderCategories(categories) {
  categories.unshift('All');
  const markup = categories
    .map(
      category => `
     <li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>   
        `
    )
    .join('');
  refs.elCategories.insertAdjacentHTML('beforeend', markup);
}

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
export function renderProduct(products) {
  refs.elProducts.insertAdjacentHTML('beforeend', murkupProdect(products));
}
