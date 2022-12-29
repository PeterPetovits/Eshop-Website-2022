window.onload=function(){
    //fetching the added items via the specified url
    //selecting the specific html elements to apply the fetched data via handlebars

    let cartTemplate = document.getElementById("products-cart-template").innerHTML;

    let compiledTemplate = Handlebars.compile(cartTemplate);

    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    };

    let url_str = window.location.href;
    let url = new URL(url_str);
    let search_params = url.searchParams;
    let username = search_params.get('userName');
    let userSessionId = search_params.get('sessionId');

    fetch("http://127.0.0.1:3000/cart-retrieval-service?userName=" + username + "&sessionId=" + userSessionId,init)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        let content = compiledTemplate(result);
        let div = document.getElementById("multi-items");
        div.innerHTML = content;
    })
    .catch(error=>{
        console.log("an error occured", error);
    })
}