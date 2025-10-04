const setLocalStorage = (key, array) =>
  localStorage.setItem(key, JSON.stringify(array));
const getLocalStorage = key => (JSON.parse(localStorage.getItem(key)) || []);
const removeLocalStorage = key => localStorage.removeItem(key);

export { setLocalStorage, getLocalStorage, removeLocalStorage };
