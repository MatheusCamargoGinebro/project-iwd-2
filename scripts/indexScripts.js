document.addEventListener("DOMContentLoaded", function () {
  sessionChecker().then((data) => {
    document.getElementById("mobile-options-list").innerHTML =
      "<li class='side-navbar-li-btn'>" +
      "<a class='side-navbar-btn open' href='http://localhost:5000/'>Home</a>" +
      "</li>";

    document.getElementById("option-list").innerHTML =
      "<li class='li-btn'>" +
      "<a class='menu-btn hover-underline-animation' href='http://localhost:5000/'>Home</a>" +
      "</li>";

    if (data.session) {
      document.getElementById("mobile-options-list").innerHTML +=
        "<li class='side-navbar-li-btn'>" +
        "<a class='side-navbar-btn' href='http://localhost:5000/html/forms.html'>Form</a>" +
        "</li>";

      document.getElementById("option-list").innerHTML +=
        "<li class='li-btn'>" +
        "<a class='menu-btn hover-underline-animation' href='http://localhost:5000/html/forms.html'>Form</a>" +
        "</li>" +
        "<li class='li-btn'>" +
        "<a class='menu-btn hover-underline-animation' href='http://localhost:5000/php/session/logout.php'>Logout</a>" +
        "</li>";
    } else {
      document.getElementById("mobile-options-list").innerHTML +=
        "<li class='side-navbar-li-btn'>" +
        "<a class='side-navbar-btn' href='http://localhost:5000/html/login.html'>Sign in</a>" +
        "</li>" +
        "<li class='side-navbar-li-btn'>";
      "<a class='side-navbar-btn' href='http://localhost:5000/html/register.html'>Sign up</a>" +
        "</li>";

      document.getElementById("option-list").innerHTML +=
        "<li class='li-btn'>" +
        "<a class='menu-btn' href='http://localhost:5000/html/login.html' id='SingIn'>Sign in</a>" +
        "</li>" +
        "<li class='li-btn'>" +
        "<a class='menu-btn' href='http://localhost:5000/html/register.html' id='SingUp'>Sign up</a>" +
        "</li>";
    }
  });
});

const atualData = {
  title: "",
  description: "",
  image: "",
  id: "",
};

async function loadCards() {
  getCards().then((data) => {
    if (data.size != 0) {
      var Content = "<div class='gridarea'>";

      for (let i = 0; i < data.size; i++) {
        Content +=
          "<div class='object-div' id='" +
          data.cards[i].id +
          "'>" +
          "<div class='object-img-div'>" +
          "<img src='" +
          data.cards[i].cardImageURL +
          "' alt='Image' />" +
          "</div>" +
          "<div class='object-title-div'>" +
          "<h1>" +
          data.cards[i].cardTitle +
          "</h1>" +
          "</div>" +
          "<div class='object-text-div'>" +
          "<p>" +
          data.cards[i].cardDescription +
          "</p>" +
          "</div>" +
          "</div>";
      }
      Content += "</div>";

      document.getElementById("container-data").innerHTML = Content;

       for (let i = 0; i < data.size; i++) {
        document.getElementById(data.cards[i].id).addEventListener("click", function () {
          document.getElementById("modal-screen").style.display = "flex";

          document.getElementById("update-title").value = data.cards[i].cardTitle;
          document.getElementById("update-description").value = data.cards[i].cardDescription;

          // Alterando o placeholder dos inputs:
          document.getElementById("update-title").placeholder = data.cards[i].cardTitle;
          document.getElementById("update-description").placeholder = data.cards[i].cardDescription;

          atualData.title = data.cards[i].cardTitle;
          atualData.description = data.cards[i].cardDescription;
          atualData.image = data.cards[i].cardImageURL;
          atualData.id = data.cards[i].id;
        });
      }
    }
  });
}

