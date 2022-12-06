//Validation rule for email format
window.addEventListener('load', function(){

    const email = this.document.getElementById('email')

    email.oninput = function(){
        if(email.validity.typeMismatch){
            email.setCustomValidity('Please provide the correct email format')
            email.style.borderColor = "red";
        }else{
            email.setCustomValidity('')
        }
    }
})

//checks if home address has a specific pattern
window.addEventListener('load', function(){

    const homeAdress = this.document.getElementById('home-address')

    homeAdress.oninput = function(){
        if(homeAdress.validity.patternMismatch){
            homeAdress.setCustomValidity('incorrect address')
            homeAdress.style.borderColor = "red";
        }else{
            homeAdress.setCustomValidity('')
        }
    }
})

//checks if user is above 18
window.addEventListener('load', function(){

    const birthday = document.getElementById('birthday')

    birthday.addEventListener('change', function(){
        let currentYear = new Date().getUTCFullYear()

        let dates = birthday.value.split("-")
        
        if(currentYear - dates[0] < 18){
            birthday.setCustomValidity('Under 18 not allowed to sign up')
            birthday.style.borderColor = "red";
        }else{
            birthday.setCustomValidity('')
        }
    })
})

//checks if the two passwords match to each other
window.addEventListener('load', function(){

    const pass1 = this.document.getElementById('password')
    const pass2 = this.document.getElementById('password2')

    pass2.onchange = function(){
        if(pass1.value === pass2.value){
            pass2.setCustomValidity('')
            pass2.style.borderColor = "green";
        }else{
            pass2.setCustomValidity('Please type the same password as above')
            pass2.style.borderColor = "red";
        }
    }
    
})

//check if the user has checked at least one checkbox
window.addEventListener('load', function(){

    let checkbox1 = this.document.getElementById('ad1')
    let checkbox2 = this.document.getElementById('ad2')
    let checkbox3 = this.document.getElementById('ad3')
    let checkbox4 = this.document.getElementById('ad4')

    this.window.addEventListener('input', function(){
        if(checkbox1.checked || checkbox2.checked || checkbox3.checked || checkbox4.checked){
            checkbox1.setCustomValidity('')
        }else{
            checkbox1.setCustomValidity('Please check at least one checkbox')
        }
    })
})

/*
check if question one is answered. If not ,tells the user to answer it.
If yes checks if questions two and three have been answered, because if question one
is answered so does question two and three.
*/
window.addEventListener('load', function(){

    let signUpButton = this.document.getElementById('btn_sub_acc')

    let q1 = this.document.getElementById('q1')
    let q2 = this.document.getElementById('q2')
    let q3 = this.document.getElementById('q3')
    let q4 = this.document.getElementById('q4')
    let q5 = this.document.getElementById('q5')

    signUpButton.addEventListener('click', function(){
        
        let selectedValueQ1 = q1.options[q1.selectedIndex].value
        let selectedValueQ2 = q2.options[q2.selectedIndex].value
        let selectedValueQ3 = q3.options[q3.selectedIndex].value
        let selectedValueQ4 = q4.options[q4.selectedIndex].value
        let selectedValueQ5 = q5.options[q5.selectedIndex].value

        if(selectedValueQ1 !== "select"){
            if(selectedValueQ2 == "select" && selectedValueQ3 == "select"){
                q1.setCustomValidity('If question 1 is selected please answer questions 2 and 3 as well')
                q1.style.borderColor = "red";
                q2.style.borderColor = "red";
                q3.style.borderColor = "red";
            }else if(selectedValueQ2 == "select" || selectedValueQ3 == "select"){
                q1.setCustomValidity('If question 1 is selected please answer questions 2 and 3 as well')
                q2.style.borderColor = "red";
                q3.style.borderColor = "red";
            }else{
                q1.setCustomValidity('')
            }
        }else{
            q1.setCustomValidity('Please do not skip it')
            q1.style.borderColor = "red";
            q2.style.borderColor = "red";
            q3.style.borderColor = "red";
            q4.style.borderColor = "red";
            q5.style.borderColor = "red";
        }
    })
})