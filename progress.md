## TrustMeBro implementation progress (vs. TrustMeBro.md)

Legend: [DONE] implemented and typechecked; [PARTIAL] implemented but gaps remain; [TODO] not implemented yet.

### 0) High-level status

- [DONE] Project scaffold: `./` (Next.js 15 App Router, TS, Tailwind, ESLint)
- [DONE] Database schema (Prisma, Postgres/Neon) aligned to spec entities
- [DONE] Auth (NextAuth Credentials + PrismaAdapter), basic RBAC guards
- [DONE] Core REST endpoints for contracts, funding, submission, review, disputes, admin force actions
- [DONE] Stripe Connect (test): account onboarding link + PaymentIntent creation for funding + signed webhook handler
- [DONE] Minimal UI: sign-in, signup, dashboard, profile/settings, new contract, contract detail actions, admin console
- [DONE] Auto-approve job endpoint
- [DONE] Cursor rules under `.cursor/rules/docs-and-progress.mdc` to enforce spec/progress doc updates
- [DONE] Cursor rule `.cursor/rules/commit-messages.mdc` to always suggest a git commit message after changes
- [PARTIAL] Funding flow (client-side payment collection via Elements not wired; Funding state relies on webhook). Budget PI now uses manual capture; capture occurs on approve/admin release.
- [PARTIAL] State machine (`InProgress` auto on full funding; auto-approve reads `UnderReview`; expire job added; guards enforce valid transitions; mutual cancel not enforced). Payouts/fees executed on Released; webhook guarded from downgrading terminal states.
- [TODO] Uploads (S3), rate-limiting, emails, observability, tests, i18n, signatures, advanced RBAC, production hardening

---

### 1) Data model (spec §7)

Files: `/prisma/schema.prisma`, generated client: `src/generated/prisma`

- [DONE] Entities in schema:
  - `User`, `Profile`, `Contract`, `ContractEvent`, `Funding`, `Submission`, `Review`, `Dispute`, `Payout`, `Fee`, `AuditLog`
  - Enums: `Role`, `ContractState`, `FundingType`, `FundingStatus`, `ReviewDecision`, `DisputeStatus`, `DisputeResolution`, `FeeKind`, `Currency`, `Platform`
  - NextAuth tables: `Account`, `Session`, `VerificationToken`
  - Indices per spec (state/owner, funding filters, etc.)
- [PARTIAL] State fields exist, but lifecycle wasn’t fully automated (see State machine gaps below)
- [DONE] Extended `Profile` with `searchable` (Boolean, default true) and social account fields; migrations applied and Prisma client regenerated.

Gaps/TODO (coding — Cursor):

- Implement DB-level constraints to enforce mutual cancel requests (two confirmations), optional
- Add computed integrity checks (e.g., only one active dispute per contract), optional

---

### 2) Auth, RBAC, sessions (spec §3, §11)

Files: `src/lib/auth.ts`, `src/middleware.ts`, `src/app/api/auth/[...nextauth]/route.ts`

- [DONE] NextAuth Credentials provider; JWT contains `role`, PrismaAdapter; signup endpoint and page added
- [DONE] Middleware to protect `/api/*` and app sections (`/dashboard`, `/contracts`, `/admin`)
- [PARTIAL] Only Credentials; no Google/Apple OAuth yet; no 2FA

Gaps/TODO:

- [Cursor] Add Google/Apple providers; update UI for OAuth
- [Cursor] Add role-based guards per endpoint with centralized helper; 403 message shape
- [Cursor] Add optional 2FA
- [You] Configure OAuth credentials in `.env` for preview/staging/prod

---

### 3) State machine (spec §4, §5)

Current transitions implemented:

