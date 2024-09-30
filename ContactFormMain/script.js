"use strict";

/* -------- Form Authentication -------------*/
const form = document.querySelector("#form");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const alertMes = document.querySelector(".alert-mes");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkForm()) {
    alertMes.style.display = "block";
    submitForm();
  }
});

// Form Validation
function checkForm() {
  let isValid = true;

  // First Name Check
  if (fname.value === "") {
    fname.classList.add("error-state");
    document.querySelector(".fname-error").style.display = "block";
    fname.focus();
    isValid = false;
  } else {
    fname.classList.remove("error-state");
    document.querySelector(".fname-error").style.display = "none";
  }

  // Last Name Check
  if (lname.value === "") {
    lname.classList.add("error-state");
    document.querySelector(".lname-error").style.display = "block";
    lname.focus();
    isValid = false;
  } else {
    lname.classList.remove("error-state");
    document.querySelector(".lname-error").style.display = "none";
  }

  // Email Check
  if (email.value === "") {
    email.classList.add("error-state");
    document.querySelector(".email-error").style.display = "block";
    email.focus();
    isValid = false;
  } else {
    email.classList.remove("error-state");
    document.querySelector(".email-error").style.display = "none";
  }

  // Query Check
  if (!radioChecked()) {
    document.querySelector(".query-error").style.display = "block";
    isValid = false;
  } else {
    document.querySelector(".query-error").style.display = "none";
  }

  // Message Check
  if (message.value === "") {
    message.classList.add("error-state");
    document.querySelector(".msg-error").style.display = "block";
    isValid = false;
  } else {
    message.classList.remove("error-state");
    document.querySelector(".msg-error").style.display = "none";
  }

  // Checkbox Check
  if (!document.querySelector("#checkbox").checked) {
    document.querySelector(".contract-error").style.display = "block";
    isValid = false;
  } else {
    document.querySelector(".contract-error").style.display = "none";
  }

  return isValid;
}

// Checking if the radio is checked.
function radioChecked() {
  const radios = document.getElementsByName("query");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return true;
    }
  }
  return false;
}

// Reset the error message
fname.addEventListener("input", () => {
  document.querySelector(".fname-error").style.display = "none";
  if (fname.classList.contains("error-state")) {
    fname.classList.remove("error-state");
  }
});
lname.addEventListener("input", () => {
  document.querySelector(".lname-error").style.display = "none";
});
email.addEventListener("input", () => {
  document.querySelector(".email-error").style.display = "none";
});
message.addEventListener("input", () => {
  document.querySelector(".msg-error").style.display = "none";
});
document.querySelector("#checkbox").addEventListener("input", () => {
  document.querySelector(".contract-error").style.display = "none";
});
document.querySelector("#message").addEventListener("input", () => {
  document.querySelector(".msg-error").style.display = "none";
});
document.querySelector("input[type='radio']").addEventListener("input", () => {
  document.querySelector(".query-error").style.display = "none";
});

// Checking the radio button when clicking on the radio class
document.querySelectorAll(".radio").forEach((radio) => {
  radio.addEventListener("click", () => {
    document.querySelectorAll(".radio").forEach((radio) => {
      if (radio.classList.contains("checked-radio")) {
        radio.classList.remove("checked-radio");
      }
    });
    const radioElement = radio.querySelector("input[type='radio']");
    radioElement.checked = true;
    radioElement.parentElement.classList.add("checked-radio");
  });
});

function submitForm() {
  const formData = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submition failed");
      }
    })
    .catch((error) => {
      console.error("Form submission error", error);
    });
}
