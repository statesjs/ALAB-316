let usernameEl = document.getElementById("username");
let emailEl = document.getElementById("email");
let pass = document.getElementById("password");
let formEl = document.getElementById("registration");
let errorBox = document.getElementById("errorDisplay");
let passCheck = document.getElementById("passwordCheck");
let tnc = document.getElementById("checkbox");
//
formEl.addEventListener("submit", (e) => {
  let messages = []; // to collect and push to errorbox
  const USER = usernameEl.value.trim(); //
  const EMAIL = emailEl.value.trim(); // email to string
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
    else if (EMAIL.toLowerCase().endsWith("@example.com")) {
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

  //error box display that fires if at least one error message caught
  if (messages.length > 0) {
    e.preventDefault();
    errorBox.innerHTML = messages.join("<br>"); // Show errors
    errorBox.style.display = "flex"; // Display error box
  } else {
    errorBox.style.display = "none";
  }
});
