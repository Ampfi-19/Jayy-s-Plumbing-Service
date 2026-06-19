
document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  if (!form) return;

  if (!form.querySelector("#service")) {
    var serviceGroup = document.createElement("div");
    serviceGroup.style.marginBottom = "12px";

    var serviceLabel = document.createElement("label");
    serviceLabel.setAttribute("for", "service");
    serviceLabel.textContent = "Service Required:";
    serviceLabel.style.display = "block";

    var serviceSelect = document.createElement("select");
    serviceSelect.id   = "service";
    serviceSelect.name = "service";
    serviceSelect.required = true;
    serviceSelect.style.cssText =
      "width:100%;padding:8px;margin-top:4px;border:1px solid #ccc;border-radius:4px;";

    var services = [
      "-- Please select a service --",
      "Installing Pipes",
      "Fixing Leaks",
      "Unblocking Drainage Pipes",
      "Emergency Call-Out",
      "General Inspection",
      "Other"
    ];

    services.forEach(function (svc, i) {
      var opt = document.createElement("option");
      opt.value   = i === 0 ? "" : svc;
      opt.textContent = svc;
      if (i === 0) { opt.disabled = true; opt.selected = true; }
      serviceSelect.appendChild(opt);
    });

    serviceGroup.appendChild(serviceLabel);
    serviceGroup.appendChild(serviceSelect);

    form.insertBefore(serviceGroup, form.firstChild);
  }

  if (!form.querySelector("#phone")) {
    var phoneGroup = document.createElement("div");
    phoneGroup.style.marginBottom = "12px";

    var phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for", "phone");
    phoneLabel.textContent = "Phone Number (optional):";
    phoneLabel.style.display = "block";

    var phoneInput = document.createElement("input");
    phoneInput.type        = "tel";
    phoneInput.id          = "phone";
    phoneInput.name        = "phone";
    phoneInput.placeholder = "e.g. 083 414 4698";
    phoneInput.style.cssText =
      "width:100%;padding:8px;margin-top:4px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;";

    phoneGroup.appendChild(phoneLabel);
    phoneGroup.appendChild(phoneInput);

    // Insert after the email field
    var emailField = form.querySelector("#email");
    if (emailField && emailField.nextSibling) {
      form.insertBefore(phoneGroup, emailField.nextSibling);
    } else {
      form.appendChild(phoneGroup);
    }
  }

  attachLiveValidation(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    var serviceEl = form.querySelector("#service");
    if (serviceEl && serviceEl.value === "") {
      serviceEl.style.borderColor = "#c0392b";
      serviceEl.focus();
      return;
    }

    var submitBtn = form.querySelector('[type="submit"]');
    var original  = submitBtn.value || submitBtn.textContent;
    if (submitBtn.tagName === "INPUT") {
      submitBtn.value = "Sending…";
    } else {
      submitBtn.textContent = "Sending…";
    }
    submitBtn.disabled = true;

    setTimeout(function () {
      var name = (form.querySelector("#name") || {}).value || "there";

      var banner = document.createElement("div");
      banner.style.cssText =
        "background:#eafaf1;border:2px solid #27ae60;border-radius:6px;" +
        "padding:20px;margin-bottom:20px;text-align:center;";
      banner.innerHTML =
        "<h3 style='color:#27ae60;'>✔ Message Sent!</h3>" +
        "<p>Thank you, <strong>" + escapeHtml(name.trim()) + "</strong>. " +
        "We will contact you shortly.</p>";

      form.insertAdjacentElement("beforebegin", banner);
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();

      if (submitBtn.tagName === "INPUT") {
        submitBtn.value = original;
      } else {
        submitBtn.textContent = original;
      }
      submitBtn.disabled = false;

    }, 1000);
  });
});

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}