import { iniciarPaginaInterna } from "../js/app.js";
import { Aluno } from "../js/Aluno.js";
import { cadastrarAluno } from "../js/alunos.js";

iniciarPaginaInterna();

const form = document.querySelector("#formAluno");
const retorno = document.querySelector("#retorno");
const campo = (id) => document.querySelector("#" + id);
const vazio = (v) => (v ? "" : "Campo obrigatório.");

// Mostra (ou limpa) a mensagem de erro abaixo do campo
function mostrarErro(id, mensagem) {
  campo(id).closest("label").querySelector(".erro").textContent = mensagem;
  campo(id).setAttribute("aria-invalid", mensagem ? "true" : "false");
}

// Regras de validação: devolvem a mensagem de erro, ou "" se estiver válido
const regras = {
  nome: (v) => (v.length < 4 || v.length > 80 ? "Informe entre 4 e 80 caracteres." : ""),
  genero: (v) => vazio(v),
  dataNascimento: (v) => {
    const data = moment(v, "DD/MM/YYYY", true); // true = formato estrito
    if (!data.isValid()) return "Use o formato DD/MM/YYYY.";
    if (!data.isAfter("1900-01-01") || !data.isBefore(moment())) return "A data deve ser maior que 01/01/1900 e menor que hoje.";
    return "";
  },
  cpf: (v) => (/^\d{11}$/.test(v) ? "" : "Informe os 11 números do CPF."),
  telefone: (v) => (/^\d{10,11}$/.test(v) ? "" : "Informe DDD + número (10 ou 11 números)."),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? "" : "Informe um e-mail válido."),
  cep: (v) => (/^\d{8}$/.test(v) ? "" : "Informe os 8 números do CEP."),
  cidade: vazio, estado: vazio, logradouro: vazio, bairro: vazio,
  numero: (v) => (/^\d+$/.test(v) ? "" : "Informe somente números.")
};

// Valida todos os campos obrigatórios; devolve true se estiver tudo certo
function validar() {
  let valido = true;
  for (const id in regras) {
    const erro = regras[id](campo(id).value.trim());
    mostrarErro(id, erro);
    if (erro) valido = false;
  }
  return valido;
}

// Campos numéricos aceitam apenas dígitos
["cpf", "telefone", "cep", "numero"].forEach((id) =>
  campo(id).addEventListener("input", (e) => (e.target.value = e.target.value.replace(/\D/g, "")))
);

// API ViaCEP: ao completar 8 dígitos, busca o endereço e preenche os campos
campo("cep").addEventListener("input", async (e) => {
  if (e.target.value.length !== 8) return;
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${e.target.value}/json/`);
    const dados = await resposta.json();
    if (dados.erro) return mostrarErro("cep", "CEP não encontrado.");
    campo("cidade").value = dados.localidade;
    campo("estado").value = dados.uf;
    campo("logradouro").value = dados.logradouro;
    campo("bairro").value = dados.bairro;
    ["cep", "cidade", "estado", "logradouro", "bairro"].forEach((id) => mostrarErro(id, ""));
  } catch (erro) {
    mostrarErro("cep", "Não foi possível consultar o CEP. Preencha o endereço manualmente.");
  }
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  retorno.className = "feedback largo";
  if (!validar()) {
    retorno.textContent = "Corrija os campos destacados antes de salvar.";
    return;
  }
  const v = (id) => campo(id).value.trim();
  const nascimento = moment(v("dataNascimento"), "DD/MM/YYYY", true).format("YYYY-MM-DD");
  const aluno = new Aluno(v("nome"), v("genero"), nascimento, v("cpf"), v("telefone"), v("email"),
    v("cep"), v("cidade"), v("estado"), v("logradouro"), v("numero"), v("complemento"), v("bairro"));

  cadastrarAluno(aluno)
    .then((mensagem) => {
      retorno.textContent = mensagem;
      retorno.classList.add("sucesso");
      form.reset();
    })
    .catch((mensagem) => (retorno.textContent = mensagem));
});
