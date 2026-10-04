import { iniciarPaginaInterna } from "../js/app.js";
import { listarCursos } from "../js/cursos.js";

const usuario = iniciarPaginaInterna();
const area = document.querySelector("#listaCursos");

// Converte "2026-02-02" em "02/02/2026"
const formatarData = (iso) => iso.split("-").reverse().join("/");

if (usuario) {
  listarCursos(usuario)
    .then((cursos) => {
      // Cria um card para cada curso
      cursos.forEach((curso) => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
          <h2>${curso.nomeCurso}</h2>
          <p>Início: <strong>${formatarData(curso.dataInicio)}</strong></p>
          <p>Fim: <strong>${formatarData(curso.dataFim)}</strong></p>`;
        area.appendChild(card);
      });
    })
    .catch((mensagem) => {
      const aviso = document.createElement("p");
      aviso.className = "aviso";
      aviso.textContent = mensagem;
      area.appendChild(aviso);
    });
}
