//essa função vai pegar os dados do input e validar com o userValid
function entrar() {
  let usuario = document.querySelector("#usuario");

  let password = document.querySelector("#password");

  let listaUser = [];

  let userValid = {
    user: "",
    pass: "",
    pass2: "",
  };

  //aqui está se convertendo a informação digitada
  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  listaUser.forEach((item) => {
    if (usuario.value == item.usuario && password.value == item.password) {
      userValid = {
        user: item.usuario,
        pass: item.password,
        pass2: item.password2,
      };
    }
  });

  //aqui é a nossa condição para que seja direcionado o user à pagina de recados
  if (
    usuario.value == userValid.user &&
    password.value == userValid.pass &&
    userValid.user != ""
  ) {
    window.location.href = "recados.html";

    //aqui se criou um token para que o usuário só fique logado enquanto autenticado. Colocamos um token de 16 caracteres e subtraimos os dois primeiros, porque existem pontos.
    let token = Math.random().toString(16).substr(2);
    localStorage.setItem("token", token);
  } else {
    alert("Usuário e/ou senha inválidos!");
  }
}
