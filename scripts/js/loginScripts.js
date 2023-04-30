/*
O========================O
|------------------------|
| Script da Página Login |
|------------------------|
O========================O

Este script tem as funções que a página Login precisa.
Ex: verificar formulário.
*/

// Definindo as constantes para verificar o formulário:
const checkLogin = {
    username: false,
    password: false,
};

const loginParameters = {
    username: '',
    password: '',
};


console.log('loginScripts Loaded');

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
});

// Testando o input de senha:
document.getElementById('login-password').addEventListener('input', function(e) {
    const password = e.target.value;
    const errorMessage = document.getElementById('login-password-error');

    if(password.length < 8 || password.length > 128){
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
})