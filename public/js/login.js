window.onload = function() {
    let password = document.querySelector('#pass');
    let email = document.querySelector('#mail');
    let form = document.querySelector('.form'); 


    form.addEventListener('submit', function(event){
        // event.preventDefault();
        let errores = [];
        
        //Aquí valido el password haciendo uso de Expresiones Regulares
        //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
        let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(!rePassword.test(password.value)){
            errores.push('* La contraseña como mínimo debe tener 8 caracteres, al menos una letra y un número');
            password.style.backgroundColor = 'blue';
        } else if (password.value.length < 1 ){
            errores.push('* Completar el campo de password');
            password.style.backgroundColor = '#f98686';
        } else if (password.value.length < 8) {
            errores.push('* El nombre debe tener al menos 8 caracteres');
            password.style.backgroundColor = '#f98686';
        }



         //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
         let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         if(!reEmail.test(email.value)){
             errores.push('* El email es inválido...');
             email.style.backgroundColor = 'blue';
         } else if(email.value.length < 1 ){
             errores.push('* Completar el campo de email');
             email.style.backgroundColor = '#f98686';
         }


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