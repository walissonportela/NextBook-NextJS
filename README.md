# 📚 NextBook - Sua Livraria Online

Este projeto é uma aplicação web completa de uma livraria online (e-commerce) desenvolvida como o Front-end. Ele consome uma API RESTful para gerenciar o catálogo de livros, autenticação de usuários e o fluxo de carrinho de compras.

O NextBook foi construído com foco em uma experiência de usuário fluida, performance (graças ao Next.js) e código robusto com tipagem completa (TypeScript).

## ✨ Funcionalidades do Projeto

O NextBook oferece as seguintes funcionalidades principais:

* **Catálogo de Produtos:** A página principal (`/`) lista todos os livros disponíveis, com filtros e barra de pesquisa para facilitar a navegação.
* **Autenticação:** Telas dedicadas de **Login** e **Cadastro** de usuários (incluindo validações e máscaras de input).
* **Gestão de Produtos (Admin):** Usuários com o perfil de administrador têm acesso completo a um CRUD (Criar, Ler, Atualizar, Deletar) de livros, incluindo o upload de imagens de capa.
* **Carrinho de Compras:** Um carrinho lateral que permite aos usuários adicionar, remover e ajustar a quantidade de livros, com persistência dos dados no navegador.
* **Detalhes do Produto:** Página individual (`/product/[id]`) para visualização de informações completas de cada livro.
* **Feedback ao Usuário:** Exibição de mensagens de sucesso ou erro em tempo real para todas as operações da API (login, cadastro, CRUD, carrinho).

---

## 💻 Tecnologias Utilizadas

Este projeto é uma aplicação full-stack composta por um Front-end moderno e um Back-end robusto.

### 1. Front-end (NextBook)

| Tecnologia | Descrição |
| :--- | :--- |
| **Next.js (App Router)** | Framework React escolhido para alta performance, roteamento e funcionalidades de SSR/SSG. |
| **TypeScript** | Linguagem de programação que garante tipagem estática e maior robustez. |
| **Styled Components** | Biblioteca de CSS-in-JS para criação de componentes estilizados e modulares. |
| **React Context API** | Utilizada para gerenciar estados globais, como Autenticação, Carrinho e Filtros. |
| **Axios** | Cliente HTTP para lidar com as requisições à API. |

### 2. Back-end (Marketplace API) - Créditos

