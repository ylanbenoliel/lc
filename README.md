# Lista de usuários

## Projeto

O projeto visa buscar todos os usuários da API com base nos filtros, que são:

- ID do usuário

- Nome do usuário

- E-mail do usuário

Além desses, há a possibilidade de ordenação dos mesmos em ordem crescente e decrescente.

## Instalação

Para testar o projeto em máquina local, é necessário entrar na pasta do projeto via terminal e digitar `npm install` para instalar as dependências. Após o terminal concluir a instalação, digitar `npm start` para iniciar o projeto no navegador.

## API

As requisições são do tipo GET

### Paramêtros

| Query | Obrigatório |                                                   Descrição                                                    | Valor Inicial |         Exemplos          |
| :---: | :---------: | :------------------------------------------------------------------------------------------------------------: | :-----------: | :-----------------------: |
|  id   |     Não     | Busca o usuário de acordo com o numero digitado. Utilizando % busca por usuários que contêm o número digitado. |               |          1% - 10          |
| nome  |     Não     |     Busca o usuário iniciando o nome digitado. Utilizando % busca por usuários que contêm o nome digitado.     |               |         an% - ana         |
| email |     Não     |                                                                                                                |               |        br% - bruna        |
| ordem |     Não     |                          Ordena de forma crescente com _asc_ e decrescente com _desc_                          |     _asc_     |        asc ou desc        |
|  por  |     Não     |                                     Ordena de acordo com a string recebida                                     |     _id_      | _id_ ou _nome_ ou _email_ |

### Exemplos

`localhost:3000/`  
Ordena os usuários pelo _id_, de forma crescente

`localhost:3000/?nome=an%&ordem=desc`  
Ordena os usuários pelo _id_, de forma decrescente e que contenha **an** no nome

`localhost:3000/?nome=o&email=do%por=nome`  
Ordena os usuários por nome, de forma crescente, que contenha **do** no email e que o nome inicie com a letra **o**
