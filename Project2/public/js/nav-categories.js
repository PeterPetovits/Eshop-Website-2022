window.onload = function(){
    let categoriesTemplate = document.getElementById("product-categories-template").innerHTML;

    console.log(categoriesTemplate)

    let compiledTemplate = Handlebars.compile(categoriesTemplate);

    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch("https://wiki-shop.onrender.com/categories", init)
    .then(function(response){
       return response.json();
    })
    .then(function(obj){
        let content = compiledTemplate(obj);
        let div = document.getElementById("multi-items");
        div.innerHTML = content;
    })
    .catch(error =>{
        console.log(error);
    })
}