- Create → `Draft` (POST `/api/contracts`)
- `Proposed` (POST `/api/contracts/:id/propose`)
- `Accepted` (creator) (POST `/api/contracts/:id/accept`)
- Funding: PaymentIntents created per type; on webhook `payment_intent.succeeded` we mark matching `Funding.status = succeeded`; when all are succeeded, we set `Funded` and then `InProgress` automatically
- Submission: `UnderReview` (POST `/api/contracts/:id/submit`)
- Review: `approve` → `Released` (POST `/api/contracts/:id/review`), `revise` → `RevisionsRequested`
- Admin: `force-release`, `force-refund` endpoints, dispute resolve endpoint
- Auto-approve job: `POST /api/jobs/auto-approve` — approves based on last `SUBMITTED` event time for contracts in `UnderReview`
 - Expire job: `POST /api/jobs/expire` — marks contracts past deadline as `Expired`

Gaps/TODO (coding — Cursor):

- Add creator deposit penalty logic on `Expired` per spec
- Implement mutual cancel: first call creates a `pending_cancel` event, second party confirms → finalize `Cancelled` and refunds/penalties
- Prevent invalid transitions at API layer (guard current `state` for each POST)

Gaps/TODO (process — You):

- Decide exact penalty parameters and defaults (platform percentage, deposit confiscation ratio on expiration)

---

### 4) Payments & escrow (spec §10)

Files: `src/lib/stripe.ts`, `src/app/api/stripe/connect/onboard/route.ts`, `src/app/api/contracts/[id]/fund/route.ts`, `src/app/api/webhooks/psp/route.ts`

- [DONE] Stripe Connect onboarding (Standard) account link; saves `Profile.pspAccountId`
- [DONE] Create PaymentIntent per funding type; returns `client_secret` to client; logs `FUNDING_INIT.*`
- [DONE] Webhook signature validation; `payment_intent.succeeded` → `Funding.status = succeeded` + `AuditLog`
- [PARTIAL] No client payment collection UI using Elements; PaymentIntents are created but not confirmed with payment method
- [DONE] Capture strategy: Budget uses `capture_method=manual`; capture executed on approve/admin release; deposits remain automatic. Webhook is idempotent and guarded for terminal states.
- [DONE] On `Released`, compute platform fee, create `Fee` and `Payout`; attempt Stripe Transfer when using Connect Express; webhook updates payout status on `transfer.paid/failed`.
- [NOTE/RISK] Stripe Connect Standard accounts do not support platform-initiated Transfers the same way as Express/Custom. For escrow-like flows and platform-controlled payouts, Express is recommended. If staying on Standard, redesign payout flow (brand pays creator directly or via hosted payment pages).

Gaps/TODO (coding — Cursor):

- Add `POST /api/contracts/:id/payout` internal flow on `Released`:
  - Compute platform fee (env `PLATFORM_FEE_PERCENT`)
  - Create `Fee` row
  - Create `Transfer` (or alternative for Standard) to connected account; set `Payout`
  - Webhook `transfer.paid/failed` updates `Payout.status`
- For budget PaymentIntent: switch to `capture_method: manual` and call `stripe.paymentIntents.capture(pi)` on approve; add fallback re-confirm flow if >7 days
- Confirm PI from client via Stripe Elements (card + wallet) for each fund type; persist PI client_secret on Funding (optional)
- Add refund operations for cancel/expiration per rules (partial refunds of deposits; full budget refund)

Gaps/TODO (process — You):

