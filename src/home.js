//Логіка сторінки Home
import {
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    getProductById,
    searchProducts,
    getCategoryList,
} from "./js/products-api.js";


getAllProducts().then(data => console.log('getAllProducts- ', data));
getAllCategories().then(data => console.log('getAllCategories- ', data));
getProductsByCategory("smartphones").then(data => console.log('getProductsByCategory("smartphones")- ', data));   
getProductById(5).then(data => console.log('getProductById(5)- ', data));
searchProducts("phone").then(data => console.log('searchProducts("phone")- ',data));
getCategoryList().then(data => console.log('getCategoryList- ',data));


getCategoryList