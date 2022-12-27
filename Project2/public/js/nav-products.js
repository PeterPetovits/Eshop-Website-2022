var userInputCategory;
var compiledTemplate;
var compiledTemplateAsideMenu;
var productsCategory;
var loggedIn = false;
var globalUserName;
var globalSessionId;

window.onload=function(){
   let products_template = document.getElementById("products-template").innerHTML;
   let subcategories_aside_menu_template = document.getElementById("subcategories-aside-menu").innerHTML;

   compiledTemplate = Handlebars.compile(products_template);
   compiledTemplateAsideMenu = Handlebars.compile(subcategories_aside_menu_template);

   var subcategories_id = document.getElementById("aside-subcategory-menu");

   let myHeaders = new Headers();
   myHeaders.append('Accept', 'application/json');

   let init = {
      method: "GET",
      headers: myHeaders
   };

   let url_str = window.location.href;
   let url = new URL(url_str);
   let search_params = url.searchParams;
   userInputCategory = search_params.get('categoryId');

   //fetch for products in category
   fetch("https://wiki-shop.onrender.com/categories/"+userInputCategory+"/products",init)
   .then(function(response){
      return response.json();
   })
   .then(function(obj){
      productsCategory = obj;
      printProductsPerUserChoise(productsCategory);
   })
   .catch(error=>{
      console.log("an error occured",error);
   })

   //fetch for menu options in one category
   fetch("https://wiki-shop.onrender.com/categories/"+userInputCategory+"/subcategories", init)
   .then(function(response){
      return response.json();
   })
   .then(function(obj){
      printSubcategoriesAsideMenu(obj);
   })
   .catch(error=>{
      console.log("an error occured", error);
   })   


   subcategories_id.onchange = function(){
      let radioButtons = document.getElementsByName("categories-titles");
      let userChoise;
      
      for(let i = 0; i < radioButtons.length; i++){
         if(radioButtons[i].checked){
            userChoise = radioButtons[i].dataset.categoryId;
         }
      }

      let smallData = [];
      for(let i = 0; i < productsCategory.length; i++){
         if(productsCategory[i].subcategory_id == userChoise){
            smallData.push(productsCategory[i]);
         }else if(userChoise == "all"){
            smallData.push(productsCategory[i]);
         }
      }        
      
      printProductsPerUserChoise(smallData);
   } 
}

function login(){
   let userName = document.getElementById("username").value;
   let passWord = document.getElementById("password").value;

   let myHeaders = new Headers();
   myHeaders.append('Accept', '*/*');
   myHeaders.append("Content-type", "application/json");

   let init = {
      method: "GET",
      headers: myHeaders
   };

   fetch("http://127.0.0.1:3000/login-service?userName=" + userName + "&passWord=" + passWord, init)
   .then(function(response){
      return response.json();
   })
   .then(function(result){
      if(result.ResponseCode == 200){
         loggedIn = true;
         globalUserName = userName;
         globalSessionId = result.sessionId;
         document.getElementById("login-result").innerHTML = "Login Successful";
      }else{
         document.getElementById("login-result").innerHTML = "Login Failed";
      }
   })
   .catch(error=>{
      console.log("an error occured", error);
   })

   setTimeout(countProducts, 2000);
}

function printProductsPerUserChoise(data){
   let content = compiledTemplate(data);
   let div = document.getElementById("multi-items");
   div.innerHTML = content;
}

function printSubcategoriesAsideMenu(data){
   let content = compiledTemplateAsideMenu(data);
   let div = document.getElementById("aside-subcategory-menu");
   div.innerHTML = content;
}

function addToCart(title, cost, image){
   if(loggedIn == false){
      window.alert("Please connect to add products in cart");
   }else{
      //check the user later 

      let myHeaders = new Headers();
      myHeaders.append('Accept', '*/*');
      myHeaders.append("Content-type", "application/json");

      let init = {
         method: "POST",
         headers: myHeaders
      };

      //fetch for service cart item addition
      fetch("http://127.0.0.1:3000/cart-item-service?title=" + title + "&cost=" + cost + "&image=" + image + "&userName=" + globalUserName + "&sessionId=" + globalSessionId, init)
      .then(function(response){
         return response.json();
      })
      .then(function(result){
         if(result.ResponseCode == 200){
            document.getElementById("product-addition-" + title).innerHTML = "Item Added";
         }
      })
      .catch(error=>{
         console.log("an error occured", error);
      })

      setTimeout(countProducts, 1000);
   }  
}

function countProducts(){
   let myHeaders = new Headers();
   myHeaders.append('Accept', '*/*');
   myHeaders.append("Content-type", "application/json");

   let init = {
      method: "GET",
      headers: myHeaders
   };

   //fetch for service cart size
   fetch("http://127.0.0.1:3000/cart-size-service?userName=" + globalUserName + "&sessionId=" + globalSessionId, init)
   .then(function(response){
      return response.json();
   })
   .then(function(result){
      if(result.ResponseCode == 200){
         document.getElementById("cart-counter").innerHTML = result.size;
      }
   })
   .catch(error=>{
      console.log("an error occured", error);
   })
}