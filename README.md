# AVA-EDUCA+

## Descrição
Protótipo de uma plataforma que centraliza informações acadêmicas para a equipe pedagógica de uma empresa de educação profissional. Hoje esses dados ficam espalhados em sistemas e planilhas; aqui o professor faz login, vê os cursos em que atua e cadastra alunos em um único lugar, no computador ou no celular.

## Técnicas e tecnologias
- HTML5 com tags semânticas (`header`, `nav`, `main`, `section`, `article`, `fieldset`) e formulários
- CSS3: Flexbox (cabeçalho, menu), CSS Grid (cards e formulário), media queries (mobile até 768px, desktop a partir de 768px)
- JavaScript puro: tipos de dados, condicionais, repetições, arrow functions, arrays, objetos, POO (classe `Aluno`), callbacks, Promises, `async/await`, `fetch` (GET), módulos ES (`import`/`export`), DOM, eventos, `sessionStorage` e `window.alert`
- API externa [ViaCEP](https://viacep.com.br) para preencher o endereço pelo CEP
- Biblioteca [moment](https://momentjs.com) (via CDN) para validar a data de nascimento
- Git/GitHub e quadro Kanban (Trello) para organização

## Estrutura do projeto
```
ava-educa/
├── index.html            (redireciona para o login via js/app.js)
├── package.json          ("type": "module")
├── login/                login.html, login.js, login.css
├── dashboard/            dashboard.html, dashboard.js, dashboard.css
├── cadastro-aluno/       cadastro-aluno.html, cadastro-aluno.js, cadastro-aluno.css
├── css/style.css         estilos compartilhados
├── js/                   app.js, auth.js, cursos.js, Aluno.js, alunos.js
├── dados/                listagem-usuarios.js, listagem-cursos.js, listagem-alunos.js
└── assets/               images/, icons/
```

## Como executar
Como o projeto usa módulos ES, o navegador não os carrega ao abrir o arquivo direto (`file://`). Sirva a pasta com um servidor estático local:
1. **VS Code:** instale a extensão *Live Server*, clique com o botão direito em `index.html` e escolha *Open with Live Server*; ou
2. **Terminal:** dentro da pasta, rode `python -m http.server 5500` e acesse `http://localhost:5500`.

Usuários de teste:

| E-mail | Senha | Cursos |
|---|---|---|
| ana.silva@edutech.com | 123456 | 6 cursos |
| carlos.santos@edutech.com | 654321 | 2 cursos |
| mariana.costa@edutech.com | edu2026 | nenhum (mostra o aviso) |

## Melhorias possíveis
- Persistir os alunos cadastrados (hoje ficam apenas em memória e somem ao recarregar a página)
- Listar e editar alunos; ativar a tela de Cursos
- Recuperação de senha



## Links
- Trello: https://trello.com/invite/b/6ac2a2294a7e56cbdbab2d9f/ATTIdab7d9d5ffaff6193067a3f064a5f8ec9F0328D5/ava

