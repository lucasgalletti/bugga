window.onload = function() {
    let nombre = document.querySelector('#nombre');
    let email = document.querySelector('#mail');
    let foto = document.querySelector('#foto');
    let password = document.querySelector('#pass');    
    let form = document.querySelector('.form'); 


    form.addEventListener('submit', function(event){

        let errores = [];
        
        if(nombre.value.length < 1 ){
            errores.push('* Completar el campo de nombre');
            nombre.style.border = '1px solid red';
        } else if (nombre.value.length < 2) {
            errores.push('* El nombre debe tener al menos 2 caracteres');
            nombre.style.border = '1px solid red';
        } else {
            nombre.style.border = '1px solid green';
        }



         //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!reEmail.test(email.value)){
            errores.push('* El email es inválido...');
            email.style.border = '1px solid red';
        } else if(email.value.length < 1 ){
            errores.push('* Completar el campo de email');
            email.style.border = '1px solid red';
        } else {
            email.style.border = '1px solid green';
        }

        entensionImagen = foto.value.substring(foto.value.length-3,foto.value.length);
        browserType = 'jpg png jpeg gif';
        if(foto.value.length < 1 ){
            errores.push('* Cargar una foto');
            foto.style.backgroundColor = '#f98686';
        } else if(browserType.indexOf(entensionImagen) == -1) {
            errores.push('* El formato de la foto debe ser JPG, PNG, JPEG, o GIF');
            foto.style.backgroundColor = '#f98686';
        }


        //Aquí valido el password haciendo uso de Expresiones Regulares
        //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
        let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(!rePassword.test(password.value)){
            errores.push('* La pass mínimo de 8 caracteres, una letra y un número');
            password.style.border = '1px solid red';
        } else if (password.value.length < 1 ){
            errores.push('* Completar el campo de password');
            password.style.border = '1px solid red';
        } else if (password.value.length < 8) {
            errores.push('* El nombre debe tener al menos 8 caracteres');
            password.style.border = '1px solid red';
        } else {
            password.style.border = '1px solid green';
        }

        if (errores.length > 0) {

            event.preventDefault(); 

            let ulErrores = document.querySelector('.erroresFront ul');
            ulErrores.style.color = 'red';
            ulErrores.style.fontSize = '13px'

            ulErrores.innerHTML = [];
            for(let i = 0; i<errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

        } else {
            form.submit();
        }
    })
    
}