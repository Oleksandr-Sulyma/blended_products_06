import"./assets/styles-JE8YjOlG.js";import{a as p}from"./assets/vendor-N5iQpiFS.js";const c=12,a=p.create({baseURL:"https://dummyjson.com/products"}),i=async(t=1)=>{try{return(await a.get(`?limit=${c}&skip=${(t-1)*c}&select=id,thumbnail,title,brand,category,price`)).data.products}catch(e){throw e}},m=async t=>{try{return(await a.get(`/${t}?select=id,thumbnail,title,tags,description,warrantyInformation,returnPolicy,price`)).data}catch(e){throw e}},_=async()=>{try{return(await a.get("/category-list")).data}catch(t){throw t}},g=async(t,e=1)=>{try{return(await a.get(`/category/${t}?limit=${c}&skip=${(e-1)*c}&select=id,thumbnail,title,brand,category,price`)).data.products}catch(r){throw r}},o={elCategories:document.querySelector(".categories"),elProducts:document.querySelector(".products"),cardProduct:document.querySelector(".modal-product"),modal:document.querySelector(".modal")};function y(t){t.unshift("All");const e=t.map(r=>`
     <li class="categories__item">
      <button class="categories__btn ${r==="All"?"categories__btn--active":""}" type="button">${r}</button>
    </li>`).join("");o.elCategories.insertAdjacentHTML("beforeend",e)}function b(t){return t.map(({id:e,thumbnail:r,title:s,brand:l,category:d,price:u})=>`
    <li class="products__item" data-id="${e}">
    <img class="products__image" src="${r}" alt="${s}"/>
    <p class="products__title">${s}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${l}</span></p>
    <p class="products__category">Category:${d} </p>
    <p class="products__price">Price: ${u}$</p>
 </li>`).join("")}function n(t){o.elProducts.insertAdjacentHTML("beforeend",b(t))}function P(t){const e=t.tags.map(r=>`<li>${r}</li>`).join("");return`
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
    `}function $(t){o.cardProduct.innerHTML=P(t)}function f(){o.cardProduct.innerHTML="",o.modal.classList.remove("modal--is-open")}async function h(){try{const t=await _();y(t);const e=await i();n(e)}catch(t){console.log(t.message)}}h();o.elCategories.addEventListener("click",L);async function L(t){if(t.preventDefault(),!t.target.classList.contains("categories__btn"))return;t.currentTarget.querySelector(".categories__btn--active").classList.remove("categories__btn--active");const e=t.target.closest(".categories__btn"),r=e.textContent.trim().toLowerCase();e.classList.add("categories__btn--active"),o.elProducts.innerHTML="";try{if(r!=="all"){const s=await g(r);n(s)}else{const s=await i();n(s)}}catch(s){console.log(s.message)}}o.elProducts.addEventListener("click",w);async function w(t){t.preventDefault();const e=t.target.closest(".products__item");if(!e)return;o.modal.classList.add("modal--is-open");const r=e.dataset.id;try{const s=await m(r);$(s)}catch(s){console.log(s.message)}}o.modal.addEventListener("click",C);function C(t){if(t.preventDefault(),t.target.classList.contains("modal__close-btn"))return f()}
//# sourceMappingURL=index.js.map
