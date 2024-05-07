# Super Hero App

## Contexto 

O super hero app é uma web API de gerenciamento de super herois. Ao se autenticar na aplicação é possivel realizar o gerenciamento de herois novos e já cadastrados no banco de dados. 


## Tecnologias e bibliotecas

 - Nestjs
 - TypeScript
 - Postgres
 - TypeOrm
 - Passport-JWT
 - BCrypt
 - Class validator

## TODO (Melhorias)

- [ ] Implementar arquitetura limpa, com o objetivo de desacoplar a camada de persistencia deixando a aplicação agnostica de um ORM;
- [ ] Adicionar testes automatizados;
- [ ] Implementar estrategia de logging;

## Como iniciar o projeto
### Instalação

```bash
$ npm install
```

## Rode a aplicação localmente

Antes de qualquer coisa, se certifique que você tem um banco de dados postegres e modifique o arquivo .env na raiz do projeto apontando para seu banco local.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

**Após rodar a aplicação, acesse o http://localhost:3000/api**

### Sugestão
instale a biblioteca abaixo:
```bash
$ npm install -g ntl
```

e use o comando no terminal:

```
$ ntl
```

## Utilizando o docker

No diretorio root da aplicação rode os seguintes comandos:

```bash
$ docker compose build

$ docker compose up -d
```

agora você terá sua aplicação rodando em um container docker com banco de dados e pronto para uso.

**obg: se certifique que não existe nenhuma instancia do postgres rodando em sua maquina, caso tenha, ajuste a porta do container docker ou desligue sua instancia de banco de dados postgres**

## License

Nest is [MIT licensed](LICENSE).