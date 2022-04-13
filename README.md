# Coding Challenge - CLIMATEMPO API

- How to Download & Clone Project

```bash
    foo@bar: git clone git@github.com:zScrolLock/codingChallenge.git
    foo@bar: cd codingChallenge/
    foo@bar: npm install
```

- Change .env information
> There is a file in the repository called `.env.example` this file shows examples of environment variables to be used in the project.

```bash
    PORT= <MAIN PORT OF THE SERVICE>
    JWTKEY= <BEARER KEY TO DECRYPT JWT TOKEN>
    MONGO_URL_KEY= <MONGO URI FROM ATLAS>
    CLIMATEMPO= <CLIMA TEMPO API KEY>
```

> Once the content of the .env file is correct rename it `.env.example` to `.env`

- Running the project as build

```bash
    foo@bar: npm install
    foo@bar: npm start
```
- Running the project as development

```bash
    foo@bar: npm install
    foo@bar: npm run dev
```

| Verbos | URL | Body| Header | Ação |
| --- | --- | --- | --- | --- |
| POST | http://localhost:PORT/api/get-forecast | { "cep":"0100013", "data": "2022/07/09"} | Content-Type: application/json, Authorization: Bearer {token} | Busca informações da Cidade e insere ou altera o DB. |
| GET | http://localhost:PORT/api/get-token | ~ | Content-Type: application/json | Retorna um token para a Autenticação das Rotas. |



*Luís Augusto Cardoso Mota - 2022*
