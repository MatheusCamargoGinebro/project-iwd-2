/*
O===========================O
|---------------------------|
| Script da Página Register |
|---------------------------|
O===========================O

Este script tem as funções que a página Register precisa.
Ex: verificar formulário
*/

const checkInfo = {
    username: false,
    email: false,
    password: false,
    passowrdConfirmation: false,
};

const registerValues = {
    username: '',
    email: '',
    password: '',
    passowrdConfirmation: '',
}

function registerChecker(){
    const registerButton = document.getElementById('register-btn');
    if(checkInfo.username == true && checkInfo.email == true && checkInfo.password == true && checkInfo.passowrdConfirmation == true){ //Habilitado
        registerButton.disabled = false;
        registerButton.classList.remove('disable');

    }else{ // Desabilitado
        registerButton.disabled = true;
        registerButton.classList.add('disable');
    }
}

// "Micro" função que vericica se uma string "se parece" com um email.
function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

// Função para verificar 2 senhas.
function passwordValidator(password) {
    if (!password) {
      return -1;
    }
  
    if (password.length < 8 || password.length > 128) {
      return 0;
    }
  
    return 1;
}

console.log('registerScripts Loaded');

// Testando o input de username:
document.getElementById('register-username').addEventListener('input', function(e) {
    const username = e.target.value;
    const errorMessage = document.getElementById('register-username-error');

    if(username.length < 1 || username.length > 128){
        checkInfo.username = false;

        errorMessage.style.marginTop = 55+"px";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log('Error: Invalid Username.');
    }else{
        registerValues.username = username;
        checkInfo.username = true;

        errorMessage.style.marginTop = 35+"px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        console.log('Check: Valid Username.');
    }
    registerChecker()
});

// Testando o input de Email:
document.getElementById('register-email').addEventListener('input', function(e) {
    const email = e.target.value;
    const errorMessage = document.getElementById('register-email-error');

    if(validateEmail(email)){
        registerValues.email = email;
        checkInfo.email = true;

        errorMessage.style.marginTop = 35+"px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        
        console.log('Check: Valid Email');
    }else{
        checkInfo.email = false;

        errorMessage.style.marginTop = 55+"px";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log('error: Invalid Email');
    }
    registerChecker()
});

// Testando o input de senha:
document.getElementById('register-password').addEventListener('input', function(e) {
    const password1 = e.target.value;
    const errorMessage1 = document.getElementById('register-password-error');

    const verif = passwordValidator(password1);

    if(verif==-1){
        checkInfo.password = false;

        errorMessage1.style.marginTop = 55 + "px";
        errorMessage1.innerHTML = "Tamanho inválido."; 
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');
        
        console.log("Error: Invalid Passoword -> Nula");
    }else if(verif==0){
        checkInfo.password = false;

        errorMessage1.style.marginTop = 55 + "px";
        errorMessage1.innerHTML = "Tamanho inválido."; 
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log("Error: Valid Passoword -> Tamanho inválido");
    }else{
        registerValues.password = password1;
        checkInfo.password = true;

        errorMessage1.style.marginTop = 35 + "px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        const password2 = document.getElementById('register-password-confirmation');
        const errorMessage2 = document.getElementById('register-password-confirmation-error');

        if(password2.value == password1){

            registerValues.passowrdConfirmation = password2;
            checkInfo.passowrdConfirmation = true;

            errorMessage2.style.marginTop = 35 + "px";
            password2.classList.remove('invalid');
            password2.classList.add('valid');

            console.log('Check: Senhas compatíveis');
        }else{
            checkInfo.passowrdConfirmation = false;

            errorMessage2.style.marginTop = 55 + "px";
            password2.classList.remove('valid');
            password2.classList.add('invalid');

            console.log('Error: Senhas não compatíveis');
        }
        
        console.log("Check: Valid Passoword -> Tudo certo");
    }
    registerChecker()
});

// Testando o input de confirmação de senha:
document.getElementById('register-password-confirmation').addEventListener('input', function(e) {
    const password1 = e.target.value;
    const errorMessage = document.getElementById('register-password-confirmation-error');

    const verif = passwordValidator(password1);

    if(verif==-1){
        checkInfo.passowrdConfirmation = false;

        errorMessage.style.marginTop = 55 + "px";
        errorMessage.innerHTML = "Tamanho inválido.";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log("Error: Valid Passoword -> Senha Nula");
    }else if(verif==0){
        checkInfo.passowrdConfirmation = false;

        errorMessage.style.marginTop = 55 + "px";
        errorMessage.innerHTML = "Tamanho inválido.";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log("Error: Valid Password -> Tamanho inválido");
    }else{
        const password2 = document.getElementById('register-password');

        if(password1 == password2.value){
            registerValues.passowrdConfirmation = password1;
            checkInfo.passowrdConfirmation = true;

            errorMessage.style.marginTop = 35 + "px";
            e.target.classList.remove('invalid');
            e.target.classList.add('valid');

            console.log('Check: Valid Password -> Tudo certo');
        }else{
            checkInfo.passowrdConfirmation = false;
    
            errorMessage.style.marginTop = 55 + "px";
            errorMessage.innerHTML = "As senhas precisam ser iguais.";
            e.target.classList.remove('valid');
            e.target.classList.add('invalid');

            console.log('Error: Invalid Password -> Senhas diferentes');
        }

        console.log("Check: Valid Passoword -> Tudo certo");
    }
    registerChecker()
});