async function getCards() {
  try {
    const response = await fetch(
      "http://localhost:5000/php/database/load/loadCards.php",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

loadCards();

/*-------------------------------------------------------------------------------------*/
document.getElementById("close-modal").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("modal-screen").style.display = "none";
});

const checkupdate = {
  title: false,
  description: false,
  image: false,
};

const updateValues = {
  title: "",
  description: "",
  image: "",
};

const checker = () => {
  if (checkupdate.title && checkupdate.description && checkupdate.image) {
    document.getElementById("submit-update").classList.remove("disabled");
    changeInputStyle("submit-update", "update-submit-error", "", true);
    document.getElementById("update-submit-error").innerHTML = " ";
    return true;
  } else {
    document.getElementById("submit-update").classList.add("disabled");
    changeInputStyle(
      "submit-update",
      "update-submit-error",
      "Preencha todos os campos corretamente.",
      false
    );
    return false;
  }
};

// Verificar input de título:
document.getElementById("update-title").addEventListener("input", function (e) {
  if (e.target.value.length < 1 || e.target.value.length > 18) {
    checkupdate.title = false;
    changeInputStyle(
      "update-title",
      "update-title-error",
      "O título deve ter entre 1 e 18 caracteres.",
      false
    );
  } else {
    checkupdate.title = true;
    changeInputStyle("update-title", "update-title-error", "", true);
    updateValues.title = e.target.value;
  }

  checker();
});

// Verificar input de descrição:
document
  .getElementById("update-description")
  .addEventListener("input", function (e) {
    if (e.target.value.length < 1 || e.target.value.length > 222) {
      checkupdate.description = false;
      changeInputStyle(
        "update-description",
        "update-description-error",
        "A descrição deve ter entre 1 e 222 caracteres.",
        false
      );
    } else {
      checkupdate.description = true;
      changeInputStyle(
        "update-description",
        "update-description-error",
        "",
        true
      );
      document.getElementById("update-description-error").style.marginTop =
        200 + "px";
      updateValues.description = e.target.value;
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
      updateValues.image = reader.result;

      if (updateValues.image.length > 1) {
        checkupdate.image = true;
        changeInputStyle("image-file", "image-file-error", "", true);
      } else {
        checkupdate.image = false;
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
    checkupdate.image = false;
    checker();
  }
});

document
  .getElementById("submit-update")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    if (checker()) {
      console.log(atualData);

      const newData = {
        title: updateValues.title,
        description: updateValues.description,
        image: updateValues.image,
        id: atualData.id,
      }

      updateSubmit(newData).then((data) => {
        if (data.status) {
          window.location.href = "http://localhost:5000/";
        } else {
          changeInputStyle(
            "submit-update",
            "update-submit-error",
            data.message,
            false
          );
        }
      });
    } else {
      changeInputStyle(
        "submit-update",
        "update-submit-error",
        "Preencha todos os campos corretamente.",
        false
      );

      if (!checkupdate.title) {
        changeInputStyle(
          "update-title",
          "update-title-error",
          "O título deve ter entre 1 e 18 caracteres.",
          false
        );
      }

      if (!checkupdate.description) {
        changeInputStyle(
          "update-description",
          "update-description-error",
          "A descrição deve ter entre 1 e 222 caracteres.",
          false
        );
        document.getElementById("update-description-error").style.marginTop =
          200 + "px";
      }

      if (!checkupdate.image) {
        changeInputStyle(
          "image-file",
          "image-file-error",
          "Selecione uma imagem.",
          false
        );
      }
    }
  });

async function updateSubmit(data) {
  const url = "http://localhost:5000/php/database/save/updateCard.php";

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

document.getElementById("delete-modal").addEventListener("click", async function (e) {
  e.preventDefault();
  deleteSubmit(atualData).then((data) => {
    if (data.status) {
      window.location.href = "http://localhost:5000/";
    } else {
      document.getElementById("update").style.border = "1px solid red";
    }
  });
});

async function deleteSubmit(data) {
  const url = "http://localhost:5000/php/database/delete/deleteCard.php";

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