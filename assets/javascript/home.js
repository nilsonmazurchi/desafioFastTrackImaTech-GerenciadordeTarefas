document.addEventListener("DOMContentLoaded", function () {
   var usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario)

    if (usuario) {
        exibirMensagemPeriodoDia(usuario);
        carregarTarefas(usuario);
    } else {
        alert("Usuário não encontrado. Redirecionando para a página de login.");
        window.location.href = "index.html";
    }
});

function exibirMensagemPeriodoDia(usuario) {
    var saudacao = "";
    var dataAtual = new Date();
    var hora = dataAtual.getHours();

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde";
    } else {
        saudacao = "Boa noite";
    }

    document.getElementById("mensagemUsuario").innerHTML = saudacao + ", " + usuario.nome + "!";
}

function sair() {    
    localStorage.removeItem('usuario');   
    alert("Sessão encerrada. Redirecionando para a página de login.");
    window.location.href = "index.html";
}

function cadastrarTarefa() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario) {
        console.error("Usuário não encontrado no localStorage. Redirecionando para a página de login.");
        window.location.href = "index.html";
        return;
    }

    var titulo = document.getElementById("titulo").value;
    var dataInicio = document.getElementById("dataInicio").value;
    var horaInicio = document.getElementById("horaInicio").value;
    var dataTermino = document.getElementById("dataTermino").value;
    var horaTermino = document.getElementById("horaTermino").value;
    var descricao = document.getElementById("descricao").value;

    var novaTarefa = {
        id: gerarIdUnico(),
        titulo: titulo,
        dataInicio: dataInicio,
        horaInicio: horaInicio,
        dataTermino: dataTermino,
        horaTermino: horaTermino,
        descricao: descricao,
        status: "Pendente",
        usuarioId: usuario.email
    };

    function gerarIdUnico() {
        return Date.now(); 
    }

    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    
    document.getElementById("formTarefa").reset();
    
    carregarTarefas(usuario);
}

function carregarTarefas(usuario) {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
    var tabelaTarefas = document.getElementById("tarefasTableBody");
   
    tabelaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, index) {
        if (tarefa.usuarioId === usuario.email) {
            var row = tabelaTarefas.insertRow();
            
            var colunaTarefa = row.insertCell(0);
            colunaTarefa.innerText = tarefa.titulo;
            
            colunaTarefa.addEventListener("click", function () {
                abrirModalDescricao(tarefa.titulo, tarefa.descricao);
            });
            
            var colunaInicio = row.insertCell(1);
            colunaInicio.innerText = `${tarefa.dataInicio} ${tarefa.horaInicio}`;
           
            var colunaTermino = row.insertCell(2);
            colunaTermino.innerText = `${tarefa.dataTermino} ${tarefa.horaTermino}`;
           
            var colunaStatus = row.insertCell(3);
            colunaStatus.innerText = verificarStatus(tarefa);
           
            var colunaAcoes = row.insertCell(4);
            var botaoAlterar = document.createElement("button");
            botaoAlterar.innerText = "Alterar";
            botaoAlterar.classList.add("botao-alterar");
            botaoAlterar.onclick = function () {
                redirecionarParaPaginaAlterar(tarefa.id); 
            };
           
            colunaAcoes.appendChild(botaoAlterar);           
        }
    });
}

function redirecionarParaPaginaAlterar(tarefaId) {    
    window.location.href = "alterarTarefa.html?tarefaId=" + tarefaId;
}


function verificarStatus(tarefa) {
    var dataAtual = new Date();
    var dataInicio = new Date(tarefa.dataInicio + " " + tarefa.horaInicio);
    var dataTermino = new Date(tarefa.dataTermino + " " + tarefa.horaTermino);

    if (tarefa.status === "Realizada") {
        return "Realizada";
    } else if (dataAtual < dataInicio) {
        return "Pendente";
    } else if (dataAtual >= dataInicio && dataAtual <= dataTermino) {
        return "Em andamento";
    } else {
        return "Em Atraso";
    }
}

function apagarTodosUsuarios() {    
    localStorage.removeItem('usuarios');
    localStorage.removeItem('tarefas');
    
    localStorage.removeItem('usuario');
    localStorage.removeItem('tarefa');
    
    alert("Todos os usuários foram removidos.");
}


function abrirModalDescricao(titulo, descricao) {
    var modal = document.getElementById("modalDescricao");
    var modalTitulo = document.getElementById("modalTitulo");
    var modalDescricaoTexto = document.getElementById("modalDescricaoTexto");

    modal.classList.add("mostrar-modal");

    modal.style.display = "block";
    modalTitulo.innerText = titulo;
    modalDescricaoTexto.innerText = descricao;

    var closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = fecharModalDescricao;

    modalTitulo.appendChild(closeButton);
}

function fecharModalDescricao() {
    var modal = document.getElementById("modalDescricao");    
    modal.classList.remove("mostrar-modal");
    modal.style.display = "none";
}