let usernameEl = document.getElementById("username");
let emailEl = document.getElementById("email");
let pass = document.getElementById("password");
let formEl = document.getElementById("registration");
let errorBox = document.getElementById("errorDisplay");
let passCheck = document.getElementById("passwordCheck");
formEl.addEventListener("submit", (e) => {
  let messages = []; // to collect and push to errorbox
  const USER = usernameEl.value.trim(); //
  const EMAIL = emailEl.value.trim(); // email to string
  const PASS = passwordEl.value.trim(); //password
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
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      messages.push("Email is not a valid address");
    }
    // Ensure email is NOT from "example.com"
    else if (EMAIL.toLowerCase().endsWith("@example.com")) {
      messages.push("Email contains example.com");
    }
  }

  if (PASS === "") {
    messages.push("Password is empty");
  } else {
    if (PASS.length <= 12) {
      //12 characters at least
      messages.push("Password must be at least 12 characters long.");
    }
    //one upper one lower
    else if (/[A-Z]/.test(PASS) && /[a-z]/.test(PASS)) {
      //lower and uppercase
      messages.push(
        "Password must contain at least one uppercase and one lowercase character."
      );
    } else if (/[0-9]/.test(PASS)) {
      // one number needed
      messages.push("Password requires at least one number.");
    } else if (!/[^a-zA-Z0-9]/.test(PASS)) {
      //special character test
      messages.push("Password cannot contain special characters.");
    } else if (PASS.toLowerCase().includes("password")) {
      //password cannot contain password, wtf does "mixed" mean?
      messages.push('Password cannot contain "password"');
    } else if (PASS.toLowerCase().includes(USER.toLowerCase)) {
      messages.push("Password cannot include the username.");
    } else if (PASS !== PASSCHECK) {
      messages.push("Passwords do not match.");
    }
  }

  //display box
  if (messages.length > 0) {
    e.preventDefault();
    errorBox.innerHTML = messages.join("<br>"); // errors display stacked
    errorBox.style.display = "flex"; // changes the display on the error box to show
  } else {
    errorBox.style.display = "none";
  }
});
