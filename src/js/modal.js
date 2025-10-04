import refs from './refs.js';
import { getProductById } from './products-api.js';
import { renderCardProduct } from './render-function.js';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './storage.js';
import { wishlistKey, cartKey } from './constants.js';
export { handleOpenCardProduct, handleCardProduct };

let wishlist = getLocalStorage(wishlistKey) || [];
let cart = getLocalStorage(cartKey) || [];
let productId;

// функціонал відкриття картки товару
async function handleOpenCardProduct(e) {
  e.preventDefault();

  // додаєм слухач подій картки товару
  refs.modal.addEventListener('click', handleCardProduct);

  // додаєм слухач подій клавіатури для закриття картки товару по Esc
  window.addEventListener('keydown', handleEsc);

  // перевірка чи клікнули по продукту
    const element = e.target.closest('.products__item');
  if (!element) {
    return;
  }
  refs.modal.classList.add('modal--is-open');
  // отримання id продукту
  productId = element.dataset.id;

// формація для кнопки "Add to Wishlist" або "Remove from Wishlist"
  const btnWishlist = refs.modal.querySelector('.modal-product__btn--wishlist');
  if (wishlist.includes(productId)) {
    btnWishlist.textContent = 'Remove from Wishlist';
  } else {
    btnWishlist.textContent = 'Add to Wishlist';
  }

// формація для кнопки "Add to CarT" або "Remove from Cart"
  const btnCart = refs.modal.querySelector('.modal-product__btn--cart');
  if (cart.includes(productId)) {
    btnCart.textContent = 'Remove from Cart';
  } else {
    btnCart.textContent = 'Add to Cart';
  }

// отримання продукту по id
  try {
    const response = await getProductById(productId);
    renderCardProduct(response);
    return;
  } catch (error) {
    console.log(error.message);
    return;
  }
}

// функціонал роботи з карткою товару
function handleCardProduct(e) {
  e.preventDefault();
    // закриття картки по кнопці закриття
  if (e.target.classList.contains('modal__close-btn')) {
    return closeCardProduct();
  }
  // закриття картки по бекдропу
  if (e.target === e.currentTarget) {
    return closeCardProduct();
  }
  // додати функціонал по іншим кнопкам картки

  if (e.target.classList.contains('modal-product__btn--wishlist')) {
    if (e.target.textContent.trim().toLowerCase() === 'add to wishlist') {
      e.target.textContent = 'Remove from Wishlist';
      handleBtnAdd(wishlistKey, wishlist);
      return;
    } else {
      handleBtnRemove(wishlistKey, wishlist);
      e.target.textContent = 'Add to Wishlist';
      return;
    }
  }
  if (e.target.classList.contains('modal-product__btn--cart')) {
    if (e.target.textContent.trim().toLowerCase() === 'add to cart') {
      e.target.textContent = 'Remove from Cart';
      handleBtnAdd(cartKey, cart);
      return;
    } else {
      handleBtnRemove(cartKey, cart);
      e.target.textContent = 'Add to Cart';
      return;
    }
  }
}


function handleEsc(e) {
  if (e.key === 'Escape') {
    return closeCardProduct();
  }
}

// функція закриває картку продукту
function closeCardProduct() {
  refs.cardProduct.innerHTML = '';
  refs.modal.classList.remove('modal--is-open');

  // 1. Видаляємо слухача Esc
  window.removeEventListener('keydown', handleEsc);

  // 2. Видаляємо слухача кліку на бекдроп (якщо він не був делегований на `.modal`)
  refs.modal.removeEventListener('click', handleCardProduct);
}

// функції додають або видаляють id продукту в/з масиву wishlist або cart і записують його в локал сторедж
function handleBtnAdd(key) {
if (key === wishlistKey) {
  wishlist.push(productId);
  setLocalStorage(wishlistKey, wishlist);
} else {
  cart.push(productId);
  setLocalStorage(cartKey, cart);
}
}

function handleBtnRemove(key) {
if (key === wishlistKey) {
  wishlist = getLocalStorage(wishlistKey);
  wishlist = wishlist.filter(id => id !== productId);
  setLocalStorage(wishlistKey, wishlist);
} else {
  cart = getLocalStorage(cartKey);
  cart = cart.filter(id => id !== productId);
  setLocalStorage(cartKey, cart);
}
}

