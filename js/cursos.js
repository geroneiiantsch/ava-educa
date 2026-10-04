import { cursos } from "../dados/listagem-cursos.js";

// RF07 - Cursos em que o usuário logado atua
export function listarCursos(usuario) {
  return new Promise((resolve, reject) => {
    const cursosDoUsuario = cursos.filter((c) => c.emailProfessor === usuario.email);
    if (cursosDoUsuario.length > 0) {
      resolve(cursosDoUsuario);
    } else {
      reject("Não há cursos cadastrados para esse usuário");
    }
  });
}
