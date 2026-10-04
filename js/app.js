// Funções compartilhadas entre as páginas
const CHAVE_SESSAO = "usuarioLogado";

export const obterUsuarioLogado = () => JSON.parse(sessionStorage.getItem(CHAVE_SESSAO));
export const salvarUsuarioLogado = (usuario) => sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));

// Sair: remove o usuário da sessionStorage e volta ao login
export function sair() {
  sessionStorage.removeItem(CHAVE_SESSAO);
  window.location.href = "../login/login.html";
}

// Usada pelas páginas internas: protege a rota, mostra o nome no cabeçalho e liga o menu
export function iniciarPaginaInterna() {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    window.location.href = "../login/login.html";
    return null;
  }
  document.querySelector("#nomeUsuario").textContent = usuario.nome;
  document.querySelector("#btnDashboard").addEventListener("click", () => (window.location.href = "../dashboard/dashboard.html"));
  document.querySelector("#btnCadastro").addEventListener("click", () => (window.location.href = "../cadastro-aluno/cadastro-aluno.html"));
  document.querySelector("#btnSair").addEventListener("click", sair);
  return usuario;
}

// RF01 - index.html redireciona para o login
if (document.body.dataset.pagina === "index") {
  window.location.href = "login/login.html";
}
