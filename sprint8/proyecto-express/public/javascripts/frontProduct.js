window.addEventListener("load", function () {
    let formularioProductos = this.document.querySelector("form.producto");
    formularioProductos.addEventListener("submit", function (e) {
        let errores = [];
        let campoTitulo = document.querySelector("input.titulo");
        if (campoTitulo.value == ""){
            errores.push("El campo Nombre es obligatorio");
        }else if(campoTitulo.value.length < 5) {
            errores.push("El campo Nombre debe tener almenos 5 caracteres");
        }
        let campoDescripcion = document.querySelector("textarea.descripcion");
        if (campoDescripcion.value == ""){
            errores.push("El campo Descripción es obligatorio");
        }else if(campoTitulo.value.length < 20) {
            errores.push("El campo Descripción debe tener almenos 20 caracteres");
        }
        let campoFoto = document.querySelector("input.img");
        //console.log(campoFoto.value);
        let extensiones_permitidas = [".jpg", ".png", ".jpeg", ".gif"];
        if (campoFoto.value == ""){            
            errores.push("Debes seleccionar una foto de perfil");
        } else {
            let extension = campoFoto.value.substring(campoFoto.value.lastIndexOf(".")).toLowerCase();
            let permitida = false;
            for (let  i = 0; i < extensiones_permitidas.length; i++) {
                if (extensiones_permitidas[i] == extension) {
                permitida = true;
                break;
                }
            }
            if (!permitida) {
                errores.push("Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join());
            }
        }


        document.querySelector("div.errores ul").innerHTML="";
        if (errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>" ;                
            }
        }
    });
})