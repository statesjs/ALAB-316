let usernameEl = document.getElementById("username");
let emailEl = document.getElementById("email");
let formEl = document.getElementById("registration");
let errorBox = document.getElementById("errorDisplay");

formEl.addEventListener("submit", (e) => {
  let messages = []; // to collect and push to errorbox
  let user = usernameEl.value.trim(); //
  let email = emailEl.value.trim(); // email to string

  //user name section
  if (user === "") {
    messages.push("Username is required.");
  } else {
    if (user.length < 4) {
      messages.push("Username must be at least 4 characters long.");
    }
    // Ensure at least two unique characters using a Set
    if (new Set(user).size < 2) {
      messages.push("Username must have at least 2 unique characters.");
    }
    if (!/^[a-zA-Z0-9]+$/.test(user)) {
      messages.push("Username must not contain special characters or spaces.");
    }
  }

  //email section
  if (email === "") {
    messages.push("Email is empty");
  } else {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      messages.push("Email is not a valid address");
    }
    // Ensure email is NOT from "example.com"
    else if (email.toLowerCase().endsWith("@example.com")) {
      messages.push("Email contains example.com");
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
