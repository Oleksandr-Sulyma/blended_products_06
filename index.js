import"./assets/styles-JE8YjOlG.js";import{a as p}from"./assets/vendor-N5iQpiFS.js";const o=12,n=p.create({baseURL:"https://dummyjson.com/products"}),i=async(t=1)=>{try{return(await n.get(`?limit=${o}&skip=${(t-1)*o}&select=id,thumbnail,title,brand,category,price`)).data.products}catch(e){throw e}},g=async()=>{try{return(await n.get("/category-list")).data}catch(t){throw t}},_=async(t,e=1)=>{try{return(await n.get(`/category/${t}?limit=${o}&skip=${(e-1)*o}&select=id,thumbnail,title,brand,category,price`)).data.products}catch(s){throw s}},c={elCategories:document.querySelector(".categories"),elProducts:document.querySelector(".products")};function m(t){t.unshift("All");const e=t.map(s=>`
     <li class="categories__item">
      <button class="categories__btn ${s==="All"?"categories__btn--active":""}" type="button">${s}</button>
    </li>`).join("");c.elCategories.insertAdjacentHTML("beforeend",e)}function y(t){return t.map(({id:e,thumbnail:s,title:r,brand:l,category:u,price:d})=>`
    <li class="products__item" data-id="${e}">
    <img class="products__image" src="${s}" alt="${r}"/>
    <p class="products__title">${r}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${l}</span></p>
    <p class="products__category">Category:${u} </p>
    <p class="products__price">Price: ${d}$</p>
 </li>`).join("")}function a(t){c.elProducts.insertAdjacentHTML("beforeend",y(t))}async function b(){try{const t=await g();m(t);const e=await i();a(e)}catch(t){console.log(t.message)}}b();c.elCategories.addEventListener("click",$);async function $(t){if(t.preventDefault(),!t.target.classList.contains("categories__btn"))return;t.currentTarget.querySelector(".categories__btn--active").classList.remove("categories__btn--active");const e=t.target.closest(".categories__btn"),s=e.textContent.trim().toLowerCase();e.classList.add("categories__btn--active"),c.elProducts.innerHTML="";try{if(s!=="all"){const r=await _(s);a(r)}else{const r=await i();a(r)}}catch(r){console.log(r.message)}}
//# sourceMappingURL=index.js.map
