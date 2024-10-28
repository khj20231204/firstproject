

window.onload = function() {
  const signUpBtn = document.getElementById("signUp");
  const signInBtn = document.getElementById("signIn");
  const container = document.querySelector(".container");

   signUpBtn.addEventListener("click", () => {
      alert("df");
     container.classList.add("right-panel-active");
     
   });
   signInBtn.addEventListener("click", () => {
    alert("geg");
     container.classList.remove("right-panel-active");
   });
}