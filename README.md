## TrustMeBro — Dev README

### Quick start

```bash
# 1) Install
npm ci

# 2) Generate Prisma client
npm run prisma:generate

# 3) Run dev server
npm run dev
```

Visit http://localhost:3000.

### Seed generous test data

```bash
# Apply migrations and seed a full test environment
npm run prisma:deploy

# Or just run the seed (will reset tables first)
npm run deploy:seed
```

The seed creates:
- Users: 3 brands, 3 creators, 1 admin (see TEST_USERS.md; password: `Passw0rd!`)
- Profiles with placeholder PSP ids
- Contracts spanning all states (Draft → AdminResolved/Closed), with realistic Fundings, Submissions, Reviews, Disputes, Fees, Payouts, and ContractEvents

### Scripts

- `dev`: Next dev
- `build` / `start`: Next build/start
- `typecheck`: TypeScript no-emit
- `test`: Vitest unit tests
- `prisma:generate`: Generate Prisma client
- `prisma:migrate`: Dev migration
- `prisma:deploy`: Deploy migrations then seed
- `deploy:seed`: Run TypeScript seed via tsx

### Useful docs

- progress.md — project status and tasks
- TEST_USERS.md — default users for testing (emails/passwords)
- TrustMeBro.md — product spec (security, RBAC, state machine, payments)