- Decide Standard vs Express for Connect and confirm legal constraints; provide updated keys
- Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` for each env
- Create Stripe webhook endpoint in Dashboard to point to `/api/webhooks/psp`

---

### 5) API surface vs. spec (spec §9)

Implemented endpoints:

- Auth: NextAuth routes (Credentials)
- Contracts:
  - [DONE] `POST /contracts`
  - [DONE] `GET /contracts?role=brand|creator`
  - [DONE] `GET /contracts/:id`
  - [DONE] `POST /contracts/:id/propose`
  - [DONE] `POST /contracts/:id/accept`
  - [DONE] `POST /contracts/:id/fund` (PI create; returns client_secret)
  - [DONE] `POST /contracts/:id/start` (server-triggered when funding complete → `InProgress`)
  - [DONE] `POST /contracts/:id/submit`
  - [DONE] `POST /contracts/:id/review`
  - [PARTIAL] `POST /contracts/:id/cancel` & `.../cancel/confirm` (no mutual workflow/penalties)
  - [DONE] `POST /contracts/:id/dispute`
- Admin:
  - [DONE] `GET /admin/disputes?status=open`
  - [DONE] `POST /admin/disputes/:id/resolve`
  - [DONE] `POST /admin/contracts/:id/force-release`
  - [DONE] `POST /admin/contracts/:id/force-refund`
- Webhooks:
  - [DONE] `POST /webhooks/psp` (Stripe)
- Jobs:
  - [DONE] `POST /jobs/auto-approve` (reads `UnderReview` and last `SUBMITTED`)
  - [DONE] `POST /jobs/expire`

Gaps/TODO (coding — Cursor):

// Implemented: start endpoint exists and auto-start also occurs on webhook
- Mutual cancel handshake endpoints and stateful tracking
- Idempotency keys for all state-changing endpoints + webhook replay safety

---

### 6) UI/UX (spec §6)

Implemented pages:

- [DONE] `signin` (Credentials), `signup`
- [DONE] `profile` with editable profile and settings forms
- [DONE] `profile` page now shows email, adds "discoverable" toggle (default true), and a dedicated Social accounts section (TikTok, Instagram, YouTube, Twitter/X, LinkedIn, Twitch) with save; includes a "Verify profile" button (placeholder alert). EN/FR i18n updated.
- [DONE] `dashboard` with contract cards and state pills (`data-testid="state-..."`)
- [DONE] `contracts/new` wizard (single page MVP) with all required inputs; requires manual `creatorId`
- [DONE] `contracts/[id]` with actions: fund buttons, submit, approve
- [DONE] `admin` console to list disputes and resolve

Gaps/TODO (coding — Cursor):

- Funding UI: Stripe Elements to collect payment method and confirm PaymentIntents; show status
- Contract wizard polish: creator selection UI, hashtags tokens, validation errors
- Submission UI: file upload to S3 (signed URLs), multi-screenshot display, platform selector
- Review UI: request revisions with comment flow and loop back to resubmission
- Auto-refresh state (TanStack Query), optimistic updates, loading/error states
- Role-based navigation and a richer dashboard (grouping counts, filters)
- i18n FR/EN via dictionaries; accessible components

Gaps/TODO (process — You):

- Provide S3 credentials/bucket or choose alternative storage for screenshots
- Define initial set of creators for testing (or seed tool)

---

### 7) Files/storage (spec §8, §11)

- [TODO] S3 private bucket + signed URL upload flow; store screenshots metadata (s3Key, width/height, etc.)
- [TODO] CloudFront; CORS, cache policies

Gaps/TODO (coding — Cursor):

- Add `POST /api/uploads/s3/sign` endpoint
- Client uploader component (multipart; progress)

Gaps/TODO (process — You):

- Provide AWS creds, region, bucket names per env; set env vars

---

### 8) Notifications & emails (spec §13)

- [TODO] Transactional emails: proposal, funding requests, submission received, auto-approve reminder, cancel pending, dispute updates

Gaps/TODO (coding — Cursor):

- Integrate Resend/Postmark; templates; enqueuing emails on events

Gaps/TODO (process — You):

- Provide email provider API keys; sender domain setup

---

### 9) Observability & security (spec §11, §14)

Files: `/next.config.ts` (security headers)

- [DONE] Basic security headers (CSP, HSTS, XFO, etc.)
- [TODO] Sentry setup (front + API)
- [TODO] OpenTelemetry traces; log correlation (`contract_id`, `user_id`, `event_id`)
- [TODO] Rate limiting (IP+user), bot protection on auth/contract creation
- [TODO] GDPR/LPD: right-to-erasure, data retention

Gaps/TODO (coding — Cursor):

- Middleware rate limit; Turnstile/hCaptcha integration
- OTEL instrumentation

Gaps/TODO (process — You):

- Set Sentry DSN/OTEL collector endpoints; define alerts

---

### 10) Signatures & contract PDF hashing (spec §11, §18, §19.3)

- [TODO] Generate contract PDF; hash (SHA-256); store in `AuditLog`
- [TODO] Optionally integrate Skribble/DocuSign for AdES

Gaps/TODO (coding — Cursor):

- PDF template renderer; `POST /api/contracts/:id/hash-proof` per snippet in spec; store hash+timestamp

Gaps/TODO (process — You):

- Decide e-sign provider and legal baseline for CH/EU

---

### 11) Tests (spec §16) & E2E

- [TODO] Unit tests for financial calculations and state transitions
- [TODO] E2E Playwright suite (happy path, mutual cancel, expiration, disputes, webhooks)
- [DONE] Default test users seeded at deploy; see `TEST_USERS.md`

Gaps/TODO (coding — Cursor):

- Add Playwright setup to repo; wire test endpoints already present (`/api/test/*`)

Gaps/TODO (process — You):

- Provide CI runners (GitHub Actions) and secrets; enable `stripe listen` in CI preview or mock webhooks

---

### 12) Admin console (spec §6, §15)

- [DONE] Minimal disputes list + resolve actions
- [PARTIAL] No search, no contract lookup, no PSP logs view, no force payout/refund UI

Gaps/TODO (coding — Cursor):

- Add search, contract drill-in, PSP events viewer, force actions

---

### 13) Remaining work — step-by-step

#### A) Critical payments & state

1. [DONE] Switch budget PaymentIntent to `capture_method=manual`; on approve, call `paymentIntents.capture`
2. [DONE] Implement payouts on `Released`: compute fee, create `Fee`, create `Transfer` (if Express) or alternative for Standard; update `Payout`
3. [Cursor] Refund flows for cancel/expiration; partial deposit refunds/forfeits per policy
4. [Cursor] Fix auto-approve job to read `UnderReview` and last `SUBMITTED` event; cron wiring
5. [Cursor] Add `InProgress` state when all fundings `succeeded`
6. [Cursor] Implement `Expired` job (deadline check)
7. [You] Choose Connect account type (Express vs Standard) and confirm legal; set keys per env

#### B) Funding UX

1. [Cursor] Add Stripe Elements for funding (brand budget/deposits, creator deposit) — use returned PI `client_secret`
2. [Cursor] Display funding status (pending/succeeded) per type; disable duplicate funding
3. [You] Test card flows with Stripe test numbers; verify webhook delivery

#### C) Mutual cancel + disputes

1. [Cursor] Add `cancel_request` record and 2-phase confirm endpoint; email notifications to counterpart
2. [Cursor] UI modals for cancel request/confirm; display penalties preview
3. [You] Decide penalties and defaults; verify happy/edge paths

#### D) Uploads & submissions

1. [Cursor] S3 signed URL endpoint; client uploader; store screenshots metadata
2. [Cursor] Submission page to attach multiple screenshots and notes
3. [You] Provide AWS creds/bucket; set envs per env

#### E) Notifications

1. [Cursor] Integrate email provider; send on key events (proposal, funding request, submit, reminder T+24h, auto-approve T+48h, cancel pending, dispute updates)
2. [You] Provide provider API keys; verify email templates/branding

#### F) Observability & security

1. [Cursor] Add rate limiting middleware and bot protection
2. [Cursor] Add Sentry and OTEL tracing
3. [You] Configure DSN/OTEL endpoints; set alert thresholds

#### G) Auth & UX

1. [Cursor] Add Google/Apple providers; optional 2FA
2. [Cursor] Role-based nav and richer dashboard (sections and counts)
3. [Cursor] i18n FR/EN
4. [You] Provide OAuth keys; content for FR/EN

#### H) Signatures & PDFs

1. [Cursor] Implement PDF generation + hash storage endpoint
2. [You] Choose legal baseline (simple vs AdES) and provider if needed

#### I) Tests & CI/CD

1. [Cursor] Add Playwright project to repo (happy path + flows)
2. [Cursor] Unit tests for state/finance; webhook idempotency integration tests
3. [You] Hook GitHub Actions; set env vars/secrets; enable Neon branch DB for previews (optional)

---

### 14) Environment & configuration checklist (You)

- Set `.env` per env: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PLATFORM_FEE_PERCENT`, AWS S3 (`AWS_REGION`, `S3_BUCKET`, `S3_SIGNED_URL_TTL`), Sentry/OTEL if used
- Stripe Dashboard: configure webhook to `/api/webhooks/psp`
- (If Express) Enable Connect Express and terms; branding
- S3 bucket & IAM (private, least privilege); CORS policy
- Email provider keys & verified sender

---

### 15) Known issues/bugs

- Funding UI does not collect payment method; PaymentIntents never confirm → webhook never fires → funding remains `pending`
- Cancel endpoints immediately set `Cancelled` (no mutual flow)
- No payouts/fees on `Released`; funds will accumulate in platform without transfer logic

Fixes (recent):

- [DONE] Dashboard used public state for logged-in users due to wrong auth import in `src/lib/user.ts` (`@/lib/auth` vs `@/auth`). Fixed and added proper unauthorized vs empty-state UI.
- [DONE] Mobile navbar overflow: tightened spacing, hid non-essential links on small screens, enabled horizontal scroll-safe container to avoid wrapping; updated `src/app/layout.tsx` and minor CSS.
- [DONE] Language/region controls available on mobile via compact subheader over the footer.
- [DONE] Dashboard fetch now aggregates brand and creator contracts (admins effectively see both); keeps clear unauthorized handling.
 - [DONE] Fixed auth loop on Dashboard/Profile: unified NextAuth to `src/lib/auth.ts` with secret; re-exported via `src/auth.ts`. Middleware now guards `/dashboard` and `/profile`, and all protected API routes log unauthorized/user-not-found for production diagnostics. Profile fetch uses `credentials: 'include'`.

---

### 16) What is already implemented (by area)

- Backend
  - Auth, RBAC middleware, Prisma models, Neon migrations, REST endpoints listed above, Stripe webhook
- Frontend
  - Signin page, dashboard, create contract form, contract detail actions, admin disputes page
- Infrastructure
  - Security headers; environment scaffolding; Neon DB configured

---

### 17) Ownership split

- You (environment/ops/review)
  - Provide/rotate secrets and env vars (DB, Stripe, S3, Email, Sentry)
  - Decide Stripe Connect mode (Standard vs Express), penalties, platform fee percent, legal terms
  - Configure Stripe webhook endpoints; test with `stripe listen`
  - Create buckets/IAM and set S3 configs
  - Review flows and provide UX copy and i18n content; approve email templates
  - Enable CI (GitHub Actions) and set secrets; optionally Neon branch DB for previews

- Cursor (coding)
  - Fix auto-approve job and state transitions; add `InProgress`/`Expired`
  - Implement Stripe client-side funding (Elements) + PI confirm; capture-on-approve for budget
  - Implement payouts + fees on `Released`; add refunds for cancel/expiration
  - Mutual cancel handshake (backend + UI) and penalties
  - Uploads to S3 (signed URLs), submission UX
  - Emails integration; rate limiting; bot protection; observability (Sentry/OTEL)
  - OAuth providers; 2FA (optional); i18n; dashboard polish
  - Tests (unit/integration/E2E) and CI wiring

---

### 18) Quick runbook to validate current state

1) Set `.env` with Neon and Stripe test keys; run `npm run dev`
2) POST `/api/test/seed-users`; sign in as `brand@example.com` → `/dashboard`
3) Create a contract with a real creatorId from the seeded user; open contract detail
4) Click fund buttons — note: client payment collection not implemented yet, so Funding will remain pending until Elements flow is added
5) Submit as creator; approve as brand; check state transitions and admin console
