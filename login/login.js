import { login } from "../js/auth.js";
import { salvarUsuarioLogado } from "../js/app.js";

const form = document.querySelector("#formLogin");
const mensagem = document.querySelector("#mensagem");

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value;

  // Só valida se os dois campos estiverem preenchidos
  if (!email || !senha) {
    mensagem.textContent = "Preencha o e-mail e a senha.";
    return;
  }
  try {
    const usuario = await login(email, senha);
    salvarUsuarioLogado(usuario); // guarda na sessionStorage
    window.location.href = "../dashboard/dashboard.html";
  } catch (erro) {
    mensagem.textContent = erro; // feedback visual de dados inválidos
  }
});

// "Esqueci minha senha" não precisa ser implementado
document.querySelector("#esqueci").addEventListener("click", (evento) => {
  evento.preventDefault();
  window.alert("Funcionalidade em construção.");
});
