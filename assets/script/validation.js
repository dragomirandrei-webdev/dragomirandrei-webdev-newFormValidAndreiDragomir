const form = document.getElementById("form");
const login = document.getElementById("login");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const signInBox = document.getElementById("signIn");
const successBox = document.getElementById("success");
const successLogInBox = document.getElementById("successLogInBox");

const loginEmail = document.getElementById("emailLogin");
const loginPwd = document.getElementById("passwordLogin");

let validLoginEmail = false;
let validLoginPwd = false;

let passw = /[0-9]/g;
let validUsername = false;
let validEmail = false;
let validPwd = false;
let validPwd2 = false;

// let isSignInVisible = true;
// let isLogInVisible = false;

function sendToSuccesPage() {
  if (validUsername && validEmail && validPwd && validPwd2) {
    // return window.location.replace("../assets/pages/success.html");
    signInBox.style.display = "none";
    successBox.style.display = "block";
  } else {
    return;
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  checkInputs();

  // if (isSignInVisible) {
  //   checkInputs();
  // } else if (isLogInVisible) {
  //   checkLogin();
  // } //else {
  //return
  //}
});

login.addEventListener("submit", e => {
  e.preventDefault();

  checkLogin();
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "Username cannot be blank");
  } else if (usernameValue.length < 5) {
    setErrorFor(username, "Username should be longer than 4 characters.");
  } else {
    setSuccessFor(username);
    validUsername = true;
    localStorage.setItem("username", usernameValue);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
    validEmail = true;
    localStorage.setItem("email", emailValue);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "Password must be longer than 6 characters.");
  } else if (!passwordValue.match(passw)) {
    setErrorFor(password, "Password should contain at least one number.");
  } else {
    setSuccessFor(password);
    validPwd = true;
    localStorage.setItem("password", passwordValue);
  }

  if (password2Value === "") {
    setErrorFor(password2, "Please confirm your password");
  } else if (passwordValue !== password2Value) {
    setErrorFor(password2, "Passwords does not match");
  } else if (!password2Value.match(passw)) {
    setErrorFor(password2, "Password should contain at least one number.");
  } else if (password2Value.length < 7) {
    setErrorFor(password2, "Password must be longer than 6 characters.");
  } else {
    setSuccessFor(password2);
    validPwd2 = true;
  }
}

function checkLogin() {
  const loginEmailValue = loginEmail.value.trim();
  const loginPwdValue = loginPwd.value.trim();

  if (loginEmailValue === "") {
    return;
  } else if (loginEmailValue != localStorage.email) {
    setErrorFor(loginEmail, "No account with this email.");
  } else {
    setSuccessFor(loginEmail);
    validLoginEmail = true;
  }

  if (loginPwdValue == "") {
    return;
  } else if (loginPwdValue != localStorage.password) {
    setErrorFor(loginPwd, "Password does not match.");
  } else {
    setSuccessFor(loginPwd);
    validLoginPwd = true;
  }

  if (validLoginEmail && validLoginPwd) {
    login.style.display = "none";
    successBox.style.display = "none";
    successLogInBox.style.display = "block";
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; // .form-control
  const small = formControl.querySelector("small");

  // add error message inside small
  small.innerText = message;

  // add error class
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
