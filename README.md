# 365scores quiz app

- [Frontend docs](packages/frontend/README.md)
- [Backend docs](packages/backend/README.md)
- [PDF DB schema](https://github.com/Valeronlol/365-scores-quiz/blob/master/docs/db-schema.drawio.pdf)


# Requirements

- installed [Bun](https://bun.com/get)
- installed [Docker](https://docs.docker.com/engine/install/)


# Getting Started

To run this application on local machine:

```bash
# to install both monorepo dependencies fe+be
bun install

# run postgres and pgweb inside docker container
# pgweb will be available on http://127.0.0.1:8081/
bun run db:start

# run schema migrations for backend
cd packages/backend/
bunx drizzle-kit push
bun run seed content

# run local monorepo frontend and backend dev server on host machine
# frontend will be available on http://127.0.0.1:3000/
bun run dev

# if you want to prune database
bun run db:destroy
```

# Demo
![Db schema overview](docs/db-schema.png)
![Video preview](docs/video.gif)
