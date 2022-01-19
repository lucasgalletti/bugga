window.onload = function() {
    let password = document.querySelector('#pass');
    let email = document.querySelector('#mail');
    let button = document.querySelector('#button');
    let form = document.querySelector('.form'); 


    form.addEventListener('submit', function(event){
        // event.preventDefault();
        let errores = [];
        
        if(password.value.length < 1 ){
            errores.push('Completar el campo de password');
        }

        if(email.value.length < 1 ){
            errores.push('Completar el campo de email');
        }

        if (errores.length > 0) {

            event.preventDefault(); 

            let ulErrores = document.querySelector('.erroresFront ul');
            ulErrores.style.color = 'red';

            
            for(let i = 0; i<errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

        } else {
            form.submit();
        }
    })
    
}