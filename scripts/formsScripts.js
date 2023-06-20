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

function formChecker(){
    const formButton = document.getElementById('form-submit-button');
    if(checkForm.title == true && checkForm.description == true && checkForm.image == true){ //Habilitado
        formButton.disabled = false;
        formButton.classList.remove('disable');

    }else{ // Desabilitado
        formButton.disabled = true;
        formButton.classList.add('disable');
    }
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
    formChecker();
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
    formChecker();
    
    charCounter.innerHTML = description.length + "/222";
});

// Função para salvar a imagem em uma variável:
function getImage() {
    var input = document.getElementById('imageFile');
    var file = input.files[0];
    var reader = new FileReader();
  
    reader.onloadend = function() {
      var image = reader.result;
      // Temos a imagem em uma variável
    }
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

// Verifica input de imagem:
document.getElementById("imageFile").addEventListener("change", function() {
    checkForm.image = true;
    getImage();
    formChecker();
});


//++----------------------------</> FIREBASE </>----------------------------++\\ não funcionaaaaaaaaaaaaaaaaaaaaaaaa
/*
import firebase from "firebase/app";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: 'gs://theifers-database.appspot.com/'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();


//Verifica o botão de submit:
document.getElementById('form-submit-button').addEventListener('click', function (e){
    if(checkForm.title == true && checkForm.description == true && checkForm.image == true){
        // Mandando a imagem para o firebase, e pegando a URL:
        const nomeImage = "imagem1";
        const upload = storage.ref().child("images").child(nomeImage).put();
    }else{
        event.preventDefault(); // Não vai mandar os dados se tiver algo de errado;
    }
})*/