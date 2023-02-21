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
- Joi
- express-async-errors
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

## Rotas

### POST users

recebe um body no formato:

```js
{
  "name": "Arlindo",
  "cpf": "123.123.123-12",
  "birthday": "12-15-2003"
}
```

- **cpf** pode seguir o formato com pontuação ou apenas os números, mas sempre deve ser uma string;
- **birthday** deve seguir o formato *MM-DD-YYYY*;

- Em caso de sucesso, a requisição terá como resposta status **201**.