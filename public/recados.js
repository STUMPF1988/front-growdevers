//se o usuário não tiver autenticado, o token não vai gerar os caracteres e então não levará o user até a página de recados.
if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página!");
  window.location.href = "index.html";
}

//para se deslogar, é necessário remover o token e direcionar o user para a pagina inicial
function sair() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

let lista = [];
let indiceUpdate = undefined;

function cadastraRecado() {
  const valor = document.getElementById("recadoDescricao").value;
  const valor2 = document.getElementById("recadoDetalhamento").value;

  if (indiceUpdate) {
    const objeto = lista[indiceUpdate];
    objeto.recadoDescricao = valor;
    objeto.recadoDetalhamento = valor2;
  } else {
    lista.push({
      recadoDescricao: valor,
      recadoDetalhamento: valor2,
    });
  }

  salvar();

  mostrar();

  indiceUpdate = undefined;
  document.getElementById("recadoDescricao").value = "";
  document.getElementById("recadoDetalhamento").value = "";
}

function salvar() {
  const valor = JSON.stringify(lista);
  localStorage.setItem("Recados", valor);
}

function apagar(indice) {
  lista.splice(indice, 1);

  salvar();

  mostrar();
}

function editar(indice) {
  const objetoSelecionado = lista[indice];

  document.getElementById("recadoDescricao").value =
    objetoSelecionado.recadoDescricao;
  document.getElementById("recadoDetalhamento").value =
    objetoSelecionado.recadoDetalhamento;
  indiceUpdate = indice;
}

function mostrar() {
  const el = document.getElementById("dados");

  let conteudo = "<table border = '2'>";
  let indice = 0;
  for (const valor of lista) {
    conteudo += `<table class="table table-striped">
    <thead>
    <tr class = "text-dark">
    <th>Descrição</th>
    <th>Detalhamento</th>
    <th>Ação</th>
    <th>Ação</th>
    </tr>
    </thead>
    <tbody class="bg-white">
    <tr>
    <td>${valor.recadoDescricao}</td>
    <td>${valor.recadoDetalhamento}</td>
    <td><button onclick='apagar(${indice})'>Excluir</button></td>
    <td><button onclick='editar(${indice})'>Editar</button></td>
    </tr>
    </tbody>
    `;
    indice++;
  }
  conteudo += "</table>";

  el.innerHTML = conteudo;
}

const recupera = localStorage.getItem("Recados");
if (recupera) {
  lista = JSON.parse(recupera);
}
