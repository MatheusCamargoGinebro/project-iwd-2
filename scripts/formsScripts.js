/*
O========================O
|------------------------|
| Script da Página Forms |
|------------------------|
O========================O

Este script tem as funções que a página Forms precisa.
Ex: verificar formulário
*/
const checkForm = {
  title: false,
  description: false,
  image: false,
};

const formValues = {
  title: "",
  description: "",
  image: "",
};

function formChecker() {
  const formButton = document.getElementById("form-submit-button");
  if (
    checkForm.title == true &&
    checkForm.description == true &&
    checkForm.image == true
  ) {
    //Habilitado
    formButton.disabled = false;
    formButton.classList.remove("disable");
  } else {
    // Desabilitado
    formButton.disabled = true;
    formButton.classList.add("disable");
  }
}

console.log("FormScripts Loaded");

// Verificar input de título:
document.getElementById("form-title").addEventListener("input", function (e) {
  const title = e.target.value;
  const errorMessage = document.getElementById("form-title-error");

  if (title.length < 1 || title.length > 18) {
    checkForm.title = false;

    errorMessage.style.marginTop = 55 + "px";
    e.target.classList.remove("valid");
    e.target.classList.add("invalid");

    console.log("Error: Invalid title");
  } else {
    formValues.title = title;
    checkForm.title = true;

    errorMessage.style.marginTop = 35 + "px";
    e.target.classList.remove("invalid");
    e.target.classList.add("valid");

    console.log("Check: Valid Title");
  }
  formChecker();
});

// Verificar input de descrição:
document
  .getElementById("form-description")
  .addEventListener("input", function (e) {
    const description = e.target.value;
    const errorMessage = document.getElementById("form-description-error");
    const charCounter = document.getElementById("cont");

    if (description.length < 1 || description.length > 222) {
      checkForm.description = false;

      errorMessage.style.marginTop = 230 + "px";
      e.target.classList.remove("valid");
      e.target.classList.add("invalid");

      console.log("Error: Invalid description");
    } else {
      formValues.description = description;
      checkForm.description = true;

      errorMessage.style.marginTop = 200 + "px";
      e.target.classList.remove("invalid");
      e.target.classList.add("valid");

      console.log("Check: Valid description");
    }
    formChecker();

    charCounter.innerHTML = description.length + "/222";
  });

// Verifica input de imagem:
const fileInput = document.getElementById("imageFile");

fileInput.addEventListener("change", (e) => {
  if (e.target.files[0] != undefined) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      formValues.image = reader.result;
      console.log("URL da imagem: " + formValues.image);

      if (formValues.image.length > 1) {
        checkForm.image = true;
      } else {
        checkForm.image = false;
      }

      formChecker();
    });

    reader.readAsDataURL(file);
  } else {
    checkForm.image = false;
    formChecker();
  }
});
/*--------------------------------------------------------------------------------*/
document
  .getElementById("form-submit-button")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    if (formChecker()) {
      const url = "http://localhost:5000/php/database/insert/insertCard.php";
      const data = formValues;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);
    } else {
      console.log("Erro: Formulário inválido");
    }
  });
