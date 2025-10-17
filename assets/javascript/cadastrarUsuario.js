function cadastrarUsuario() {
    // Verifica se o localStorage está disponível
    if (typeof(Storage) === "undefined") {
        alert("O seu navegador não suporta armazenamento local. Tente outro navegador.");
        return;
    }

    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('emailCadastro').value.trim();
    var senha = document.getElementById('senhaCadastro').value.trim();

    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Inicializa o array se não existir
    var usuariosCadastrados = [];
    try {
        usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch (e) {
        console.error("Erro ao ler localStorage:", e);
        localStorage.removeItem('usuarios');
    }

    // Verifica duplicidade
    var usuarioExistente = usuariosCadastrados.find(user => user.email === email);
    if (usuarioExistente) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    // Cadastra novo usuário
    var novoUsuario = { nome, email, senha };
    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

    // Limpa os campos
    document.getElementById('nome').value = '';
    document.getElementById('emailCadastro').value = '';
    document.getElementById('senhaCadastro').value = '';

    alert('Cadastro realizado com sucesso! Faça login para continuar.');

    // Redireciona de forma RELATIVA
    window.location.href = "index.html";
}
