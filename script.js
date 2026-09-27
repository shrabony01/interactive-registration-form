// step 1: select all dom elements
const form=document.getElementById('registrationForm');

// inputs
const usernameInput=document.getElementById('username');
const emailInput=document.getElementById('email');
const passwordInput=document.getElementById('password');
const confirmPasswordInput=document.getElementById('confirmPassword');


// spans
const usernameError=document.getElementById('usernameError');
const emailError=document.getElementById('emailError');
const passwordError=document.getElementById('passwordError');
const confirmPasswordError=document.getElementById('confirmPasswordError');

//  On page load, check if a username is saved in localStorage. If so, pre-fill the username field.
window.addEventListener('DOMContentLoaded',()=>{
    const savedUser =localStorage.getItem('savedUsername');
    if(savedUser){
        usernameInput.value=savedUser;
    }
});

// validate username
function validateUsername(){
    if(usernameInput.validity.valueMissing){
        usernameError.textContent='Username is required.';
        return false;
    }else if(usernameInput.validity.tooShort){
        usernameError.textContent=`Username must be at least ${usernameInput.minLength} characters.`;
        return false;
    }
    else{
        usernameError.textContent='';
        return true;
    }
}

// validate Email
function validateEmail(){
    if(emailInput.validity.valueMissing){
        emailError.textContent='Email adress is required.';
        return false;
    }
    else if(emailInput.validity.typeMismatch){
        emailError.textContent = 'Please enter a valid email address.';
        return false;
    }
    else{
        emailError.textContent = '';
        return true;
    }
}

// validate Password
function validatePassword(){
    if(passwordInput.validity.valueMissing){
        passwordError.textContent='Password is required.';
        return false;
    }
    else if(passwordInput.validity.tooShort){
        passwordError.textContent=`Password must be at least ${passwordInput.minLength} characters.`;
        return false;
    }
    else{
        passwordError.textContent='';
        return true;
    }
}

// validate confirm password
function validateConfirmPassword(){
    if(confirmPasswordInput.validity.valueMissing){
        confirmPasswordError.textContent='Please confirm your password.';
        return false;
    }
    else if(confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    return false;
  } else {
    confirmPasswordError.textContent = '';
    return true;
  }
}

// real time validation
usernameInput.addEventListener('input,validateUsername');
emailInput.addEventListener('input',validateEmail);
passwordInput.addEventListener('input',() =>{
    validatePassword();

    // recheck confirm field if password changes
    if(confirmPasswordInput.value.length>0){
        validateConfirmPassword();
    }
});
confirmPasswordInput.addEventListener('input',validateConfirmPassword);

// form submission

form.addEventListener('submit',(event)=>{
    // prevent page refress
    event.preventDefault();

    // run final validation across all fields
    const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  if (isFormValid) {
    // Save username in localStorage
    localStorage.setItem('savedUsername', usernameInput.value);

    alert(`Registration successful! Welcome, ${usernameInput.value}.`);

    // Reset inputs and error spans
    form.reset();
  } else {
    // Focus the first invalid field
    if (!isUsernameValid) {
      usernameInput.focus();
    } else if (!isEmailValid) {
      emailInput.focus();
    } else if (!isPasswordValid) {
      passwordInput.focus();
    } else if (!isConfirmPasswordValid) {
      confirmPasswordInput.focus();
    }
  }
});