const div = document.getElementById("side-navbar-div");
const checkbox = document
  .getElementById("nav-bar-activator")
  .addEventListener("change", function () {
    if (this.checked) {
      this.style.marginLeft = 60 + "vw";
      div.style.left = 0;
    } else {
      this.style.marginLeft = 0 + "px";
      div.style.left = -76 + "vw";
    }
  });

async function sessionChecker() {
  const url = "http://localhost:5000/php/session/checkSession.php";

  let response = await fetch(url);

  let data = await response.json();

  return data;
}

function changeInputStyle(inputID, inputErrorID, errorMessage, state) {
  if (state == true) {
    document.getElementById(inputID).classList.remove("invalid");
    document.getElementById(inputID).classList.add("valid");
    document.getElementById(inputErrorID).style.marginTop = 35 + "px";
  } else {
    if (document.getElementById(inputID).type != "button") {
      document.getElementById(inputErrorID).style.marginTop = 55 + "px";
    } else {
      document.getElementById(inputErrorID).style.marginTop = 15 + "px";
    }
    document.getElementById(inputID).classList.remove("valid");
    document.getElementById(inputID).classList.add("invalid");
    document.getElementById(inputErrorID).style.color = "#e46969";
    document.getElementById(inputErrorID).innerHTML = errorMessage;
  }
}

async function criptografarSenha(senha) {
  const msgBuffer = new TextEncoder().encode(senha);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.substring(0, 64);
}
