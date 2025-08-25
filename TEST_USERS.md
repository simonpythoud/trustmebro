# Default Test Users

All seeded users share the same password for convenience in local/dev/staging:

- Email: `brand@example.com` — Role: brand — Password: `Passw0rd!`
- Email: `creator@example.com` — Role: creator — Password: `Passw0rd!`
- Email: `admin@example.com` — Role: admin — Password: `Passw0rd!`
- Email: `brand2@example.com` — Role: brand — Password: `Passw0rd!`
- Email: `creator2@example.com` — Role: creator — Password: `Passw0rd!`

Notes:
- Credentials auth only (MVP). If you enable OAuth, accounts won’t be linked automatically.
- In production, you should disable this seeding or change credentials.
- To re-seed locally, run:
  - `npm run prisma:deploy` (runs migrations and seeds), or
  - `npm run deploy:seed`
