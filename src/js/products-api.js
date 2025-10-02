import axios, { Axios } from 'axios';
import { limit, currentPage } from './constants.js';
// API ендпоінт №1: базовий URL
const requestDummy = axios.create({
  baseURL: 'https://dummyjson.com/products',
});

// API ендпоінт №2: функция getAllProducts(). Не приймає параметри, повертає проміс з даними (всі продукти з пагінацією)
export const getAllProducts = async (currentPage = 1) => {
  try {
    const response = await requestDummy.get(
      `?limit=${limit}&skip=${
        (currentPage - 1) * limit
      }&select=id,thumbnail,title,brand,category,price`
    );
    return {data: response.data.products, total: response.data.total};
  } catch (error) {
    throw error;
  }
};

// API ендпоінт №3: функція getProductById(id). Приймає id продукту, повертає проміс з даними (один продукт по ID)
export const getProductById = async id => {
  try {
    const response = await requestDummy.get(
      `/${id}?select=id,thumbnail,title,tags,description,warrantyInformation,returnPolicy,price`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API ендпоінт №4: функція searchProducts(query). Приймає рядок пошукового запиту, повертає проміс з даними (список товарів,
// що відповідають пошуковому запиту)
export const searchProducts = async (query, currentPage = 1) => {
  try {
    const response = await requestDummy.get(
      `/search?q=${query}&limit=${limit}&skip=${
        (currentPage - 1) * limit
      }&select=id,thumbnail,title,brand,category,price`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API ендпоінт №5: функція getCategoryList(). Не приймає параметри, повертає проміс з даними (список категорій прoдуктів)
export const getCategoryList = async () => {
  try {
    const response = await requestDummy.get('/category-list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API ендпоінт №6: функція getProductsByCategory(category). Приймає назву категорії, повертає проміс з даними (список
// продуктів у вказаній категорії)
export const getProductsByCategory = async (category, currentPage = 1) => {
  try {
    const response = await requestDummy.get(
      `/category/${category}?limit=${limit}&skip=${
        (currentPage - 1) * limit
      }&select=id,thumbnail,title,brand,category,price`
    );

    return { data: response.data.products, total: response.data.total};
  } catch (error) {
    throw error;
  }
};

//для перевірки роботи функцій:
// getAllProducts().then(data => console.log('getAllProducts- ', data));
// getProductsByCategory('smartphones').then(data =>
//   console.log('getProductsByCategory("smartphones")- ', data)
// );
// getProductById(10).then(data => console.log('getProductById(5)- ', data));
// searchProducts('phone').then(data =>
//   console.log('searchProducts("phone")- ', data)
// );
// getCategoryList().then(data => console.log('getCategoryList- ', data));
