window.onload=function(){
   let products_template = document.getElementById("products-template").innerHTML;

   let compiledTemplate = Handlebars.compile(products_template);

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
         console.log(obj);
         let div = document.getElementById("multi-items");
         div.innerHTML = content;
      })
      .catch(error=>{
         console.log("an error occured",error);
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
   }
}