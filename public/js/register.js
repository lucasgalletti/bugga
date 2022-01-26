window.onload = function() {
    let nombre = document.querySelector('#nombre');
    let email = document.querySelector('#mail');
    let nacimiento = document.querySelector('#nacimiento');
    let domicilio = document.querySelector('#domicilio');
    let foto = document.querySelector('#foto');
    let password = document.querySelector('#pass');    
    let form = document.querySelector('.form'); 


    form.addEventListener('submit', function(event){

        let errores = [];
        
        if(nombre.value.length < 1 ){
            errores.push('* Completar el campo de nombre');
            nombre.style.backgroundColor = '#f98686';
        } else if (nombre.value.length < 2) {
            errores.push('* El nombre debe tener al menos 2 caracteres');
            nombre.style.backgroundColor = '#f98686';
        }

        if(email.value.length < 1 ){
            errores.push('* Completar el campo de email');
            email.style.backgroundColor = '#f98686';
        }

        if(nacimiento.value.length < 1 ){
            errores.push('* Completar el campo de nacimiento');
            nacimiento.style.backgroundColor = '#f98686';
        }

        if(domicilio.value.length < 1 ){
            errores.push('* Completar el campo de domicilio');
            domicilio.style.backgroundColor = '#f98686';
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

        if(password.value.length < 1 ){
            errores.push('* Completar el campo de password');
            password.style.backgroundColor = '#f98686';
        } else if (password.value.length < 8) {
            errores.push('* El nombre debe tener al menos 8 caracteres');
            password.style.backgroundColor = '#f98686';
        }

        // errores.push('* Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial');
        // errores.push('* Deberá ser válido');
        // errores.push('* No puede repetirse con los e-mails ya registrados');


        if (errores.length > 0) {

            event.preventDefault(); 

            let ulErrores = document.querySelector('.erroresFront ul');
            ulErrores.style.color = 'red';

            ulErrores.innerHTML = [];
            for(let i = 0; i<errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

        } else {
            form.submit();
        }
    })
    
}