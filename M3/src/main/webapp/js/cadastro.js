

function validaDados(){
    let cpf = document.getElementById("cpf");
    let nome = document.getElementById("nome");
    let email = document.getElementById("email");
    let cep = document.getElementById("cep");
    let numeroResidencia = document.getElementById("numeroCasa");
    let senha = document.getElementById("senha");
    let confirmaSenha = document.getElementById("senhaValidacao");
    let complemento = document.getElementById("complemento");
    
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
    
    if(nome.value.length === 0 || nome.value.length > 90){
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "Nome inválido";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
        
        validado = false;
    }
    
    if(email.value.length === 0 || email.value.length > 120){
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "Email inválido";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
        
        validado = false;
    }
    
    if(numeroResidencia.value.length === 0 || numeroResidencia.value.length > 5){
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "Número residencial inválido";
        
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
    
    if(senha.value !== confirmaSenha.value){
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "As senhas são diferentes";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
        
        validado = false;
    }
    
    if(validado){
        divErro.innerHTML = "";
        
        let cliente = new Cliente(nome.value, cpf.value, email.value, cep.value, numeroResidencia.value, complemento.value, senha.value);
        
        cadastraCliente(cliente);
    }
}

function cadastrado(){
    console.log(this.readyState);
    console.log(this.status);
    
    
    if(this.readyState === 4 && this.status === 200){
        let divMensagem = document.getElementById("cadastroConcluido");
        
        let elemento = document.createElement("a");
        elemento.className = "cadastroConcluido";
        elemento.innerHTML = "Cadastro concluido";
    }else if(this.readyState === 4 && this.status !== 200){
        let divErro = document.getElementById("erroMenssagem");
        
        let erro = document.createElement("a");
        erro.className = "erroFormulario";
        erro.innerHTML = "Erro ao cadastrar o usuario tente novamente";
        
        divErro.appendChild(erro);
        
        erro = document.createElement("br");
        divErro.appendChild(erro);
    }

}

function cadastraCliente(cliente){
    let httpRequest= new XMLHttpRequest();
    httpRequest.onreadystatechange=cadastrado;
    
    let teste = "nome="+cliente.nome+"&cpf="+cliente.cpf+"&email="+cliente.email+"&cep="+cliente.cep+"&numeroResidencia="+cliente.numeroResidencia+"&complemento="+cliente.complemento+"&senha="+cliente.senha;
    
    httpRequest.open("POST","http://localhost:8080/M3/cadastroCliente?"+teste, true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-formurlencoded');
    httpRequest.send("nome="+encodeURIComponent(cliente.nome)+"&cpf="+ encodeURIComponent(cliente.cpf)+"&email="+ encodeURIComponent(cliente.email)+"&cep="+ encodeURIComponent(cliente.cep)+"&numeroResidencia="+ encodeURIComponent(cliente.numeroResidencia)+"&complemento="+ encodeURIComponent(cliente.complemento)+"&senha="+ encodeURIComponent(cliente.senha));
}

function telaLogin(){
    let height=800;
    let width=600;
    let left=(window.innerWidth-width)/2;
    let top=(window.innerHeight-height)/2;
    window.open("login.html","_blank", "height="+height+", width="+width+", left="+left+", top="+top);
}