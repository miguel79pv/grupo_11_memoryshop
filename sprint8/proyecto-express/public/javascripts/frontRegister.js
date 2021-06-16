window.addEventListener("load", function () {
    let formularioRegistro = this.document.querySelector("form.register");
    formularioRegistro.addEventListener("submit", function (e) {        
        let errores = [];
        document.querySelector("div.errores ul").innerHTML="";
        let campoNombre = document.querySelector("input.name");
        //console.log(campoNombre);
        if (campoNombre.value == ""){
            errores.push("El campo nombre tiene que estar completo");
        }else if(campoNombre.value.length < 3) {
            errores.push("El campo nombre debe tener almenos 3 caracteres");
        }
        let campoApellido = document.querySelector("input.last_name");
        //console.log(campoNombre);
        if (campoApellido.value == ""){
            errores.push("El campo apellido tiene que estar completo");
        }else if(campoApellido.value.length < 3) {
            errores.push("El campo apellido debe tener almenos 3 caracteres");
        }
        let campoEmail = document.querySelector("input.email");
        //console.log(campoEmail);
        if (campoEmail.value == ""){
            errores.push("El campo email tiene que estar completo");
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
        let campoPassword = document.querySelector("input.password");
        if (campoPassword.value == ""){
            errores.push("El campo passwors es obligatorio");
        }else if(campoPassword.value.length < 8) {
            errores.push("El campo password debe tener almenos 8 caracteres");
        }
        if (errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>" ;                
            }
        }
    });    
})