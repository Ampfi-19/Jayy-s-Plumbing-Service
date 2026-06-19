const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

const cards =
document.querySelectorAll(".service-card");

cards.forEach(card => {

if(card.textContent.toLowerCase().includes(value)){
card.style.display = "block";
}
else{
card.style.display = "none";
}

});

});

}