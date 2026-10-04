import { usuarios } from "../dados/listagem-usuarios.js";

// RF08 - Valida e-mail e senha; resolve com os dados do usuário (sem a senha)
export function login(email, senha) {
  return new Promise((resolve, reject) => {
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
    if (usuario) {
      const { senha: _senha, ...dadosSemSenha } = usuario; // não guarda a senha na sessão
      resolve(dadosSemSenha);
    } else {
      reject("Dados incorretos. Favor verificar e tentar novamente");
    }
  });
}
