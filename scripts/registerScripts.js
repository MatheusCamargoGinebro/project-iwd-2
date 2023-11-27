document.addEventListener("DOMContentLoaded", function () {
  sessionChecker().then((data) => {
    if (data.session) {
      //window.location.href = "http://localhost:5000/";
    }
  });
});

/* Constantes de verificação */
const check = {
  name: false,
  email: false,
  password: false,
  passwordConfirmation: false,
};

// Função que desativa o botão caso haja algo de errado:
const checker = () => {
  if (
    check.name &&
    check.email &&
    check.password &&
    check.passwordConfirmation
  ) {
    document.getElementById("register-submit").classList.remove("disabled");

    return true;
  } else {
    document.getElementById("register-submit").classList.add("disabled");

    return false;
  }
};

// Função verifica o input de nome:
const name = document
  .getElementById("register-name")
  .addEventListener("input", function (e) {
    var nameRegex = /^[a-zA-Z\s]{3,255}$/;
    if (nameRegex.test(e.target.value) == false) {
      check.name = false;

      if (e.target.value.length < 3) {
        changeInputStyle(
          "register-name",
          "register-name-error",
          "O nome deve ter no mínimo 3 caracteres.",
          false
        );
      } else if (e.target.value.length > 255) {
        changeInputStyle(
          "register-name",
          "register-name-error",
          "O nome deve ter no máximo 255 caracteres.",
          false
        );
      } else {
        changeInputStyle(
          "register-name",
          "register-name-error",
          "O nome deve conter apenas letras",
          false
        );
      }
    } else {
      check.name = true;
      changeInputStyle("register-name", "register-name-error", "", true);
    }

    checker();
  });

// Função verifica o input de email:
const email = document
  .getElementById("register-email")
  .addEventListener("input", function (e) {
    var emailRegex = /^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/;

    if (emailRegex.test(e.target.value) == false) {
      check.email = false;
      changeInputStyle(
        "register-email",
        "register-email-error",
        "O email deve seguir o padrão email@aluno.ifsp.edu.br",
        false
      );
    } else {
      check.email = true;
      changeInputStyle("register-email", "register-email-error", "", true);
    }

    checker();
  });

// Função verifica o input de senha:
const password = document
  .getElementById("register-password")
  .addEventListener("input", function (e) {
    var upperCaseRegex = /(?=.*[A-Z])/;
    var lowerCaseRegex = /(?=.*[a-z])/;
    var numberRegex = /(?=.*\d)/;
    var specialCharRegex = /(?=.*[@#$%^&+=!])./;

    if (e.target.value.length < 8) {
      check.password = false;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "A senha deve conter no mínimo 8 caracteres.",
        false
      );
    } else if (e.target.value.length > 255) {
      check.password = false;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "A senha deve conter no máximo 255 caracteres.",
        false
      );
    } else if (lowerCaseRegex.test(e.target.value) == false) {
      check.password = false;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "A senha deve conter pelo menos uma letra minúscula.",
        false
      );
    } else if (upperCaseRegex.test(e.target.value) == false) {
      check.password = false;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "A senha deve conter pelo menos uma letra maiúscula.",
        false
      );
    } else if (numberRegex.test(e.target.value) == false) {
      check.password = false;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "A senha deve conter pelo menos um número.",
        false
      );
    } else if (specialCharRegex.test(e.target.value) == false) {
      check.password = false;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "A senha deve conter pelo menos um caracter especial.",
        false
      );
    } else {
      check.password = true;
      changeInputStyle(
        "register-password",
        "register-password-error",
        "",
        true
      );
    }

    if (
      e.target.value !=
      document.getElementById("register-password-confirmation").value
    ) {
      check.passwordConfirmation = false;
      changeInputStyle(
        "register-password-confirmation",
        "register-password-confirmation-error",
        "As senhas não coincidem.",
        false
      );
    } else {
      check.passwordConfirmation = true;
      changeInputStyle(
        "register-password-confirmation",
        "register-password-confirmation-error",
        "",
        true
      );
    }

    checker();
  });

// Função verifica o input de confirmação de senha:
const passwordConfirmation = document
  .getElementById("register-password-confirmation")
  .addEventListener("input", function (e) {
    if (e.target.value != document.getElementById("register-password").value) {
      check.passwordConfirmation = false;
      changeInputStyle(
        "register-password-confirmation",
        "register-password-confirmation-error",
        "As senhas não coincidem.",
        false
      );
    } else {
      check.passwordConfirmation = true;
      changeInputStyle(
        "register-password-confirmation",
        "register-password-confirmation-error",
        "",
        true
      );
    }

    checker();
  });

const submitRegisterForm = document
  .getElementById("register-submit")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    if (checker()) {
      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      const senha_criptografada = await criptografarSenha(password);

      register(name, email, senha_criptografada).then((data) => {
        if (data.session) {
          //window.location.href = "http://localhost:5000/;
          console.log("Cadastrado com sucesso!");
        } else {
          if (data.email === false) {
            changeInputStyle(
              "register-email",
              "register-email-error",
              "O email já está cadastrado no sistema.",
              false
            );
          }
          if (data.name === false) {
            changeInputStyle(
              "register-name",
              "register-name-error",
              "O nome de usuário já está cadastrado no sistema.",
              false
            );
          }

          changeInputStyle(
            "register-submit",
            "register-submit-error",
            data.message,
            false
          );
        }
      });
    } else {
      if (check.name === false) {
        changeInputStyle(
          "register-name",
          "register-name-error",
          "O nome de usuário é inválido.",
          false
        );
      }

      if (check.email === false) {
        changeInputStyle(
          "register-email",
          "register-email-error",
          "O email é inválido.",
          false
        );
      }

      if (check.password === false) {
        changeInputStyle(
          "register-password",
          "register-password-error",
          "A senha é inválida.",
          false
        );
      }

      if (check.passwordConfirmation === false) {
        changeInputStyle(
          "register-password-confirmation",
          "register-password-confirmation-error",
          "As senhas não coincidem.",
          false
        );
      }
    }
  });

async function register(name, email, password) {
  const url = "http://localhost:5000/php/database/save/register.php";

  const init = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
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