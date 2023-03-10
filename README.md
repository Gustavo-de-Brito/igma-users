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
- Jest
- Ts-jest
- Supertest
- @faker-js/faker
- Dotenv-cli
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

- Para rodar os testes é necessário um arquivo chamado **.env.test** com as configurações do .env.example com exceção da variável PORT

```bash
# Rode os testes unitários
npm run test:unit

# Rode os testes de integração
npm run test:integration
```

## Rotas

### POST /users

Recebe um body no formato:

```
{
  "name": "Arlindo",
  "cpf": "123.123.123-12",
  "birthday": "12-15-2003"
}
```

- **cpf** pode seguir o formato com pontuação ou apenas os números, mas sempre deve ser uma string;
- **birthday** deve seguir o formato *MM-DD-YYYY*;

- Em caso de sucesso, a requisição terá como resposta status **201**.

### GET /users/:cpf

Recebe um cpf no params, somento os números ou com pontuação.

Caso o usuário seja encontrado é retornado um objeto no seguinte formato: 

```
{
  "id": 1,
  "name": "Arlindo",
  "cpf": "123.123.123-12",
  "birthday": "15-12-2003"
}
```

- **birthday** é retornado no formato *DD-MM-YYYY*
- o **cpf** passado no params precisa ser um CPF válido

### GET /users?offset=*offset*&limit=*limit*

Recebe duas queries obrigatoriamente: offset(ponto de partida dos dados, por exemplo, a partir do item 10 do banco de dados) e um limit (quantidade máxima a ser recebida de dados, por exemplo, no máximo 8 clientes).

Caso hajam usuários e a quantidade supra o requisitado nas queries, a requisição será respondida com um array no seguinte formato: 

```
[
  {
    "id": 1,
    "name": "Arlindo",
    "cpf": "123.123.123-12",
    "birthday": "15-12-2003"
  },
  {
    "id": 2,
    "name": "Ariele",
    "cpf": "321.321.321-32",
    "birthday": "3-4-1998"
  },
  {
    "id": 3,
    "name": "Gaubiela",
    "cpf": "999.999.999-99",
    "birthday": "27-11-1903"
  },
]
```

- **birthday** é retornado no formato *DD-MM-YYYY*
- **offset** e **limit** devem ser números inteiros