
function showError(field, message) {
  clearError(field); // remove any old error first

  field.style.borderColor = "#c0392b";

  var errorSpan = document.createElement("span");
  errorSpan.className = "error-msg";
  errorSpan.style.cssText =
    "color:#c0392b;font-size:13px;display:block;margin-top:4px;";
  errorSpan.textContent = message;

  field.parentNode.insertBefore(errorSpan, field.nextSibling);
}

function clearError(field) {
  field.style.borderColor = "#27ae60";
  var existing = field.parentNode.querySelector(".error-msg");
  if (existing) existing.remove();
}

function validateName(field) {
  var value = field.value.trim();
  if (value === "") {
    showError(field, "Please enter your full name.");
    return false;
  }
  if (value.length < 2) {
    showError(field, "Name must be at least 2 characters.");
    return false;
  }
  clearError(field);
  return true;
}

function validateEmail(field) {
  var value = field.value.trim();
  if (value === "") {
    showError(field, "Please enter your email address.");
    return false;
  }
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!pattern.test(value)) {
    showError(field, "Please enter a valid email (e.g. name@example.com).");
    return false;
  }
  clearError(field);
  return true;
}

function validateMessage(field) {
  var value = field.value.trim();
  if (value === "") {
    showError(field, "Please enter your message.");
    return false;
  }
  if (value.length < 10) {
    showError(field, "Message must be at least 10 characters.");
    return false;
  }
  clearError(field);
  return true;
}

function attachLiveValidation(form) {
  if (!form) return;

  var nameField    = form.querySelector("#name");
  var emailField   = form.querySelector("#email");
  var messageField = form.querySelector("#message");

  if (nameField) {
    nameField.addEventListener("blur", function () { validateName(nameField); });
    nameField.addEventListener("input", function () {
      if (nameField.style.borderColor === "rgb(192, 57, 43)") validateName(nameField);
    });
  }

  if (emailField) {
    emailField.addEventListener("blur", function () { validateEmail(emailField); });
    emailField.addEventListener("input", function () {
      if (emailField.style.borderColor === "rgb(192, 57, 43)") validateEmail(emailField);
    });
  }

  if (messageField) {
    messageField.addEventListener("blur", function () { validateMessage(messageField); });
    messageField.addEventListener("input", function () {
      if (messageField.style.borderColor === "rgb(192, 57, 43)") validateMessage(messageField);
    });
  }
}

function validateForm(form) {
  if (!form) return false;

  var nameField    = form.querySelector("#name");
  var emailField   = form.querySelector("#email");
  var messageField = form.querySelector("#message");

  var ok = true;
  if (nameField    && !validateName(nameField))    ok = false;
  if (emailField   && !validateEmail(emailField))  ok = false;
  if (messageField && !validateMessage(messageField)) ok = false;

  if (!ok) {
    var first = form.querySelector('[style*="rgb(192, 57, 43)"]');
    if (first) first.focus();
  }

  return ok;
}