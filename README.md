# SMART MEI Desafio

API graphql para o dasafio da smart mei.

## Como executar o projeto

### Clone o projeto

`git clone https://github.com/luisfscoelho/Smartmei-desafio.git && cd gobarber`

### Instale as dependências

`yarn`

### Inicie uma instancia do banco de dados

```bash
docker run --name postgres \
            -e POSTGRES_PASSWORD=docker \
            -p 5432:5432 \
            -d postgres
```

### Execute as migrations

`yarn typeorm migration:run`

### Execute a API

`yarn dev`

## To Do

- [ ] Passar em todos os testes
- [ ] Corrigir retono da query user
