const api = axios.create({
  baseURL: "http://localhost/8082",
});

const params = new URLSearchParams(window.location.search);

if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página!");
  window.location.href = "index.html";
}

function sair() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

//post
function cadastraRecado() {
  const descricao = document.querySelector("#recadoDescricao").value;
  const detalhamento = document.querySelector("#recadoDetalhamento").value;

  api
    .post("/", {
      descricao,
      detalhamento,
    })
    .then((result) => {
      const newRecado = result.data; //ver se tem q colocar mais um data
      mostrar(newRecado); //chama a função para mostrar o recado
    })
    .catch((err) => {
      alert(err);
      console.log(err);
      console.log(err.request);
      console.log(err.response);
    });
}

//get
function mostrar() {
  const tbodyLista = document.querySelector("#dados > tbody");

  tbodyLista.innerHTML = "";

  for (let recado of recadoList) {
      tbodyLista.innerHTML += `
          <tr>
              <td>${recado.id}</td>
              <td>${recado.descricao}</td>
              <td>${recado.detalhamento}</td>
              
          </tr>
      `;
  }
  api.get("/", {
      params: {
          descricao,
          detalhamento,
      },
  })
      .then((result) => {
          const recadoList = result.data;
          
          atualizaTabela(recadoList);
         
      })
      .catch((err) => {
         alert(err);
          console.log(err);
          console.log(err.request);
          console.log(err.response);
         
      });
}


mostrar();