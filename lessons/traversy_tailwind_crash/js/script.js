const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

btn.addEventListener("click", function(){
    this.classList.toggle("open")
    nav.classList.toggle("flex");
    nav.classList.toggle("hidden")
});