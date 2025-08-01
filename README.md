# Controle_Produtos
Sistema completo com API REST para cadastro e gerenciamento de produtos, autenticação de usuários, permissões (admin e comum), imagens, categorias, filtros, dashboard e logs de ações.
# 📦 Sistema de Gestão de Produtos com Usuários e Permissões

Sistema completo com API REST para cadastro e gerenciamento de produtos, autenticação de usuários, permissões (admin e comum), imagens, categorias, filtros, dashboard e logs de ações.

---

## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite (com opção futura de PostgreSQL)
- HTML, CSS e JavaScript (frontend)
- JWT para autenticação
- Bcrypt para criptografia de senha
- Multer para upload de imagens
- Cloudinary (opcional)
- Day.js (datas)

---

## 🗂️ Estrutura do Projeto
## 👥 Usuários

### Campos:
- `nome` (string)
- `email` (string, único)
- `senha` (hash)
- `telefone` (string)
- `cpf` (string)
- `fotoPerfil` (upload)

### Tipos:
- `comum`: acessa e edita apenas seus próprios dados e produtos
- `admin`: pode editar qualquer perfil/produto e gerenciar categorias

---

## 🔐 Permissões

| Recurso         | Usuário Comum | Admin        |
|-----------------|----------------|--------------|
| CRUD produtos   | Somente os seus | Todos        |
| CRUD categorias | ❌              | ✅           |
| Editar perfil   | ✅              | ✅ (todos)   |
| Acessar logs    | ❌              | ✅           |

---

## 📦 Produtos

### Campos:
- `nome` (string)
- `preço` (float)
- `descrição` (text)
- `categoriaId` (relacionado a categorias)
- `imagem` (upload)
- `quantidade` (int)
- `status` (ativo/inativo)
- `codigoProduto` (string)
- `criadoEm` (data)

---

## 🗃️ Categorias

### Campos:
- `nome` (string)
- Somente o admin pode criar, editar ou excluir

---

## 🔎 Filtros e Buscas

O sistema permite combinação de filtros:

- Nome do produto
- Nome da categoria
- Faixa de preço
- Intervalo de datas

---

## 📊 Dashboard

Visível apenas para administradores. Exibe:

- Total de produtos
- Total de usuários
- Produtos por categoria
- Produtos ativos/inativos

---

## 🧾 Logs de Atividades

Ações registradas:

- Criação, edição e exclusão de produtos
- Login/logout
- Edição de perfil
- Acesso ao dashboard

📌 Apenas administradores podem visualizar os logs.

---

## 🖼️ Upload de Imagens

- Upload local: salvo em `/uploads`
- Alternativa: integração com Cloudinary

---

## 🔒 Autenticação

- Feita via JWT
- Token enviado no header `Authorization: Bearer <token>`
- Middleware de autenticação protege as rotas

---

## 🚧 Funcionalidades Futuras (opcional)

- Notificações por email
- Exportação de relatórios em PDF ou CSV
- Tema escuro/claro no frontend

---

## ✅ Status do Projeto

**[ ]** Modelagem do banco  
**[ ]** Backend com rotas e controladores  
**[ ]** Middleware de autenticação/autorização  
**[ ]** Upload e visualização de imagens  
**[ ]** Frontend com autenticação e interação  
**[ ]** Dashboard e logs  
