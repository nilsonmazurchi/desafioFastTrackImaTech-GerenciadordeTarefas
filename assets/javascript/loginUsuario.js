function entrar() {   
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senhaLogin').value;

    var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(usuariosCadastrados)
    var usuario = usuariosCadastrados.find(function (user) {
        return user.email === email && user.senha === senha;
    });

    console.log(usuario)

    if (!usuario) {
        alert('E-mail ou senha incorretos. Tente novamente.');
        return;
    }

    alert('Login bem-sucedido! Bem-vindo, ' + usuario.nome + '!');

    localStorage.setItem('usuario', JSON.stringify(usuario));

    window.location.href = '/home.html';
}
