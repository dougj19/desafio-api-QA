# 📊 Desafio de Automação de Testes - API Serverest

Este repositório contém a automação de testes da API [Serverest.dev](https://serverest.dev), como parte de um desafio técnico de QA.

## 🔧 Tecnologias utilizadas

- ✅ [Cypress](https://www.cypress.io/) - Framework de automação de testes
- ✅ JavaScript
- ✅ Node.js

---

## 📋 2. Levantamento de Cenários Automatizados

### 🔐 Login
- [x] Login com dados válidos
- [x] Login com senha incorreta
- [x] Login com usuário inexistente
- [x] Login sem preencher campos obrigatórios

---

### 👤 Usuários
- [x] Criar usuário com dados válidos
- [x] Criar usuário com e-mail já existente
- [x] Buscar lista de usuários
- [x] Alterar um usuário
- [x] Deletar usuário

---

### 📦 Produtos
- [x] Cadastrar produto com token válido
- [x] Cadastrar produto com nome já existente
- [x] Consultar lista de produtos
- [x] Editar um produto
- [x] Deletar produto

---

### 🛒 Carrinhos
- [x] Criar carrinho com produto válido
- [x] Criar carrinho com produto inexistente
- [x] Concluir compra com sucesso
- [x] Buscar carrinho por ID

---

## ⚙️ Como instalar as dependências

1. Clone este repositório:

```bash
git clone https://github.com/dougj19/desafio-api-QA.git
```

2. Instale as dependências:
```bash
npm install
```

3. Execute os testes no modo interativo:
```bash
npx cypress open
```

Ou no modo headless (terminal):
```bash
npx cypress run
```

---

## 📂 Estrutura do projeto

```
cypress/
  └── e2e/
      ├── login.cy.js
      ├── usuarios.cy.js
      ├── produtos.cy.js
      └── carrinhos.cy.js
```

---

## 📌 Observações
- Os testes utilizam dados da API pública Serverest.
- Alguns testes exigem a limpeza do estado anterior (ex: carrinho existente ou estoque esgotado).
- Tokens e usuários fixos são utilizados para simular fluxo completo.

---

👨‍💻 **Autor:** Douglas José dos Santos  
📧 **douglas_tosca@hotmail.com**