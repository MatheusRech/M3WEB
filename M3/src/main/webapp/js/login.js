function requestResponse(){
    if(this.readyState === 4 && this.status === 200){
        let divMensagem = window.opener.document.getElementById("cadastroConcluido");
        
        let elemento = document.createElement("a");
        elemento.className = "cadastroConcluido";
        elemento.innerHTML = "Login efetuado";
        
        divMensagem.appendChild(elemento);
        
        elemento = document.createElement("br");
        divMensagem.appendChild(elemento);
        
    }else if(this.readyState === 4 && this.status !== 200){
        let divErro = document.getElementById("erroMenssagem");
        
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "Erro de login";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
    }
}


function login(){
    let cpf = document.getElementById("cpf");
    let senha = document.getElementById("senha");
    
    let divErro = document.getElementById("erroMenssagem");
    
    let validado = true;
    
    if(cpf.value.length !== 11){
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "CPF inválido";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
        
        validado = false;
    }
    
    if(senha.value.length <= 8 || senha.value.length > 30){
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "Senha inválida, a senha deve ser maior que 8 dígitos e menor que 30 dígitos";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
        
        validado = false;
    }
    
    if(validado){
        divErro.innerHTML = "";
        
        let httpRequest= new XMLHttpRequest();
        httpRequest.onreadystatechange=requestResponse;

        let teste = "cpf="+cpf.value+"&senha="+senha.value;

        httpRequest.open("POST","http://localhost:8080/M3/loginCliente?"+teste, true);
        httpRequest.setRequestHeader('Content-type', 'application/x-www-formurlencoded');
        httpRequest.send("cpf="+cpf.value+"&senha="+senha.value);

    }
    
}


