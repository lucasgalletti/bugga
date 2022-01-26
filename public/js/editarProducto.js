window.onload = function() {
    let titulo = document.querySelector('#name');
    let autor = document.querySelector('#autor');
    let price = document.querySelector('#price');
    // let foto = document.querySelector('#file');    
    
    let form = document.querySelector('.altaProd'); 

    console.log('hola aca estoy 2')

    form.addEventListener('submit', function(event){

        let errores = [];


        
        if(titulo.value.length < 1 ){
            errores.push('* Completar el campo de titulo');
            titulo.style.backgroundColor = '#f98686';
        } else if (titulo.value.length < 5) {
            errores.push('* El nombre debe tener al menos 5 caracteres');
            titulo.style.backgroundColor = '#f98686';
        }

        if(autor.value.length < 1 ){
            errores.push('* Seleccionar un autor');
            autor.style.backgroundColor = '#f98686';
        }

        if(price.value.length < 1 ){
            errores.push('* El precio debe ser mayor a 0');
            price.style.backgroundColor = '#f98686';
        }
 
        // entensionImagen = foto.value.substring(foto.value.length-3,foto.value.length);
        // browserType = 'jpg png jpeg gif';
        // if(foto.value.length < 1 ){
        //     errores.push('* Cargar una foto');
        //     foto.style.backgroundColor = '#f98686';
        // } else if(browserType.indexOf(entensionImagen) == -1) {
        //     errores.push('* El formato de la foto debe ser JPG, PNG, JPEG, o GIF');
        //     foto.style.backgroundColor = '#f98686';
        // }


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