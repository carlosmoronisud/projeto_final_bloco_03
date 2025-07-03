# Projeto Farmácia - Frontend com React + Vite + Google Auth

<br />

<div align="center">     
     <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div> 
<br /> 

<div align="center">   
    <img src="https://img.shields.io/github/languages/top/carlosmoronisud/projeto-final-bloco-03-teal?style=flat-square" />
    <img src="https://img.shields.io/github/repo-size/carlosmoronisud/projeto-final-bloco-03-teal?style=flat-square" />   
    <img src="https://img.shields.io/github/languages/count/carlosmoronisud/projeto-final-bloco-03-teal?style=flat-square" />
    <img src="https://img.shields.io/github/last-commit/carlosmoronisud/projeto-final-bloco-03-teal?style=flat-square" />
    <img src="https://img.shields.io/github/issues/carlosmoronisud/projeto-final-bloco-03-teal?style=flat-square" />
    <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square" /> 
</div>

<br />

## 1. Descrição

O **Projeto Farmácia** é uma aplicação web completa desenvolvida com **React**, **Vite** e **TypeScript**, com autenticação via **Google OAuth**. Ela se conecta a uma API backend em Java Spring Boot para gerenciar **produtos** e **categorias** de uma farmácia.

Funcionalidades:

- Login com conta Google
- Cadastro, edição e exclusão de produtos
- Cadastro, edição e exclusão de categorias
- Relacionamento: cada produto pertence a uma categoria
- Busca de produtos por nome
- Rotas protegidas para ações de CRUD
- Interface responsiva com Tailwind CSS e Material UI

<br />

## 2. Backend (API Spring Boot)

🔗 A aplicação consome a API hospedada em:

[https://farmacia-ug0p.onrender.com/swagger-ui/swagger-ui/index.html](https://farmacia-ug0p.onrender.com/swagger-ui/swagger-ui/index.html)

> ⚠️ Este endpoint é **obrigatório** para o funcionamento da aplicação. Sem ele, o frontend não carrega os dados.

<br />

## 3. Tecnologias Utilizadas

| Tecnologia             | Finalidade                              |
| ---------------------- | ---------------------------------------- |
| **React**              | Criação de interfaces reativas           |
| **TypeScript**         | Tipagem estática em JavaScript           |
| **Vite**               | Ferramenta de build rápida e leve        |
| **Tailwind CSS**       | Estilização com utilitários CSS          |
| **Material UI**        | Componentes visuais responsivos          |
| **Axios**              | Requisições HTTP para a API              |
| **React Router DOM**   | Roteamento SPA                           |
| **Google OAuth**       | Autenticação de usuários com o Google    |
| **Context API**        | Controle de login/logout global          |

<br />

## 4. Pré-requisitos

Antes de rodar o projeto, é necessário ter:

- [Node.js](https://nodejs.org/) (16+)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

<br />

## 5. Como executar o projeto localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/carlosmoronisud/projeto-final-bloco-03-teal.git

```
##Acesse a pasta do projeto:

```bash

cd projeto-final-bloco-03-teal
```

Instale as dependências:

```bash

npm install
```

Execute o projeto:


```bash

npm run dev
```
```bash
Abra no navegador:

http://localhost:5173
Lembre-se: a API precisa estar rodando em https://farmacia-ug0p.onrender.com.
```
<br />
##6. Deploy
✅ O projeto está publicado em produção em:

```bash

🔗 https://projeto-final-bloco-03-teal.vercel.app/

```

Backend consumido diretamente do Render.

<br />

#7. Estrutura de Diretórios
```bash

src/
│
├── assets/           → Imagens e ícones
├── components/       → Componentes visuais reutilizáveis
├── contexts/         → Lógica de autenticação com Google
├── models/           → Tipagens de Categoria e Produto
├── pages/            → Telas de CRUD, Home e Perfil
├── services/         → Axios e serviços da API
├── utils/            → Toasts e funções auxiliares
├── App.tsx           → Componente raiz e rotas
├── main.tsx          → Ponto de entrada
└── index.css         → Estilização com Tailwind

```

8. Funcionalidades em Destaque
🔒 Rotas protegidas com PrivateRoute para edição/cadastro

🔍 Busca de produtos por nome com query na URL

📦 Relação entre categoria e produto persistente

☁️ Login via Google OAuth com foto e botão de logout

<br />

9. Melhorias Futuras
Upload de imagem para produtos

Filtros por categoria

Dashboard de administração

Integração com sistema de estoque real

<br />

#10. Contribuindo

Contribuições são bem-vindas!

🐛 Relate bugs abrindo uma issue

✨ Envie melhorias com um pull request

💬 Compartilhe com colegas aprendizes

<br />

##11. Contato
Desenvolvido com 💊 por Carlos Moroni

Em caso de dúvidas, sugestões ou colaborações, sinta-se à vontade para entrar em contato pelo GitHub.