O Front-end se conecta a uma API RESTful. A base desta API foi desenvolvida pela **[UX Software](https://github.com/ux-software/marketplace-api)**.

| Tecnologia | Descrição |
| :--- | :--- |
| **NestJS** | Framework Node.js que aplica padrões de design como CQRS e Arquitetura Modular. |
| **Prisma** | ORM (Object-Relational Mapper) utilizado para gerenciar o esquema e as interações com o banco. |
| **PostgreSQL** | Banco de dados relacional. |
| **Docker** | Usado para containerização do ambiente de banco de dados. |

---

## 📂 Estrutura do Projeto

A solução é organizada em duas pastas principais: `nextbook` (Front-end) e `marketplace-api` (Back-end).

```

.
├── marketplace-api/        \# Módulo Back-end (API RESTful - NestJS)
│   ├── prisma/             \# Schema do Prisma, Migrações e Seed
│   ├── src/                \# Código-fonte da API (Controllers, Services, Modules)
│   ├── uploads/            \# Pasta para armazenamento local de imagens de produtos
│   ├── docker-compose.yml  \# Configuração para subir o container PostgreSQL
│   └── package.json  
├── nextbook/               \# Módulo Front-end (Aplicação Next.js)
│   ├── public/             \# Arquivos estáticos (imagens, favicons)
│   ├── src/                \# Código-fonte da aplicação React/Next.js
│   │   ├── app/            \# Rotas da aplicação (Login, Register, Products, Admin)
│   │   ├── components/     \# Componentes reutilizáveis (Header, Footer, CartSidebar)
│   │   ├── contexts/       \# Gerenciamento de estado (AuthContext, CartContext)
│   │   └── styles/         \# Arquivos de estilo global com Styled Components
│   └── package.json
└── README.md

````

---

## ⚙️ Instalação e Execução do Projeto

O projeto completo utiliza as seguintes portas de execução padrão:
* **Front-end (NextBook):** `http://localhost:3000`
* **Back-end (API):** `http://localhost:4000`
* **Banco de Dados (PostgreSQL - Docker):** Porta interna `5432`

### Pré-requisitos

Certifique-se de ter o seguinte instalado:

* **Node.js** (versão 18 ou superior)
* **npm**
* **Docker** e **Docker Compose**

### 🚀 Passo 1: Configuração e Início do Back-end (`marketplace-api`)

1.  **Clone o Repositório do Projeto:**

    ```bash
    git clone https://github.com/walissonportela/NextBook-NextJS.git
    cd NextBook-NextJS
    ```

2.  **Navegue para a pasta da API e instale as dependências:**

    ```bash
    cd marketplace-api
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    Crie um arquivo chamado **`.env`** na raiz da pasta `marketplace-api` com o seguinte conteúdo:

    ```env
    # Database
    DATABASE_URL="postgresql://postgres:docker@localhost:5432/marketplace_db"

    # JWT 
    JWT_SECRET="SEU_SEGREDO_SUPER_SECRETO_AQUI"
    JWT_EXPIRES_IN="7d"

    # Application
    PORT=4000
    NODE_ENV="development"
    BASE_URL="http://localhost:4000"
    ```

4.  **Inicie o banco de dados com Docker Compose:**

    ```bash
    docker-compose up -d
    ```

5.  **Execute as migrações e o seed do Prisma:**

    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```
    *Este comando cria a estrutura do banco e popula com usuários e livros iniciais.*

6.  **Inicie o Servidor da API:**

    ```bash
    npm run start:dev
    ```
    A API estará rodando em: **[http://localhost:4000/api/v1](http://localhost:4000/api/v1)**

### 💻 Passo 2: Início do Front-end (`nextbook`)

1.  **Acesse a pasta do Front-end e instale as dependências:**

    *Em um novo terminal, a partir da raiz do projeto:*
    ```bash
    cd nextbook 
    npm install
    ```

2.  **Configure a URL da API para Desenvolvimento Local:**

    Para que o Front-end se conecte à sua API que está rodando localmente, é necessário fazer um pequeno ajuste no código.

    * **Abra o arquivo** onde a sua instância do Axios é criada (por exemplo, `nextbook/src/services/api.ts`).
    * **Comente** a linha da `baseURL` de produção e **descomente** a linha da `baseURL` de desenvolvimento.

    **Altere de:**
    ```javascript
    import axios from 'axios';

    const api = axios.create({
      //baseURL: 'http://localhost:4000/api/v1', // URL para desenvolvimento local
      baseURL: process.env.NEXT_PUBLIC_API_URL,   // URL para produção (Vercel)
    });

    export default api;
    ```

    **Para:**
    ```javascript
    import axios from 'axios';

    const api = axios.create({
      baseURL: 'http://localhost:4000/api/v1', // URL para desenvolvimento local
      //baseURL: process.env.NEXT_PUBLIC_API_URL,   // URL para produção (Vercel)
    });

    export default api;
    ```

3.  **Inicie o Projeto Next.js:**

    ```bash
    npm run dev
    ```
    O Front-end estará acessível em: **[http://localhost:3000](http://localhost:3000)**

### Credenciais de Teste

Usuários criados pelo script de seed (etapa 5 do Back-end):

| Usuário | E-mail | Senha | Nível de Acesso |
| :--- | :--- | :--- | :--- |
| **Admin** | `walissonadmin@gmail.com` | `123456` | Acesso ao CRUD de Livros |
| **Padrão** | `walissonuser@gmail.com` | `123456` | Navegação e Carrinho |

---

## 🛠️ Comandos de Desenvolvimento Úteis

### Comandos do Prisma (Back-end)

Estes comandos devem ser executados dentro da pasta `marketplace-api/`.

| Comando | Descrição |
| :--- | :--- |
| `npx prisma migrate dev` | Cria novas migrações e as aplica ao banco de dados em desenvolvimento. |
| `npx prisma db seed` | Executa o script `prisma/seed.ts` para popular o banco com dados iniciais. |
| `npx prisma studio` | Inicia o painel visual do Prisma para navegar e gerenciar os dados do banco. |
| `npx prisma generate` | Gera o cliente Prisma após qualquer alteração no `schema.prisma`. |
| `npx prisma migrate reset` | **Cuidado!** Apaga e recria o banco de dados, perdendo todos os dados. |


### Comandos do Docker (Back-end)

Estes comandos devem ser executados dentro da pasta `marketplace-api/`.

| Comando | Descrição |
| :--- | :--- |
| `docker-compose up -d` | Sobe o container PostgreSQL em background. |
| `docker-compose stop` | Para a execução do container, mas o mantém no sistema. |
| `docker-compose down` | Para e remove o container, as redes e os volumes (se não forem volumes nomeados). |
| `docker ps` | Lista todos os containers Docker em execução (útil para verificar a porta). |

---

## 👋 Desenvolvimento

Este projeto foi **desenvolvido por Walisson Portela** como uma demonstração de habilidades em desenvolvimento Front-end com Next.js e TypeScript.
