window.onload=function(){
   let products_template = document.getElementById("products-template").innerHTML;
   let subcategories_aside_menu_template = document.getElementById("subcategories-aside-menu").innerHTML;

   let compiledTemplate = Handlebars.compile(products_template);
   let compiledTemplateAsideMenu = Handlebars.compile(subcategories_aside_menu_template);

   var subcategories_id = document.getElementById("aside-category-menu");

   let myHeaders = new Headers();
   myHeaders.append('Accept', 'application/json');

   let init = {
      method: "GET",
      headers: myHeaders
   };

   let url_str = window.location.href;
   let url = new URL(url_str);
   let search_params = url.searchParams;


   if(search_params.get('categoryId')==1){
      fetch("https://wiki-shop.onrender.com/categories/1/products",init)
      .then(function(response){
         return response.json();
      })
      .then(function(obj){
         let content = compiledTemplate(obj);
         let div = document.getElementById("multi-items");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured",error);
      })

      fetch("https://wiki-shop.onrender.com/categories/1/subcategories", init)
      .then(function(response){
         return response.json();
      })
      .then(function(obj){
         let content = compiledTemplateAsideMenu(obj);
         let div = document.getElementById("aside-subcategory-menu");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured", error);
      })
   }

   if(search_params.get('categoryId')==2){
      fetch("https://wiki-shop.onrender.com/categories/2/products",init)
      .then(function(response){
         return response.json();
      })
      .then(function(obj){
         let content = compiledTemplate(obj);
         console.log(obj);
         let div = document.getElementById("multi-items");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured",error);
      })

      fetch("https://wiki-shop.onrender.com/categories/2/subcategories", init)
      .then(function(response){
         return response.json();
      })
      .then(function(obj){
         let content = compiledTemplateAsideMenu(obj);
         let div = document.getElementById("aside-subcategory-menu");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured", error);
      })
   }

   if(search_params.get('categoryId')==3){
      fetch("https://wiki-shop.onrender.com/categories/3/products",init)
      .then(function(response){
         return response.json();
      })
      .then(function(obj){
         let content = compiledTemplate(obj);
         console.log(obj);
         let div = document.getElementById("multi-items");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured",error);
      })

      fetch("https://wiki-shop.onrender.com/categories/3/subcategories", init)
      .then(function(response){
         return response.json();
      })
      .then(function(obj){
         let content = compiledTemplateAsideMenu(obj);
         let div = document.getElementById("aside-subcategory-menu");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured", error);
      })
   }


   div.onchange = function(){
      console.log(subcategories_aside_menu_template.dataset.test);
   }
}

