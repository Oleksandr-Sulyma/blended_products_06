import"./assets/styles-JE8YjOlG.js";import{a as _}from"./assets/vendor-N5iQpiFS.js";const n=12;let y=1;const d=_.create({baseURL:"https://dummyjson.com/products"}),u=async(t=1)=>{try{const e=await d.get(`?limit=${n}&skip=${(t-1)*n}&select=id,thumbnail,title,brand,category,price`);return{data:e.data.products,total:e.data.total}}catch(e){throw e}},b=async t=>{try{return(await d.get(`/${t}?select=id,thumbnail,title,tags,description,warrantyInformation,returnPolicy,price`)).data}catch(e){throw e}},f=async()=>{try{return(await d.get("/category-list")).data}catch(t){throw t}},p=async(t,e=1)=>{try{const o=await d.get(`/category/${t}?limit=${n}&skip=${(e-1)*n}&select=id,thumbnail,title,brand,category,price`);return{data:o.data.products,total:o.data.total}}catch(o){throw o}},a={elCategories:document.querySelector(".categories"),elProducts:document.querySelector(".products"),cardProduct:document.querySelector(".modal-product"),modal:document.querySelector(".modal"),loadMoreButton:document.querySelector(".load-more-btn")};function h(t){t.unshift("All");const e=t.map(o=>`
     <li class="categories__item">
      <button class="categories__btn ${o==="All"?"categories__btn--active":""}" type="button">${o}</button>
    </li>`).join("");a.elCategories.insertAdjacentHTML("beforeend",e)}function P(t){return t.map(({id:e,thumbnail:o,title:r,brand:s,category:m,price:g})=>`
    <li class="products__item" data-id="${e}">
    <img class="products__image" src="${o}" alt="${r}"/>
    <p class="products__title">${r}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${s}</span></p>
    <p class="products__category">Category:${m} </p>
    <p class="products__price">Price: ${g}$</p>
 </li>`).join("")}function i(t){a.elProducts.insertAdjacentHTML("beforeend",P(t))}function $(t){const e=t.tags.map(o=>`<li>${o}</li>`).join("");return`
    <img class="modal-product__img" src="${t.thumbnail}" alt="${t.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${e}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping:${t.warrantyInformation}</p>
        <p class="modal-product__return-policy">Return Policy:${t.returnPolicy}</p>
        <p class="modal-product__price">Price: ${t.price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
    `}function L(t){a.cardProduct.innerHTML=$(t)}function w(){a.cardProduct.innerHTML="",a.modal.classList.remove("modal--is-open")}function l(t,e){const o=Math.ceil(t/n);e<o?a.loadMoreButton.classList.remove("is-hidden"):C()}function C(){a.loadMoreButton.classList.add("is-hidden")}function v(t){if(t){const e=t.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}let c=y;async function M(){try{const t=await f();h(t);const{data:e,total:o}=await u();i(e),l(o,c)}catch(t){console.log(t.message)}}M();a.elCategories.addEventListener("click",B);async function B(t){if(t.preventDefault(),!t.target.classList.contains("categories__btn"))return;c=1,t.currentTarget.querySelector(".categories__btn--active").classList.remove("categories__btn--active");const e=t.target.closest(".categories__btn"),o=e.textContent.trim().toLowerCase();e.classList.add("categories__btn--active"),a.elProducts.innerHTML="";try{if(o!=="all"){const{data:r,total:s}=await p(o);i(r),l(s,c)}else{const{data:r,total:s}=await u();i(r),l(s,c)}}catch(r){console.log(r.message)}}a.elProducts.addEventListener("click",k);async function k(t){t.preventDefault();const e=t.target.closest(".products__item");if(!e)return;a.modal.classList.add("modal--is-open");const o=e.dataset.id;try{const r=await b(o);L(r)}catch(r){console.log(r.message)}}a.modal.addEventListener("click",q);function q(t){if(t.preventDefault(),t.target.classList.contains("modal__close-btn"))return w()}a.loadMoreButton.addEventListener("click",S);async function S(t){t.preventDefault(),c+=1,a.loadMoreButton.disabled=!0;const e=a.elCategories.querySelector(".categories__btn.categories__btn--active").textContent.trim().toLowerCase();try{if(e!=="all"){const{data:r,total:s}=await p(e,c);i(r),l(s,c)}else{const{data:r,total:s}=await u(c);i(r),l(s,c)}const o=a.elProducts.querySelector(".products__item");v(o)}catch(o){console.log(o.message)}finally{a.loadMoreButton.disabled=!1}}
//# sourceMappingURL=index.js.map
