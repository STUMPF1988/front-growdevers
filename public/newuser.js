//primeiro criar um array vazio
var lista = [];
var indiceUpdate = undefined;

//se tiver valor no localstorage, vai recuperar e adicionar a essa lista transformando a string em objeto
const recupera = localStorage.getItem("Logar");
if (recupera) {
  lista = JSON.parse(recupera);
}

//a função que vai pegar os dados do input e criar o novo user
function criarConta() {
  const valor = document.getElementById("usuario").value;
  const valor2 = document.getElementById("password").value;
  const valor3 = document.getElementById("password2").value;

  if (indiceUpdate) {
    const objeto = lista[indiceUpdate];
    objeto.usuario = valor;
    objeto.password = valor2;
    objeto.password2 = valor2;
  } else {
    lista.push({
      usuario: valor,
      password: valor2,
      password2: valor2,
    });
  }
  salvar();

  indiceUpdate = undefined;

  document.getElementById("usuario").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password2").value = "";
}

function salvar() {
  const valor = JSON.stringify(lista); //aqui o Json recebe o objeto e transforma em String
  localStorage.setItem("listaUser", valor); //essa função salva os dados no localstorage, usando a chave Logar e os seus valores.
  window.location.href = "index.html";
}

//
