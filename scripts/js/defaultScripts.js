/*
O===========================O
|---------------------------|
| Script de funções básicas |
|---------------------------|
O===========================O

Este script tem as funções básicas (que todas as páginas do site precisam).
Ex: funcionamento do side-navbar.
*/

console.log('defaultScripts loaded');

const div = document.getElementById('side-navbar-div');
const checkbox = document.getElementById('nav-bar-activator').addEventListener('change', function() {
  if (this.checked) {
    this.style.marginLeft = 60 + "vw";
    div.style.left = 0;
  } else {
    this.style.marginLeft = 0 + "px";
    div.style.left = -76 + "vw";
  }
});
  