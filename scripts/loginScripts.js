document.addEventListener("DOMContentLoaded", function () {
  sessionChecker().then((data) => {
    document.getElementById("mobile-options-list").innerHTML =
      "<li class='side-navbar-li-btn'>" +
      "<a class='side-navbar-btn open' href='http://localhost:5000'>Home</a>" +
      "</li>";

    document.getElementById("option-list").innerHTML =
      "<li class='li-btn'>" +
      "<a class='menu-btn hover-underline-animation' href='http://localhost:5000'>Home</a>" +
      "</li>";
      
    if (data.session) {
      window.location.href = "http://localhost:5000/";
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

/* Constantes de verificação */
const check = {
  name: false,
  password: false,
};

// Função que desativa o botão caso haja algo de errado:
const checker = () => {
  if (check.name && check.password) {
    document.getElementById("login-submit").classList.remove("disabled");
    changeInputStyle("login-submit", "login-submit-error", " ", true);
    document.getElementById("login-submit-error").innerHTML = " ";
    return true;
  } else {
    document.getElementById("login-submit").classList.add("disabled");
    changeInputStyle(
      "login-submit",
      "login-submit-error",
      "Preencha todos os campos corretamente.",
      false
    );
    return false;
  }
};

// Função que verifica o input de nome:
const name = document
  .getElementById("login-username")
  .addEventListener("input", function (e) {
    if (e.target.value < 1) {
      check.name = false;
      changeInputStyle(
        "login-username",
        "login-username-error",
        "Você deve digitar o seu nome de usuário.",
        false
      );
    } else {
      check.name = true;
      changeInputStyle("login-username", "login-username-error", "", true);
    }

    checker();
  });

// Função que verifica a senha:
const password = document
  .getElementById("login-password")
  .addEventListener("input", function (e) {
    if (e.target.value < 1) {
      check.password = false;
      changeInputStyle(
        "login-password",
        "login-password-error",
        "Você deve digitar uma senha.",
        false
      );
    } else {
      check.password = true;
      changeInputStyle("login-password", "login-password-error", "", true);
    }

    checker();
  });

const submitLoginForm = document
  .getElementById("login-submit")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    if (checker()) {
      const name = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const senha_criptografada = await criptografarSenha(password);

      login(name, senha_criptografada).then((data) => {
        if (data.session) {
          window.location.href = "http://localhost:5000/";
        } else {
          changeInputStyle(
            "login-submit",
            "login-submit-error",
            data.message,
            false
          );
        }
      });
    } else {
      if (check.name === false) {
        changeInputStyle(
          "login-username",
          "login-username-error",
          "Nome de usuário inválido.",
          false
        );
      }

      if (check.password === false) {
        changeInputStyle(
          "login-password",
          "login-password-error",
          "Senha inválida.",
          false
        );
      }
    }
  });

async function login(name, password) {
  const url = "http://localhost:5000/php/session/login.php";
  const init = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, init);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Erro: ", error);
  }
}

console.log("loginScripts loaded");
