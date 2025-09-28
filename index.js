import"./assets/styles-JE8YjOlG.js";import{a as s}from"./assets/vendor-N5iQpiFS.js";const r=s.create({baseURL:"https://dummyjson.com/products"}),n=async()=>{try{return(await r.get("/category-list")).data}catch(t){throw t}},c={elCategories:document.querySelector(".categories"),elProducts:document.querySelector(".products")};function a(t){t.unshift("All");const e=t.map(o=>`
     <li class="categories__item">
   <button class="categories__btn" type="button">${o}</button>
 </li>   
        `).join("");c.elCategories.insertAdjacentHTML("beforeend",e)}async function i(){try{const t=await n();a(t)}catch(t){console.log(t.message)}}i();
//# sourceMappingURL=index.js.map
