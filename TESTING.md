# TrustMeBro — Testing Guide (Local/Preview)

## Seeded users

All test users share the same password: `Passw0rd!`

- brand@example.com — brand
- brand2@example.com — brand
- brand3@example.com — brand
- creator@example.com — creator
- creator2@example.com — creator
- creator3@example.com — creator
- admin@example.com — admin

See also: `TEST_USERS.md` (short version).

## Seeding data

Run a full reset + generous seed:

```bash
npm run prisma:deploy
# or only the seed (will reset tables then re-create demo data)
npm run deploy:seed
```

What gets created:
- Users + profiles (placeholder PSP ids)
- Contracts in many states: Draft, Proposed, Accepted, Funded, InProgress, UnderReview, RevisionsRequested, Released (with Fee & Payout), Cancelled, Expired, Disputed, AdminResolved
- Related data: Fundings (succeeded), Submissions, Reviews, Disputes, Fees, Payouts, ContractEvents, AuditLog("SEED_COMPLETED")
- Deadlines across past/future so dashboard shows a nice mix

## Useful routes for manual QA

- Sign in: `/signin` (use accounts above)
- Dashboard: `/dashboard`
- Contract detail (pick one from dashboard)
- Admin console: `/admin`
- Status/Policy pages: `/security`, `/privacy`, `/status`, `/contact`

## Unit tests

```bash
npm test
```

Covers state machine and finance helpers (Vitest). Extend with E2E as needed.

## Notes

- Stripe keys/webhooks are not required for this seed (fundings are simulated).
- For a clean slate, re-run the seed at any time.
