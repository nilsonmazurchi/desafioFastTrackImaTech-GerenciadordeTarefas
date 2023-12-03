document.addEventListener("DOMContentLoaded", function () {
    // Obter o ID da tarefa da URL
    var urlParams = new URLSearchParams(window.location.search);
    var tarefaId = urlParams.get('tarefaId');
    console.log(tarefaId)
    // Carregar detalhes da tarefa com o ID fornecido
    carregarDetalhesDaTarefa(tarefaId);
});

// Função para obter parâmetros da URL
function obterParametroURL(nomeParametro) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}

function carregarDetalhesDaTarefa(tarefaId) {
    // Implementar lógica para carregar os detalhes da tarefa com o ID fornecido
    // Pode envolver a leitura do localStorage ou uma chamada a uma API
    // Exemplo de código fictício:
    var detalhesTarefa = obterDetalhesDaTarefa(tarefaId);

    // Preencher o formulário com os detalhes da tarefa
    document.getElementById("novoTitulo").value = detalhesTarefa.titulo;
    document.getElementById("novaDataInicio").value = detalhesTarefa.dataInicio;
    document.getElementById("novoHoraInicio").value = detalhesTarefa.horaInicio;
    document.getElementById("novaDataTermino").value = detalhesTarefa.dataTermino;
    document.getElementById("novoHoraTermino").value = detalhesTarefa.horaTermino;
    document.getElementById("novaDescricao").value = detalhesTarefa.descricao;

    atualizarVisibilidadeBotoes(detalhesTarefa.status);
}

function atualizarVisibilidadeBotoes(status) {
    var btnMarcarRealizada = document.getElementById("btnMarcarRealizada");
    var btnMarcarNaoRealizada = document.getElementById("btnMarcarNaoRealizada");

    if (status === "Realizada") {
        btnMarcarRealizada.style.display = "none";
        btnMarcarNaoRealizada.style.display = "block";
    } else {
        btnMarcarRealizada.style.display = "block";
        btnMarcarNaoRealizada.style.display = "none";
    }
}

function obterDetalhesDaTarefa(tarefaId) {
    // Implemente a lógica para obter os detalhes da tarefa com o ID fornecido
    // Isso pode envolver a leitura do localStorage ou uma chamada a uma API
    // Exemplo de código fictício:
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    console.log(tarefas)
    var detalhesTarefa = tarefas.find(function (tarefa) {
        return tarefa.id == tarefaId;
    });
    console.log(detalhesTarefa)

    return detalhesTarefa || {}; // Retorna um objeto vazio se a tarefa não for encontrada
}

function atualizarTarefa(tarefaAtualizada) {
    var tarefaId = obterParametroURL('tarefaId');
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Encontrar a tarefa com o ID correspondente
    var tarefa = tarefas.find(function (tarefa) {
        return tarefa.id == tarefaId;
    });

    if (tarefa) {
        // Atualizar os detalhes da tarefa
        tarefa.titulo = tarefaAtualizada.titulo;
        tarefa.dataInicio = tarefaAtualizada.dataInicio;
        tarefa.horaInicio = tarefaAtualizada.horaInicio;
        tarefa.dataTermino = tarefaAtualizada.dataTermino;
        tarefa.horaTermino = tarefaAtualizada.horaTermino;
        tarefa.descricao = tarefaAtualizada.descricao;

        // Atualizar o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    } else {
        console.error("Tarefa não encontrada para o ID fornecido: " + tarefaId);
    }
}

function salvarAlteracoes() {
    var tarefaAtualizada = {
        titulo: document.getElementById("novoTitulo").value,
        dataInicio: document.getElementById("novaDataInicio").value,
        horaInicio: document.getElementById("novoHoraInicio").value,
        dataTermino: document.getElementById("novaDataTermino").value,
        horaTermino: document.getElementById("novoHoraTermino").value,
        descricao: document.getElementById("novaDescricao").value
    };

    // Atualizar a tarefa no localStorage ou na API
    atualizarTarefa(tarefaAtualizada);

    console.log("Alterações salvas. Redirecionando para home.html")

    // Redirecionar de volta para a página principal
    window.location.href = "home.html";
}

function excluirTarefa() {
    var tarefaId = obterParametroURL('tarefaId');

    if (!tarefaId) {
        alert("ID da tarefa não encontrado na URL.");
        return;
    }

    var confirmacao = confirm("Tem certeza que deseja excluir esta tarefa?");

    if (confirmacao) {
        // Exemplo: Remover a tarefa do localStorage
        apagarTarefaPorId(tarefaId);

        // Redirecionar de volta para a página principal
        window.location.href = "home.html";
    }
}

function apagarTarefaPorId(tarefaId) {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Encontrar a tarefa com o ID correspondente
    var index = tarefas.findIndex(function (tarefa) {
        return tarefa.id == tarefaId;
    });

    if (index !== -1) {
        // Remover a tarefa da lista
        tarefas.splice(index, 1);

        // Atualizar o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    } else {
        console.error("Tarefa não encontrada para o ID fornecido: " + tarefaId);
    }
}

function mudarStatusConcluida() {
    // Implementar lógica para mudar o status da tarefa para "Concluída"
    // Pode envolver a atualização do item no localStorage ou uma chamada a uma API

    var confirmacao = confirm("Deseja marcar esta tarefa como concluída?");
    if (confirmacao) {
        // Exemplo: Atualizar o status da tarefa no localStorage
        var tarefaId = obterParametroURL('tarefaId');
        marcarTarefaComoConcluida(tarefaId);

        // Redirecionar de volta para a página principal
        window.location.href = "home.html";
    }
}

function marcarTarefaComoConcluida(tarefaId) {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Encontrar a tarefa com o ID correspondente
    var tarefa = tarefas.find(function (tarefa) {
        return tarefa.id == tarefaId;
    });

    if (tarefa) {
        // Atualizar o status da tarefa
        tarefa.status = "Realizada";

        // Atualizar o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    } else {
        console.error("Tarefa não encontrada para o ID fornecido: " + tarefaId);
    }
}

function marcarComoNaoRealizada() {
    var tarefaId = obterParametroURL('tarefaId');
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Encontrar a tarefa com o ID correspondente
    var tarefa = tarefas.find(function (tarefa) {
        return tarefa.id == tarefaId;
    });

    if (tarefa) {
        // Verificar as condições para atualizar o status da tarefa
        var novoStatus = verificarStatus(tarefa);

        // Atualizar o status da tarefa
        tarefa.status = novoStatus;

        // Atualizar o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Atualizar visibilidade dos botões com base no novo status
        atualizarVisibilidadeBotoes(novoStatus);

        console.log("Tarefa marcada como não realizada com sucesso.");
        
        // Redirecionar de volta para a página principal
        window.location.href = "home.html";
    } else {
        console.error("Tarefa não encontrada para o ID fornecido: " + tarefaId);
    }
}

function verificarStatus(tarefa) {
    var dataAtual = new Date();
    var dataInicio = new Date(tarefa.dataInicio + " " + tarefa.horaInicio);
    var dataTermino = new Date(tarefa.dataTermino + " " + tarefa.horaTermino);
    if (dataAtual < dataInicio) {
        return "Pendente";
    } else if (dataAtual >= dataInicio && dataAtual <= dataTermino) {
        return "Em andamento";
    } else {
        return "Em Atraso";
    }
}

function voltarParaHome() {
    // Redireciona para a página principal
    window.location.href = "home.html";
}