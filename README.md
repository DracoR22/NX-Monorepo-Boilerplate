# NX-MONOREPO
## Features:
1. Full type-safety accross all the project
2. REST API endpoints
3. GraphQL endpoints
4. Authentication 
5. NestJs backend
6. NextJs frontend 
7. Shared packages for both frontend and backend

## Scripts:

These are some of the scripts used in this Monorepo

###### Build all projects inside the repo:
```bash
$ pnpm exec nx run-many --target=build
```

###### Build only the web project, useful for production deployment:
```bash
$ npx nx build @supply-chain/web
```

###### Build only the api project, useful for production deployment:
```bash
$ npx nx build @supply-chain/api
```