window.onload = function() {
    let name = document.querySelector('#name');
    let password = document.querySelector('#pass'); 
    let form = document.querySelector('#form'); password


    form.addEventListener('submit', function(event){
        // event.preventDefault();
        let errores = [];
        
        if(name.value.length < 1 ){
            errores.push('* Completar el campo del nombre de usuario');
            name.style.backgroundColor = '#f98686';
        }

        if(password.value.length < 1 ){
            errores.push('* Completar el campo del password');
            password.style.backgroundColor = '#f98686';
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