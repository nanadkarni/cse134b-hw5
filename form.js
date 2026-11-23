//variables
console.log("form form form");
const characterLimit = 500;
let remaining = 500;
let form_errors=[];

const emailAddress = document.querySelector("#email");
const usersName = document.querySelector("#name");
const currCharCount = document.querySelector("#char-count");
const comments = document.querySelector("#comments");
const emailError = document.getElementById('email-error');
const blankError = document.getElementById('name-error');

const blankEmailError = "Please fill in an email";

//email check
function checkEmail(){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(pattern.test(emailAddress.valueMissing)){
        emailAddress.setCustomValidity(blankEmailError);
        emailError.textContent(blankEmailError);
    }
    else if (pattern.test(emailAddress.value)==false){
        emailAddress.setCustomValidity("Please enter a valid email address, with an @ and a valid domain");
    }
    else{
        emailAddress.setCustomValidity("");
    }
}

function charCount(theInput){
    const input = theInput.target;
    const currValidity = input.validity;
    if (currValidity.valueMissing){
        input.setCustomValidity("This field is empty! Please fill it out");
    }
    else if (currValidity.tooLong){
        input.setCustomValidity("You are over the character limit!");
    }
    else if (currValidity.tooShort){
        input.setCustomValidity("You are under the character count");
    }
    else{
        input.setCustomValidity("");
    }
    input.reportValidity();
}

function charactersRemaining(text, limit) {
    return limit - text.length;
}

function countdown(theInput){
    const input = theInput.target;
    const remaining = charactersRemaining(input.value, characterLimit);
    if (remaining<=0){
        currCharCount.textContent = `${remaining*-1} over the limit`
    }
    else if (remaining<50){
        currCharCount.textContent = `${remaining} characters left`;
    }

    else{
        currCharCount.textContent ="";
    }
}



emailAddress.addEventListener("input", checkEmail);
usersName.addEventListener("input", charCount);
comments.addEventListener("input", charCount);
usersName.addEventListener("input", countdown);
comments.addEventListener("input", countdown);