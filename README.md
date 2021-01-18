# API
Esta API, tem como objetivo fornecer os dados, validações e integrações para o Severino (TIC), WEB e Mobille. Os exemplos foram feitos utilizando o Axios e programação assincrona.

## Como rodar
- git clone https://github.com/Eduardo681/api_tic.git
- acessar pasta do projeto
- npm install
- criar banco de dados 'severino' no postgress
- criar .env na raiz do projeto com o conteudo: <br>
    module.exports = {<br>
        authSecret: 'qualquercoisa',<br>
        password: 'senha do banco de dados'<br>
    }
- iniciar node index.js

## EndPoints
Documentação de rotas em documentation/index.html 


