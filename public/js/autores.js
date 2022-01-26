window.onload = function() {
    let buscar = document.querySelector('#buscar');
    let form = document.querySelector('#form'); 


    form.addEventListener('submit', function(event){
        // event.preventDefault();
        let errores = [];
        
        if(buscar.value.length < 1 ){
            errores.push('* Completar el campo para buscar autores');
            buscar.style.backgroundColor = '#f98686';
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