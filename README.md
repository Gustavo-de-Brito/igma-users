# IGMA Clients

## Sobre o Projeto

Uma API REST para cadastro de clientes.

## Tecnologias utilizadas

- TypeScript
- Express
- Cors
- Dotenv
- Nodemon
- pg(postgres)
- PostgreSQL

## Como rodar o projeto

#### Pré-requisitos: npm, PostgreSQL

- O arquivo **dump.sql** pode ser usado para configurar o banco de dados
- Crie um arquivo .env dando os respectivos valores as variáveis no .env.example

```bash
# Instale as dependências necessárias
npm i
```

```bash
# Rode o projeto simulando o ambiente de produção
npm run start

# Ou rode o projeto simulando o ambiente de desenvolvimento
npm run dev
```