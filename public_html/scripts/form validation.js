
function validateForm() {
    //declear all nodes
    let fnameInput = document.getElementById("fname");
    let lnameInput = document.getElementById("lname");
    let emailInput = document.getElementById("email");
    let mobileInput = document.getElementById("mobile");
    let messageInput = document.getElementById("message");
    let fnameValidation = document.getElementById("fnameValidation");
    let lnameValidation = document.getElementById("lnameValidation");
    let emailValidation = document.getElementById("emailValidation");
    let mobileValidation = document.getElementById("mobileValidation");
    let messageValidation = document.getElementById("messageValidation");

    //clear validation area at start
    fnameValidation.innerHTML = ""
    fnameValidation.classList.remove("text-success", "text-danger", "form-text");
    lnameValidation.innerHTML = ""
    lnameValidation.classList.remove("text-success", "text-danger", "form-text");
    emailValidation.innerHTML = ""
    emailValidation.classList.remove("text-success", "text-danger", "form-text");
    mobileValidation.innerHTML = ""
    mobileValidation.classList.remove("text-success", "text-danger", "form-text");
    messageValidation.innerHTML = ""
    messageValidation.classList.remove("text-success", "text-danger", "form-text");
    
    
    let validated = true;

    //fname validation
    if (fnameInput.value.trim() != "" && fnameInput.value.trim().length <= 100)
    {
        fnameValidation.innerHTML = "<p> Valid input. </p>";
        fnameValidation.classList.add("text-success", "form-text");
    }
    else
    {
        fnameValidation.innerHTML = "<p> Invalid input. Must be between 1-100 characters.</p>";
        fnameValidation.classList.add("text-danger", "form-text");
        validated = false;
    }

    //lname validation
    if (lnameInput.value.trim() != "" && lnameInput.value.trim().length <= 100)
        {
            lnameValidation.innerHTML = "<p> Valid input. </p>";
            lnameValidation.classList.add("text-success", "form-text");
        }
        else
        {
            lnameValidation.innerHTML = "<p> Invalid input. Must be between 1-100 characters.</p>";
            lnameValidation.classList.add("text-danger", "form-text");
            validated = false;
        }

    //email validation
    if (emailInput.value.trim().includes("@"))
    {
        emailValidation.innerHTML = "<p> Valid input. </p>";
        emailValidation.classList.add("text-success", "form-text");
    }
    else
    {
        emailValidation.innerHTML = "<p> Invalid input. Must contain @.</p>";
        emailValidation.classList.add("text-danger", "form-text");
        validated = false;
    }

    //mobile validation
    if (/^\d{10}$/.test(mobileInput.value.trim()))
    {
        mobileValidation.innerHTML = "<p> Valid input. </p>";
        mobileValidation.classList.add("text-success", "form-text");
    }
    else
    {
        mobileValidation.innerHTML = "<p> Invalid input. Must be 10 digits. </p>";
        mobileValidation.classList.add("text-danger", "form-text");
        validated = false;
    }

    //message validation
    if (messageInput.value.trim() != "")
        {
            messageValidation.innerHTML = "<p> Valid input. </p>";
            messageValidation.classList.add("text-success", "form-text");
        }
        else
        {
            messageValidation.innerHTML = "<p> Invalid input. Can not be empty. </p>";
            messageValidation.classList.add("text-danger", "form-text");
            validated = false;
        }

    return validated;
}

function resetForm() {
    let fnameValidation = document.getElementById("fnameValidation");
    let lnameValidation = document.getElementById("lnameValidation");
    let emailValidation = document.getElementById("emailValidation");
    let mobileValidation = document.getElementById("mobileValidation");
    let messageValidation = document.getElementById("messageValidation");

    //clear validation area at start
    fnameValidation.innerHTML = ""
    fnameValidation.classList.remove("text-success", "text-danger", "form-text");
    lnameValidation.innerHTML = ""
    lnameValidation.classList.remove("text-success", "text-danger", "form-text");
    emailValidation.innerHTML = ""
    emailValidation.classList.remove("text-success", "text-danger", "form-text");
    mobileValidation.innerHTML = ""
    mobileValidation.classList.remove("text-success", "text-danger", "form-text");
    messageValidation.innerHTML = ""
    messageValidation.classList.remove("text-success", "text-danger", "form-text");
}