window.onload = function() {
    let form = document.querySelector('#form');
    let name = document.querySelector('#name');
    let mail = document.querySelector('#mail');
    let password = document.querySelector('#pass'); 

    form.addEventListener('submit', function(event){

        let errores = [];
        
        if(name.value.length < 1 ){
            errores.push('* Completar el campo del nombre de usuario');
            name.style.border = '1px solid red';
        }else {
            name.style.border = '1px solid green';
        }
        if(mail.value.length < 1 ){
            errores.push('* Completar el campo del email');
            mail.style.border = '1px solid red';
        }else {
            name.style.border = '1px solid green';
        }
        if(password.value.length < 1 ){
            errores.push('* Completar el campo del password');
            password.style.border = '1px solid red';;
        }else {
            name.style.border = '1px solid green';
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


    })
    
}