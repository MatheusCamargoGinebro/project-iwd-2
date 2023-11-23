/*
O========================O
|------------------------|
| Script da Página Login |
|------------------------|
O========================O

Este script tem as funções que a página Login precisa.
Ex: verificar formulário.
*/

document.addEventListener("DOMContentLoaded", function() {
    sessionChecker().then((data) => {
        if(data.session){
            window.location.href = 'http://localhost:5000/';
        }
    });
});

// Definindo as constantes para verificar o formulário:
console.log('loginScripts Loaded');
const checkLogin = {
    username: false,
    password: false,
};

const loginParameters = {
    username: '',
    password: '',
};

function loginChecker(){
    const loginButton = document.getElementById('login-btn');
    if(checkLogin.password == true && checkLogin.username == true){ //Habilitado
        loginButton.disabled = false;
        loginButton.classList.remove('disable');
        return true;

    }else{ // Desabilitado
        loginButton.disabled = true;
        loginButton.classList.add('disable');
        return false;
    }
}

// Testando o input de username:
document.getElementById('login-username').addEventListener('input', function(e) {
    const username = e.target.value;
    const errorMessage = document.getElementById('login-username-error');

    if(username.length < 1 || username.length > 128){
        checkLogin.username = false;

        errorMessage.style.marginTop = 55+"px";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log('Error: Invalid Username.');
    }else{
        loginParameters.username = username;
        checkLogin.username = true;

        errorMessage.style.marginTop = 35+"px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        console.log('Check: Valid Username.');
    }
    loginChecker();
});

// Testando o input de senha:
document.getElementById('login-password').addEventListener('input', function(e) {
    const password = e.target.value;
    const errorMessage = document.getElementById('login-password-error');

    if(password.length < 0 || password.length > 128){
        checkLogin.password = false;

        errorMessage.style.marginTop = 55+"px";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log('Erro: Invalid Password');
    }else{
        loginParameters.password = password;
        checkLogin.password = true;

        errorMessage.style.marginTop = 35+"px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        console.log('Check: Valid Password');
    }
    loginChecker();
})

document.getElementById('login-btn').addEventListener('click', function(e){
    e.preventDefault();
    if(loginChecker()){
        const name = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        console.log('Login Parameters: ', name, password);

        login(name, password).then((data) => {
            if(data.session){
                window.location.href = 'http://localhost:5000/';	
            }else{
                console.log('Erro: ', data);
            }
        });
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
  