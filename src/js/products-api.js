import axios, { Axios } from 'axios';
const requestDummy = axios.create({
  baseURL: 'https://dummyjson.com/products',
});

const limit = 12;


// функция getAllProducts(). Не приймає параметри, повертає проміс з даними (список всіх продуктів)
export const getAllProducts = async (skip=0) => {
 try {
    const response = await requestDummy.get(`?limit=${limit}&skip=${skip}`);
  return response.data;
 } catch (error) {
  throw error;
 }
};

// функція getProductById(id). Приймає id товару, повертає проміс з даними (інформація про товар з вказаним id)
export const getProductById = async (id) => {
  try {
    const response = await requestDummy.get(`/${id}?select=thumbnail,title,tags,description,warrantyInformation,returnPolicy,price`);
  return response.data;
} catch (error) {
  throw error;
 }
};

// функція searchProducts(query). Приймає рядок пошукового запиту, повертає проміс з даними (список товарів, що відповідають пошуковому запиту)
export const searchProducts = async (query, skip=0) => {
  try {
    const response = await requestDummy.get(`/search?q=${query}&limit=${limit}&skip=${skip}`);
  return response.data;
  } catch (error) {
  throw error;
 }
};

// функція getCategoryList(). Не приймає параметри, повертає проміс з даними (список категорій прдуктів)
export const getCategoryList = async () => {
  try {
    const response = await requestDummy.get('/category-list');
  return response.data;
  } catch (error) {
  throw error;
 }
};

// функція getProductsByCategory(category). Приймає назву категорії, повертає проміс з даними (список продуктів у вказаній категорії)
export const getProductsByCategory = async (category, skip=0) => {
  try {
    const response = await requestDummy.get(`/category/${category}?limit=${limit}&skip=${skip}`);
  return response.data;
} catch (error) {
  throw error;
 }
};

// функція getAllCategories(). Не приймає параметри, повертає проміс з даними (список всіх категорій товарів)
export const getAllCategories = async () => {
  try {
    const response = await requestDummy.get('/categories');
  return response.data;
} catch (error) {
  throw error;
 }
};


