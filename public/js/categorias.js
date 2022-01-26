window.onload = function() {
    let categoria = document.querySelector('#categoria');
    let form = document.querySelector('#form'); 


    form.addEventListener('submit', function(event){
        // event.preventDefault();
        let errores = [];
        
        if(categoria.value.length < 1 ){
            errores.push('* Completar el campo para buscar categorias');
            categoria.style.backgroundColor = '#f98686';
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