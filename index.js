import"./assets/styles-JE8YjOlG.js";import{a as u}from"./assets/vendor-N5iQpiFS.js";const o=12,c=u.create({baseURL:"https://dummyjson.com/products"}),d=async(t=1)=>{try{return(await c.get(`?limit=${o}&skip=${(t-1)*o}&select=id,thumbnail,title,brand,category,price`)).data.products}catch(e){throw e}},l=async()=>{try{return(await c.get("/category-list")).data}catch(t){throw t}},a={elCategories:document.querySelector(".categories"),elProducts:document.querySelector(".products")};function m(t){t.unshift("All");const e=t.map(s=>`
     <li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>   
        `).join("");a.elCategories.insertAdjacentHTML("beforeend",e)}function g(t){return t.map(({id:e,thumbnail:s,title:r,brand:n,category:i,price:p})=>`
    <li class="products__item" data-id="${e}">
    <img class="products__image" src="${s}" alt="${r}"/>
    <p class="products__title">${r}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${n}</span></p>
    <p class="products__category">Category:${i} </p>
    <p class="products__price">Price: ${p}$</p>
 </li>`).join("")}function _(t){a.elProducts.insertAdjacentHTML("beforeend",g(t))}async function y(){try{const t=await l();m(t);const e=await d();_(e)}catch(t){console.log(t.message)}}y();
//# sourceMappingURL=index.js.map
