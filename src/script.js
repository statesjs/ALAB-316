let usernameEl = document.getElementById("username");
let emailEl = document.getElementById("email");
let pass = document.getElementById("password");
let regisFormEl = document.getElementById("registration");
let errorBox = document.getElementById("errorDisplay");
let passCheck = document.getElementById("passwordCheck");
let tnc = document.getElementById("checkbox");
//DATASET FOR USERS IN LOCAL

//
regisFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //needs to be in the function to be able to update
  let users = JSON.parse(localStorage.getItem("USERDATA")) || {};
  let messages = []; // to collect and push to errorbox
  const USER = usernameEl.value.trim().toLowerCase(); //
  const EMAIL = emailEl.value.trim().toLowerCase(); // email to string
  const PASS = pass.value.trim(); //password
  const PASSCHECK = passCheck.value.trim(); //password check
  //user name section
  if (USER === "") {
    messages.push("Username is required.");
  } else {
    if (USER.length < 4) {
      messages.push("Username must be at least 4 characters long.");
    }
    // Ensure at least two unique characters using a Set
    if (new Set(USER).size < 2) {
      messages.push("Username must have at least 2 unique characters.");
    }
    if (!/^[a-zA-Z0-9]+$/.test(USER)) {
      messages.push("Username must not contain special characters or spaces.");
    }
  }

  //email section
  if (EMAIL === "") {
    messages.push("Email is empty.");
  } else {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(EMAIL)) {
      messages.push("Email is not a valid address");
    }
    // Ensure email is NOT from "example.com"
    else if (EMAIL.endsWith("@example.com")) {
      messages.push("Email contains example.com");
    }
  }

  if (PASS === "") {
    messages.push("Password is required.");
  } else {
    if (PASS.length < 12) {
      messages.push("Password must be at least 12 characters long.");
    }
    if (!/[A-Z]/.test(PASS) || !/[a-z]/.test(PASS)) {
      messages.push(
        "Password must contain at least one uppercase and one lowercase letter."
      );
    }
    if (!/[0-9]/.test(PASS)) {
      messages.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(PASS)) {
      messages.push("Password must contain at least one special character.");
    }
    if (PASS.toLowerCase().includes("password")) {
      messages.push('Password cannot contain the word "password".');
    }
    if (PASS.toLowerCase().includes(USER.toLowerCase())) {
      messages.push("Password cannot contain the username.");
    }
    if (PASS !== PASSCHECK) {
      messages.push("Passwords do not match.");
    }
  }

  //tnc checked
  if (!tnc.checked) {
    messages.push("You must accept the Terms & Conditions.");
  }
  // check if username already exists
  if (users.hasOwnProperty(USER)) {
    messages.push("Username already taken.");
  }
  // check if email is already registered
  for (let existingUser in users) {
    if (users[existingUser].email === EMAIL) {
      messages.push("Email already exists.");
      break;
    }
  }

  //error box display that fires if at least one error message caught
  if (messages.length > 0) {
    errorBox.style.backgroundColor = "#fcc";
    errorBox.style.color = "red";
    errorBox.innerHTML = messages.join("<br>"); // makes errors not crumpled up
    errorBox.style.display = "block"; // change display from none
    return;
  } else {
    regisFormEl.reset();
    errorBox.style.display = "block";
    errorBox.style.color = "green";
    errorBox.style.backgroundColor = "greenyellow";
    errorBox.innerHTML = "Success!";
    // template for making the top level key the username, and the user info inside of it
    users[USER] = {
      email: EMAIL,
      pass: PASS,
    };

    localStorage.setItem("USERDATA", JSON.stringify(users));
  }
});

//Part 4

let loginFormEl = document.getElementById("login");
let loginUser = document.getElementById("loginUser");
let loginPass = document.getElementById("loginPassword");
let keepMe = document.getElementById("keepMe");

//
loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("USERDATA")) || {};
  let userLogin = loginUser.value.trim().toLowerCase();
  let messages = [];

  //login not empty
  if (userLogin === "") {
    messages.push("Login field is missing.");
  } else {
    //login username validation
    if (!users.hasOwnProperty(userLogin)) {
      messages.push("Username doesn't exist");
    }
  }
  //login password validation
  let userPass = loginPass.value.trim();
  if (userPass === "") {
    messages.push("Login password is missing.");
    //username needs to be checked again, otherwise if its non-existant, itll throw an error instead of a false
  } else if (
    users.hasOwnProperty(userLogin) &&
    users[userLogin].pass !== userPass
  ) {
    messages.push("Incorrect password.");
  }

  //error box
  if (messages.length > 0) {
    e.preventDefault();
    errorBox.innerHTML = messages.join("<br>"); // makes errors not crumpled up
    errorBox.style.display = "block"; // change display from none
    return;
  }

  loginFormEl.reset();
  messages.push("Success!");
  errorBox.innerHTML = messages;
  errorBox.style.display = "block";
  errorBox.style.backgroundColor = "greenyellow";
  errorBox.style.color = "green";
  if (keepMe.checked) {
    messages.push("We will keep you logged in.");
    errorBox.innerHTML = messages.join("<br>");
  }
});
