# ✅ TrustMeBro – Test Checklist (MVP)

## 1. Authentication & Roles

* [ ] Brand can sign in (`brand@example.com`) and land on **Dashboard**.
* [ ] Creator can sign in (`creator@example.com`) and land on **Dashboard**.
* [ ] Admin can sign in (`admin@example.com`) and land on **Admin console**.
* [ ] Wrong password → shows error.
* [ ] Logged-in user can sign out successfully.

---

## 2. Contract Lifecycle — Happy Path

1. **Create Contract (Brand)**

   * [ ] Brand creates a new contract with title, brief, budget, deposits, deadline.
   * [ ] Contract appears in `Draft`.

2. **Propose & Accept**

   * [ ] Brand clicks “Propose” → state becomes `Proposed`.
   * [ ] Creator sees contract in dashboard → clicks “Accept” → state `Accepted`.

3. **Fund Escrow**

   * [ ] Brand funds budget + deposit (simulated in seed).
   * [ ] Creator funds deposit.
   * [ ] State becomes `Funded` then `InProgress`.

4. **Submit Work**

   * [ ] Creator submits a link + screenshot.
   * [ ] State → `UnderReview`.

5. **Approve**

   * [ ] Brand clicks “Approve” → contract state becomes `Released`.
   * [ ] Payout + Fee records created.

---

## 3. Contract — Auto Approve

* [ ] Creator submits work.
* [ ] Brand does nothing.
* [ ] After 48h job → contract auto-approves.
* [ ] Payout triggered automatically.

---

## 4. Contract — Revisions Flow

* [ ] Creator submits work.
* [ ] Brand requests revisions with comment.
* [ ] State → `RevisionsRequested`.
* [ ] Creator re-submits → state back to `UnderReview`.
* [ ] Brand approves → `Released`.

---

## 5. Contract — Cancellation

* [ ] Brand clicks “Cancel request”.
* [ ] Creator confirms → contract state becomes `Cancelled`.
* [ ] Refunds applied (budget back to brand, deposits refunded/penalized per rules).

---

## 6. Contract — Expiration

* [ ] Contract deadline passes with no submission.
* [ ] State → `Expired`.
* [ ] Brand budget refunded, creator deposit forfeited.

---

## 7. Dispute Resolution

* [ ] Creator submits work.
* [ ] Brand disputes (opens dispute).
* [ ] Admin sees dispute in `/admin`.
* [ ] Admin resolves:

  * [ ] **Released** → payout to creator.
  * [ ] **Refunded** → refund to brand.
  * [ ] **Split** → split payout.
* [ ] State → `AdminResolved`.

---

## 8. Admin Actions

* [ ] Admin sees all disputes listed.
* [ ] Admin can search/select contract.
* [ ] Admin can force release/refund.
* [ ] Admin actions appear in **AuditLog**.

---

## 9. Notifications (for later E2E extension)

* [ ] Email sent on proposal received.
* [ ] Email sent when submission uploaded.
* [ ] Reminder email at T+24h (pending review).
* [ ] Auto-approve email at T+48h.
* [ ] Cancel request email to counterpart.
* [ ] Dispute opened/resolved emails.

---

## 10. Edge Cases

* [ ] Creator tries to submit before funding complete → blocked.
* [ ] Brand tries to approve before submission → blocked.
* [ ] Duplicate cancel requests → ignored.
* [ ] Webhook replay (same `payment_intent.succeeded`) → idempotent.
* [ ] Large hashtags list (>10) → validation error.

