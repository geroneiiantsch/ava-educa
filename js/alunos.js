import { alunos } from "../dados/listagem-alunos.js";

// RF06 - Insere o aluno na listagem e devolve uma Promise
export function cadastrarAluno(aluno) {
  return new Promise((resolve, reject) => {
    try {
      aluno.id = Math.max(0, ...alunos.map((a) => a.id)) + 1; // identificador único
      alunos.push(aluno);
      resolve("Aluno cadastrado com sucesso!");
    } catch (erro) {
      reject("Erro ao cadastrar o aluno");
    }
  });
}
