const form =
document.getElementById("contactForm");

if(form){

form.addEventListener("submit", function(e){

const email =
document.getElementById("email").value;

if(!email.includes("@")){

e.preventDefault();

document.getElementById("errorMessage")
.innerText =
"Please enter a valid email.";

}

});

}
if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

fetch("https://jsonplaceholder.typicode.com/posts", {

method: "POST",

headers: {
"Content-Type":"application/json"
},

body: JSON.stringify({
name:
document.getElementById("name").value,

email:
document.getElementById("email").value
})

})
.then(response => response.json())
.then(data => {

alert("Enquiry submitted successfully!");

});

});

}