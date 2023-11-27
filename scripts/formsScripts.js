document.addEventListener("DOMContentLoaded", function () {
  sessionChecker().then((data) => {
    if (!data.session) {
      window.location.href = "http://localhost:5000/";
    }
  });
});

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

const checker = () => {
  if (checkForm.title && checkForm.description && checkForm.image) {
    document.getElementById("submit-form").classList.remove("disabled");
    changeInputStyle("submit-form", "form-submit-error", "", true);
    document.getElementById("form-submit-error").innerHTML = " ";
    return true;
  } else {
    document.getElementById("submit-form").classList.add("disabled");
    changeInputStyle(
      "submit-form",
      "form-submit-error",
      "Preencha todos os campos corretamente.",
      false
    );
    return false;
  }
};

// Verificar input de título:
document.getElementById("form-title").addEventListener("input", function (e) {
  if (e.target.value.length < 1 || e.target.value.length > 18) {
    checkForm.title = false;
    changeInputStyle(
      "form-title",
      "form-title-error",
      "O título deve ter entre 1 e 18 caracteres.",
      false
    );
  } else {
    checkForm.title = true;
    changeInputStyle("form-title", "form-title-error", "", true);
  }

  checker();
});

// Verificar input de descrição:
document
  .getElementById("form-description")
  .addEventListener("input", function (e) {
    if (e.target.value.length < 1 || e.target.value.length > 222) {
      checkForm.description = false;
      changeInputStyle(
        "form-description",
        "form-description-error",
        "A descrição deve ter entre 1 e 222 caracteres.",
        false
      );
    } else {
      checkForm.description = true;
      changeInputStyle("form-description", "form-description-error", "", true);
      document.getElementById("form-description-error").style.marginTop =
        200 + "px";
    }

    // counter:
    document.getElementById("cont").innerHTML = e.target.value.length + "/222";

    checker();
  });

// Verifica input de imagem:
const fileInput = document.getElementById("image-file");

fileInput.addEventListener("change", (e) => {
  if (e.target.files[0] != undefined) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      formValues.image = reader.result;
      console.log("URL da imagem: " + formValues.image);

      if (formValues.image.length > 1) {
        checkForm.image = true;
        changeInputStyle("image-file", "image-file-error", "", true);
      } else {
        checkForm.image = false;
        changeInputStyle(
          "image-file",
          "image-file-error",
          "Selecione uma imagem.",
          false
        );
      }

      checker();
    });

    reader.readAsDataURL(file);
  } else {
    checkForm.image = false;
    checker();
  }
});
/*--------------------------------------------------------------------------------*/
document
  .getElementById("submit-form")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    if (checker()) {
      const result = await formSubmit(formValues);

      if (result.status == "success") {
        alert("Card cadastrado com sucesso!");
        window.location.href = "http://localhost:5000/dashboard";
      } else {
        alert("Ocorreu um erro ao cadastrar o card.");
      }
    } else {
      changeInputStyle(
        "submit-form",
        "form-submit-error",
        "Preencha todos os campos corretamente.",
        false
      );

      if (!checkForm.title) {
        changeInputStyle(
          "form-title",
          "form-title-error",
          "O título deve ter entre 1 e 18 caracteres.",
          false
        );
      }

      if (!checkForm.description) {
        changeInputStyle(
          "form-description",
          "form-description-error",
          "A descrição deve ter entre 1 e 222 caracteres.",
          false
        );
        document.getElementById("form-description-error").style.marginTop =
          200 + "px";
      }

      if (!checkForm.image) {
        changeInputStyle(
          "image-file",
          "image-file-error",
          "Selecione uma imagem.",
          false
        );
      }
    }
  });

async function formSubmit(data) {
  const url = "http://localhost:5000/php/database/save/saveCard.php";

  const init = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, init);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Erro: ", error);
  }
}
