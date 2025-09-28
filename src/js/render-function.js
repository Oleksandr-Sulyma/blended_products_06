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
