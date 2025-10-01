import refs from './refs';
import { limit } from './constants';

function showLoadMoreButton(total, currentPage) {
  const lastPage = Math.ceil(total / limit);

  if (currentPage < lastPage) {
    refs.loadMoreButton.classList.remove('is-hidden');
  } else {
    hideLoadMoreButton();
  }
}

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

export { showLoadMoreButton, hideLoadMoreButton, scrollItem };
