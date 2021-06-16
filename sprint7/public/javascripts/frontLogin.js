window.addEventListener("load", function () {
    let formularioLogin = this.document.querySelector("form.login");
    formularioLogin.addEventListener("submit", function (e) {
        let errores = [];
        document.querySelector("div.errores ul").innerHTML="";
        let campoEmail = document.querySelector("input.email");
        //console.log(campoEmail);
        if (campoEmail.value == ""){
            errores.push("El campo email es obligatorio");
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