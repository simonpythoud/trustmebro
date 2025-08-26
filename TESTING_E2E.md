# ✅ TrustMeBro – Test Checklist (MVP)

## Legend

Statuses indicate whether the automated E2E test exists in the repo:

- [E2E: DONE] present and automated
- [E2E: PARTIAL] covered indirectly or missing assertions
- [E2E: TODO] not automated yet
- [E2E: N/A] feature not implemented yet (cannot automate)

Note: No E2E framework (Playwright/Cypress) is present in this repo yet. All items below are [E2E: TODO] unless noted otherwise. Unit tests exist for state/finance helpers.

## Setup / Prereqs for E2E

- Enable test endpoints by setting `FEATURE_TEST_ENDPOINTS=true` in env for local/CI.
- Seed users and demo data as needed:
  - `POST /api/test/seed-users` (creates baseline accounts)
  - `npm run prisma:deploy` (resets DB and runs seed with demo contracts)
- Useful test helper endpoints (require `FEATURE_TEST_ENDPOINTS=true`):
  - `POST /api/jobs/auto-approve` — runs auto-approve pass
  - `POST /api/jobs/expire` — runs expiration pass
  - `POST /api/test/reset` — clears core tables
- Payments: UI only creates PaymentIntents; confirmation/webhook is required to mark funding as succeeded. For E2E, either use seeded contracts already in `Funded`/`InProgress`, or simulate the Stripe webhook (`POST /api/webhooks/psp`) with a valid signature, or stub a helper in tests.

## 1. Authentication & Roles

* [ ] Brand can sign in (`brand@example.com`) and land on **Dashboard**. — [E2E: TODO]
* [ ] Creator can sign in (`creator@example.com`) and land on **Dashboard**. — [E2E: TODO]
* [ ] Admin can sign in (`admin@example.com`) and access `/admin` (non-admins redirected). — [E2E: TODO]
* [ ] Wrong password → shows error. — [E2E: TODO]
* [ ] Logged-in user can sign out successfully. — [E2E: TODO]

---

## 2. Contract Lifecycle — Happy Path

1. **Create Contract (Brand)**

   * [ ] Brand creates a new contract with title, brief, budget, deposits, deadline. — [E2E: TODO]
   * [ ] Contract appears in `Draft`. — [E2E: TODO]

2. **Propose & Accept**

   * [ ] Brand clicks “Propose” → state becomes `Proposed`. — [E2E: TODO]
   * [ ] Creator sees contract in dashboard → clicks “Accept” → state `Accepted`. — [E2E: TODO]

3. **Fund Escrow**

   * [ ] Brand initiates budget + brand deposit funding (PI created; remains `pending` without webhook). — [E2E: TODO]
   * [ ] Creator initiates deposit funding. — [E2E: TODO]
   * [ ] When all fundings are marked `succeeded` (via Stripe webhook or seed), state becomes `Funded` then auto `InProgress`. — [E2E: TODO]

4. **Submit Work**

   * [ ] Creator submits a link + screenshot. — [E2E: TODO]
   * [ ] State → `UnderReview`. — [E2E: TODO]

5. **Approve**

   * [ ] Brand clicks “Approve” → contract state becomes `Released`. — [E2E: TODO]
   * [ ] Payout + Fee records created. (Not implemented yet in runtime) — [E2E: N/A]

---

## 3. Contract — Auto Approve

* [ ] Creator submits work. — [E2E: TODO]
* [ ] Brand does nothing. — [E2E: TODO]
* [ ] After 48h job → contract auto-approves (trigger with `POST /api/jobs/auto-approve`). — [E2E: TODO]
* [ ] Payout triggered automatically. (Not implemented) — [E2E: N/A]

---

## 4. Contract — Revisions Flow

* [ ] Creator submits work. — [E2E: TODO]
* [ ] Brand requests revisions with comment. — [E2E: TODO]
* [ ] State → `RevisionsRequested`. — [E2E: TODO]
* [ ] Creator re-submits → state back to `UnderReview`. — [E2E: TODO]
* [ ] Brand approves → `Released`. — [E2E: TODO]

