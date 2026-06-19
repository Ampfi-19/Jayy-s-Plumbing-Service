
function setActiveNav() {
  var page = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll("nav ul li a");

  links.forEach(function (link) {
    var href = link.getAttribute("href").split("/").pop();
    if (href === page) {
      link.classList.add("active");
    }
  });
}

function fadeInPage() {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  window.addEventListener("load", function () {
    document.body.style.opacity = "1";
  });
}

function addBackToTop() {
  var btn = document.createElement("button");
  btn.id = "backToTop";
  btn.textContent = "↑ Top";
  btn.style.cssText =
    "display:none;position:fixed;bottom:30px;right:30px;" +
    "padding:10px 16px;background:#1a73e8;color:#fff;" +
    "border:none;border-radius:4px;cursor:pointer;font-size:14px;z-index:999;";

  document.body.appendChild(btn);

  window.addEventListener("scroll", function () {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setActiveNav();
  addBackToTop();
});

fadeInPage();