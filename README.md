# tech4parking-front

Web app do **VagasAService** (Tech4Parking): busca, reserva e cadastro de vagas de estacionamento.
Next.js 14 + TypeScript + Tailwind, com Mapbox (mapa e rotas), Stripe (pagamento), NextAuth (login Google) e Apollo (GraphQL).

## Páginas

| Rota | O que faz |
|------|-----------|
| `/` | início |
| `/search` | buscar vagas no mapa |
| `/list-spots` | listar vagas |
| `/register-spot` | cadastrar vaga |
| `/login`, `/register` | autenticação |
| `/api/health` | health check |

## Configuração

Copie `apps/web/.env.example` e preencha as chaves:

- `.env.local` dentro de `apps/web` para rodar com `npm run dev`
- `.env` na raiz para rodar com `docker compose`

Sem as chaves as telas abrem, mas mapa, login, pagamento, upload e dados das vagas não funcionam.

## Rodar

**Docker (produção):**

```bash
docker compose up -d --build
# http://localhost:3000
```

**Local (desenvolvimento):**

```bash
cd apps/web
npm install
npm run dev
```

## Repositórios relacionados

- [tech4parking-back](https://github.com/tech4parking-org/tech4parking-back): Lambdas
- [tech4parking-infra](https://github.com/tech4parking-org/tech4parking-infra): infraestrutura AWS (Terraform)
