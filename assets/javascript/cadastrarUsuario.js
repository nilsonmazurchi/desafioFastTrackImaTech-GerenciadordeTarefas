function cadastrarUsuario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('emailCadastro').value;
    var senha = document.getElementById('senhaCadastro').value;

    if (nome === '' || email === '' || senha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuarioExistente = usuariosCadastrados.find(function (user) {
        return user.email === email;
    });

    if (usuarioExistente) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    var novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

    document.getElementById('nome').value = '';
    document.getElementById('emailCadastro').value = '';
    document.getElementById('senhaCadastro').value = '';

    alert('Cadastro realizado com sucesso!');
}
