# Local PostgreSQL

Path:

```txt
docs/database/local-postgresql.md
```

## Overview

Local PostgreSQL for UndangAbi V2 follows the local database pattern used by
`../umkm-pos/apps/api`: the application reads `DATABASE_URL` from `.env` and
connects to a database running on `localhost`.

## Database

```txt
undangabi
```

## Connection

```txt
DATABASE_URL="postgresql://ganjarhadiatna@localhost:5432/undangabi?schema=public"
```

## Health Check

```bash
pg_isready -h localhost -p 5432
```

Expected status:

```txt
localhost:5432 - accepting connections
```

## Verify Database

`schema=public` is required by Prisma, but the `psql` CLI does not accept that
query parameter. Use the same host, user, and database without the query string
for direct CLI checks.

```bash
psql "postgresql://ganjarhadiatna@localhost:5432/undangabi" -c "select current_database();"
```