---

## 5. Contract — Cancellation

* [ ] Either party clicks “Cancel” → contract state becomes `Cancelled` immediately (no mutual confirmation yet). — [E2E: TODO]
* [ ] Refunds/penalties flow (budget refund, deposit rules). (Not implemented) — [E2E: N/A]

---

## 6. Contract — Expiration

* [ ] Contract deadline passes with no submission. — [E2E: TODO]
* [ ] State → `Expired` (trigger with `POST /api/jobs/expire`). — [E2E: TODO]
* [ ] Refund logic (budget refund, deposit forfeiture). (Not implemented) — [E2E: N/A]

---

## 7. Dispute Resolution

* [ ] Creator submits work. — [E2E: TODO]
* [ ] Brand disputes (opens dispute). — [E2E: TODO]
* [ ] Admin lists disputes via API `/api/admin/disputes?status=open`. (UI list not implemented) — [E2E: TODO]
* [ ] Admin resolves via `/api/admin/disputes/:id/resolve` with `released|refunded|split`. — [E2E: TODO]
  * [ ] Resolution stored on dispute; contract state unchanged by resolve. Use force endpoints to change state. — [E2E: TODO]
* [ ] Optional: Admin forces release/refund via `/api/admin/contracts/:id/force-*`. — [E2E: TODO]

---

## 8. Admin Actions

* [ ] Admin can list disputes via API (`/api/admin/disputes`). (UI list/search not implemented) — [E2E: TODO]
* [ ] Admin can search/select contract. (Not implemented) — [E2E: N/A]
* [ ] Admin can force release/refund. — [E2E: TODO]
* [ ] Admin actions appear in **AuditLog**. — [E2E: TODO]

---

## 9. Notifications (for later E2E extension)

* [ ] Email sent on proposal received. — [E2E: N/A]
* [ ] Email sent when submission uploaded. — [E2E: N/A]
* [ ] Reminder email at T+24h (pending review). — [E2E: N/A]
* [ ] Auto-approve email at T+48h. — [E2E: N/A]
* [ ] Cancel request email to counterpart. — [E2E: N/A]
* [ ] Dispute opened/resolved emails. — [E2E: N/A]

---

## 10. Edge Cases

* [ ] Creator tries to submit before funding complete → blocked. — [E2E: TODO]
* [ ] Brand tries to approve before submission → blocked. — [E2E: TODO]
* [ ] Duplicate cancel requests → ignored. — [E2E: TODO]
* [ ] Webhook replay (same `payment_intent.succeeded`) → funding remains `succeeded` (audit log may duplicate). — [E2E: TODO]
* [ ] Large hashtags list (>10) → validation error. — [E2E: TODO]

---

## 11. Selectors & Routes for E2E

- Sign-in page selectors:
  - `data-testid="auth-email"`, `data-testid="auth-password"`, `data-testid="auth-submit"`
- New contract page selectors:
  - `data-testid="creator-id"`, `contract-title`, `contract-brief`, `contract-platform`, `contract-hashtags`, `contract-budget`, `contract-creator-deposit`, `contract-brand-deposit`, `contract-deadline`, `contract-submit`
- Contract detail page:
  - State pill: `data-testid="state-<State>"` (e.g., `state-Draft`, `state-UnderReview`)
  - Funding buttons: `fund-brand-budget`, `fund-brand-deposit`, `fund-creator-deposit`
  - Submission button: `submission-send`
  - Approve button: `review-approve`

APIs you may call from E2E fixtures:

- `POST /api/test/seed-users`, `POST /api/test/reset` (test-only)
- `POST /api/jobs/auto-approve`, `POST /api/jobs/expire` (test-only)
- `POST /api/contracts`, `GET/POST /api/contracts/:id/*` (core flows)
- `POST /api/admin/contracts/:id/force-release|force-refund`
- `POST /api/admin/disputes/:id/resolve`

