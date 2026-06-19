
document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  if (!form) return;


  attachLiveValidation(form);


  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop the page from reloading


    if (!validateForm(form)) return;


    var name    = document.getElementById("name").value.trim();
    var email   = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    var submitBtn = form.querySelector('[type="submit"]');
    var original  = submitBtn.value;
    submitBtn.value    = "Sending…";
    submitBtn.disabled = true;


    setTimeout(function () {


      var confirmation = document.createElement("div");
      confirmation.style.cssText =
        "background:#eafaf1;border:2px solid #27ae60;border-radius:6px;" +
        "padding:24px;margin-top:20px;text-align:center;";

      confirmation.innerHTML =
        "<h2 style='color:#27ae60;margin-bottom:10px;'>✔ Enquiry Received!</h2>" +
        "<p>Thank you, <strong>" + escapeHtml(name) + "</strong>.</p>" +
        "<p>We have received your enquiry and will reply to " +
        "<strong>" + escapeHtml(email) + "</strong> within 24 hours.</p>" +
        "<p style='font-size:13px;color:#555;margin-top:12px;'>" +
        "Reference: <code>" + makeRef() + "</code></p>";

    
      form.replaceWith(confirmation);

    }, 1000);
  });
});

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function makeRef() {
  return "JPS-" + Date.now().toString(36).toUpperCase();
}