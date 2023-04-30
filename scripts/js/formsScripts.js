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
}

const formValues = {
    title: '',
    description: '',
    image: '',
}

console.log('FormScripts Loaded');

// Verificar input de título:
document.getElementById('form-title').addEventListener('input', function(e) {
    const title = e.target.value;
    const errorMessage = document.getElementById('form-title-error');

    if(title.length < 1 || title.length > 18){
        checkForm.title = false;

        errorMessage.style.marginTop = 55 + "px";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log('Error: Invalid title');
    }else{
        formValues.title = title;
        checkForm.title = true;

        errorMessage.style.marginTop = 35 + "px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        console.log('Check: Valid Title');
    }
});

// Verificar input de descrição:

document.getElementById('form-description').addEventListener('input', function(e) {
    const description = e.target.value;
    const errorMessage = document.getElementById('form-description-error');
    const charCounter = document.getElementById('cont');

    if(description.length < 1 || description.length > 222){
        checkForm.description = false;

        errorMessage.style.marginTop = 230 + "px";
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');

        console.log('Error: Invalid description');
    }else{
        formValues.description = description;
        checkForm.description = true;

        errorMessage.style.marginTop = 200 + "px";
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');

        console.log('Check: Valid description');
    }
    
    charCounter.innerHTML = description.length + "/222";
});