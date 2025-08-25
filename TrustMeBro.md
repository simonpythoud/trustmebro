# TrustMeBro - Secure agreement between influencers and brands

Voici **TrustMeBro**. Un concept intéressant qui répond à un vrai problème : la confiance et l'exécution des contrats entre marques et créateurs de contenu. Je vais structurer ma réponse en plusieurs parties pour que tu aies une **vision complète** du projet :

---

## **1\. Développement du concept**

### **Problème identifié**

* Les marques envoient des produits ou paient des créateurs, mais les vidéos/pubs promises ne sont pas toujours réalisées.

* Les créateurs de contenu, de leur côté, craignent que les marques ne paient pas ou retardent les paiements.

### **Solution proposée**

* Une plateforme centralisée où chaque partie **dépose une garantie** (escrow digital).

* Les contrats sont **signés numériquement** avec valeur légale.

* Le paiement est **débloqué automatiquement** lorsque la preuve de livraison de la vidéo est vérifiée (via validation manuelle, IA ou smart contract).

* Possibilité d'annulation mutuelle en cas d'accord des deux parties.

* Transparence en temps réel sur l'état du contrat.

### **Points différenciateurs**

* Double dépôt de garantie (créateur \+ marque).

* Contrat digital automatisé.

* Vérification intelligente de la vidéo (ex : reconnaissance du produit, date de publication, lien public).

* Confiance renforcée → réduction des arnaques et collaborations échouées.

---

## **2\. Analyse de marché**

### **Concurrents directs (influence marketing \+ sécurisation paiement)**

* **Upfluence** : plate-forme de mise en relation marque-influenceurs, mais sans escrow.

* **AspireIQ** / **Grin** : gestion de campagnes, mais pas de dépôt bloqué.

* **Collabstr** : marketplace pour influenceurs (paiement sécurisé mais côté marque uniquement).

* **Fiverr / Upwork** : escrow classique pour freelances, mais pas spécialisé créateurs.

👉 **Aucun acteur ne combine "escrow mutuel \+ contrat digital \+ vérification automatique de contenu publié"** → vraie opportunité.

### **Marché cible**

* **Créateurs micro et nano-influenceurs (1k \- 50k abonnés)** : plus nombreux, besoin de confiance, souvent moins organisés.

* **PME / marques émergentes** : comme ton cousin, qui veulent visibilité sans risquer de perdre produits ou argent.

* Taille du marché : le marché global du marketing d'influence est estimé à **24 milliards USD d'ici 2025**, avec une forte croissance annuelle.

---

## **3\. Analyse SWOT**

### **Forces**

* Concept inédit (escrow bilatéral).

* Répond à une douleur réelle.

* Potentiel international dès le départ.

### **Faiblesses**

* Nécessité de créer une **confiance légale** (contrat numérique reconnu par loi suisse/UE).

* Défi technique : détection automatique de contenu.

* Effet réseau nécessaire (attirer les deux côtés en même temps).

### **Opportunités**

* Explosion du marketing d'influence.

* Besoin croissant de transparence.

* Partenariats avec agences d'influence.

### **Menaces**

* Entrée rapide de concurrents établis.

* Régulation légale (contrats internationaux, taxes).

* Adoption lente si trop complexe pour les créateurs.

---

## **4\. Go-To-Market Strategy**

### **Étape 1 – MVP**

* Cibler **1 niche précise** : par exemple les créateurs dans le sport/golf (expérience de ton cousin).

* Fonctionnalités essentielles : création de contrat, double dépôt, validation manuelle de la vidéo.

* Lancer en Suisse pour tester le cadre légal.

### **Étape 2 – Early adopters**

* Approcher des micro-influenceurs & PME.

* Campagnes test : "Sécurisez vos collaborations avec TrustMeBro".

* Créer du contenu éducatif : vidéos TikTok/LinkedIn expliquant les arnaques et la solution.

### **Étape 3 – Expansion**

* Ajouter automatisation IA pour vérifier la vidéo.

* Déployer à l'international.

* Intégrer aux grandes plateformes (Instagram API, TikTok API, YouTube API).

---

## **5\. Aspects juridiques & techniques critiques**

* **Contrat digital** :

  * Vérifier la reconnaissance légale en Suisse & UE (eIDAS pour signature électronique).

  * Potentiellement intégrer blockchain/smart contracts pour crédibilité.

* **Paiement & escrow** :

  * Intégrer un prestataire type Stripe Connect / MangoPay (gère les fonds en escrow).

* **Vérification de contenu** :

  * API des réseaux sociaux pour vérifier publication.

  * IA d'analyse d'image/texte pour confirmer que le produit est bien montré.

* **Monétisation** :

  * Commission sur chaque transaction (5–10%).

  * Abonnements pour agences/marques.

---

## **6\. Prochaines étapes concrètes**

1. **Validation marché** : interviews de 20–30 marques & influenceurs → confirmer la douleur.

2. **Prototype rapide (NoCode)** : Bubble.io / Webflow \+ Stripe → tester concept.

3. **Analyse légale** : juriste sur contrats digitaux & escrow.

4. **Design MVP** : gestion de contrats, dépôts, validation manuelle.

5. **Roadmap produit** : IA & automatisations pour la phase 2\.

---

Voici le **cahier des charges complet (v1)** pour **TrustMeBro** — une application web qui sécurise les collaborations marques ↔ créateurs via contrats digitaux et dépôts (escrow bilatéral). C'est structuré pour que tes devs puissent démarrer tout de suite (Next.js/TS), avec un périmètre MVP clair, des user stories, des schémas de données, des API, des règles métier, des critères d'acceptation et un plan de test.

---

# **1\) Vision & objectifs**

**Problème.** Les marques envoient des produits ou paient, les créateurs ne publient pas toujours. Les créateurs craignent de ne pas être payés après publication.

**Solution.** Un contrat digital exécutable \+ **dépôts des deux parties** (marque & créateur). Les fonds sont bloqués puis **libérés** quand la publication est vérifiée (manuelle v1). Possibilité d'annulation mutuelle ou gestion de litige.

**KPIs v1.**

* Taux de contrats complétés (% Released / Funded)

* Délai moyen création → publication

* Taux de litiges

* NPS (marques, créateurs)

---

# **2\) Périmètre MVP (v1)**

Inclut :

* Inscription/connexion (email \+ OAuth Google/Apple), profils **Marque** & **Créateur**

* Création/acceptation de **Contrats** (brief, livrables, deadline, dépôts)

* **Escrow bilatéral** (dépôt créateur \+ budget marque) via PSP (Stripe Connect **Standard** ou MangoPay)

* **Vérification manuelle** de la publication (lien public \+ captures)

* Libération/annulation des fonds (avec accord) ; litige basique avec médiation admin

* Tableau de bord temps réel \+ historique

* Admin console (modération, litiges, remboursements)

Exclut v1 (prévu v2+) :

* Reconnaissance automatique du produit dans la vidéo

* Market network avancé (matching, discovery)

* Workflows multi-livrables/multi-plateformes complexes

* App mobile native

---

# **3\) Rôles & permissions**

* **Marque** : crée des contrats, dépose fonds, valide publication, peut demander annulation/litige.

* **Créateur** : accepte contrats, dépose caution, soumet la publication, peut demander annulation/litige.

* **Admin** : arbitre litiges, force refund/release, gère KYC/KYB alerts.

RBAC (haut niveau) :

* `brand:*` sur ses ressources ; `creator:*` sur ses ressources ; `admin:*` global.

---

# **4\) Flux fonctionnels (state machine)**

## **4.1 États d'un contrat**

`Draft → Proposed → Accepted → Funded (brand+creator) → InProgress → Submitted → UnderReview → Released → Closed`

Branches :

* `Submitted → RevisionsRequested → Submitted`

* Expiration : `InProgress/Submitted → Expired`

* Annulation mutuelle : `Accepted/Funded/InProgress → Cancelled`

* Litige : `UnderReview → Disputed → (AdminResolved: Released|Refunded|Split) → Closed`

## **4.2 Principaux scénarios**

**Créer & financer**

1. Marque crée **Draft** (brief, livrable, hashtags, deadline, prix contrat, dépôt créateur, dépôt marque).

2. Marque envoie **Proposed** au créateur.

3. Créateur **Accepted** ou propose modifs (commentaires v1 simple).

4. **Funded** quand **les deux dépôts** \+ **budget marque** sont effectivement bloqués (PSP).

5. **InProgress** : le compte à rebours démarre.

**Soumission & review**  
 6\. Créateur **Submitted** l'URL public \+ captures (+ ID plateforme si dispo).  
 7\. **UnderReview** (auto 48h) :

* Marque **Approve → Released** (automatique : transferts)

* Marque **RevisionsRequested** (commentaire requis)

* Marque **No action** → auto-approve à J+2 (configurable v1=48h)

**Annulation**

* **Mutuelle** : si les deux confirment, remboursement des dépôts selon règles (voir § Règles financières).

* **Unilatérale** : passe en **Disputed** → admin tranche.

**Litige**

* Ouvert par l'une des parties après `Submitted` ou à l'expiration.

* Admin décide : `Released | Refunded | Split` \+ message.

---

# **5\) Règles métier (essentielles v1)**

* **Dépôt créateur** (p. ex. CHF 100\) \= caution remboursable si publication conforme & dans les délais ; sinon peut être partiellement/totalement retenue selon décision (annulation/expiration/litige).

* **Dépôt marque** \= (optionnel v1, recommandé) petite caution pour dissuader no-show côté marque (ex : CHF 50).

* **Budget contrat** (montant marque pour rémunération créateur).

* **Auto-approval** : si marque n'agit pas sous 48h après `Submitted`, on **Release** automatique.

* **Deadline** : si non publié à temps → `Expired` (créateur perd caution \+ marque récupère budget, sauf médiation).

* **Extensions** : une prolongation peut être proposée (1 fois v1) → accepte/refuse.

* **Frais plateforme** : % sur le **budget** lors de `Released`. Pas de frais sur dépôts restitués.

* **Monnaie** : CHF (v1) ; stocker en décimales (entiers en centimes).

* **Taxes/TVA** : stocker la résidence fiscale ; remettre à l'utilisateur la responsabilité fiscale (invoicing simple v1).

---

# **6\) UX / Écrans (MVP)**

* **Onboarding** (choix rôle, KYC/KYB déclenché par PSP si payouts)

* **Dashboard** (cartes : À financer / En cours / En revue / À valider / Litiges)

* **Créer un contrat** (wizard 4 étapes : Détails → Livrable → Rémunération & dépôts → Conditions & deadline)

* **Détail contrat** (timeline états, CTA contextuels)

* **Paiement/dépôt** (redirection PSP \+ webhooks)

* **Soumission publication** (URL, captures, notes)

* **Review** (aperçu, bouton approuver / demander révisions)

* **Annulation** (modale acceptation mutuelle)

* **Litige** (formulaire \+ pièces jointes)

* **Profil / Paramètres** (coordonnées, société, IBAN/compte PSP, préférences)

* **Admin console** (queue litiges, recherche contrats, actions forcées, logs PSP)

Accessibilité : AA (labels, focus, contrastes), i18n FR/EN (clé/valeurs).

---

# **7\) Données & schéma (v1)**

## **7.1 Entités (principales)**

**User** `(id, email, name, role: 'brand'|'creator'|'admin', created_at)`  
 **Profile** `(user_id FK, company_name, vat_id, address, country, psp_account_id, kyc_status)`  
 **Contract** `(id, brand_id, creator_id, title, brief, deliverable_type: 'tiktok'|'instagram'|'youtube'|'other', deliverable_requirements JSON, hashtags JSON, product_name, product_value_cents, budget_cents, creator_deposit_cents, brand_deposit_cents, currency='CHF', deadline_at, state, auto_approve_after_h)`  
 **ContractEvent** `(id, contract_id, actor_id, type, payload JSON, created_at)`  
 **Funding** `(id, contract_id, type:'brand_budget'|'brand_deposit'|'creator_deposit', amount_cents, psp_payment_intent_id, status:'pending'|'succeeded'|'failed', created_at)`  
 **Submission** `(id, contract_id, url, platform:'tiktok'|'instagram'|'youtube'|'other', post_identifier, screenshots JSON, notes, created_at)`  
 **Review** `(id, contract_id, reviewer_id, decision:'approve'|'revise', comment, created_at)`  
 **Dispute** `(id, contract_id, opener_id, reason, evidence JSON, status:'open'|'resolved', resolution:'released'|'refunded'|'split'|NULL, created_at, resolved_at)`  
 **Payout** `(id, contract_id, beneficiary_id, amount_cents, psp_transfer_id, status, created_at)`  
 **Fee** `(id, contract_id, kind:'platform', base_amount_cents, percentage, amount_cents, created_at)`  
 **AuditLog** `(id, actor_id, action, resource, resource_id, metadata JSON, created_at)`

Base : PostgreSQL (RDS/Aurora) v1 pour simplicité & intégrité ; (optionnel : DynamoDB plus tard pour scale).

## **7.2 Index/contraintes**

* `Contract(state, brand_id, creator_id)`

* `Funding(contract_id, type, status)`

* `Submission(contract_id)` unique par itération v1

* FK en cascade restreinte.

---

# **8\) Architecture & stack**

* **Frontend** : Next.js 15 (App Router), TypeScript, React Server Components, Zod pour schémas, TanStack Query, Auth via NextAuth (email \+ Google/Apple).

* **Backend** : Next.js API routes / Route Handlers, tRPC (optionnel) ou REST.

* **DB** : PostgreSQL \+ Prisma ORM.

* **PSP** : **Stripe Connect** (Standard) – PaymentIntents \+ Transfers (capture/délais) ; alternative EU/CH : **MangoPay** (e-wallets escrow natif).

* **Stockage** : S3 (captures), CloudFront.

* **Emails** : Resend / Postmark (transactions, notifications).

* **Infra** : Vercel (front), AWS (DB/S3).

* **Logs/Observabilité** : OpenTelemetry \+ Sentry \+ Logtail.

* **Infra as Code** : Terraform / CDK (DB/S3/IAM).

* **Secrets** : AWS Secrets Manager.

---

# **9\) API (REST v1)**

Base: `/api/v1`

**Auth**

* `POST /auth/signin` (géré NextAuth)

* `POST /auth/signout`

**Contracts**

* `POST /contracts` → crée Draft

* `GET /contracts?role=brand|creator&state=...`

* `GET /contracts/:id`

* `POST /contracts/:id/propose` (brand → Proposed)

* `POST /contracts/:id/accept` (creator → Accepted)

* `POST /contracts/:id/fund` (init funding; renvoie client\_secret PSP par type)

* `POST /contracts/:id/start` (auto server quand funding complet → InProgress)

* `POST /contracts/:id/submit` (creator → Submitted) { url, platform, screenshots\[\] }

* `POST /contracts/:id/review` (brand) { decision: approve|revise, comment }

* `POST /contracts/:id/cancel` (demande annulation mutuelle)

* `POST /contracts/:id/cancel/confirm` (autre partie confirme)

* `POST /contracts/:id/dispute` { reason, evidence\[\] }

* `POST /contracts/:id/resolve` (admin) { resolution: released|refunded|split, amounts }

**Payments (webhooks)**

* `POST /webhooks/psp` (Stripe/MangoPay)

  * `payment_intent.succeeded/failed` → maj Funding

  * `transfer.paid` → maj Payout

**Admin**

* `GET /admin/disputes?status=open`

* `POST /admin/disputes/:id/resolve`

* `POST /admin/contracts/:id/force-release|force-refund`

---

# **10\) Intégration Paiement/Escrow (v1 pragmatique)**

**Stripe Connect (Standard)**

* **Dépôts** \= PaymentIntents capturés sur compte plateforme, **remboursés** intégralement/partiellement selon issue.

* **Budget marque** \= PaymentIntent **capturé** à l'approval (ou capturable différé avec autorisation \~7 jours ; si \>7j, autoriser \+ stocker via SetupIntent/PaymentIntent reconfirmé au submit).

* **Payout** créateur \= **Transfer** vers le compte connecté (moins **fee** plateforme).

* **KYC/KYB** : délégué à Stripe (onboarding Express/Standard).

Alternative **MangoPay** : wallets `E-Wallet` par partie, **pay-ins** → **escrow** → **pay-outs**, plus "natif" pour escrow en Europe.

---

# **11\) Sécurité, conformité, légal**

* **Signatures électroniques** : v1 « simple » (consentement par clic \+ horodatage \+ hash PDF du contrat). v2 : **Skribble (CH/eIDAS)** pour **AdES**.

* **GDPR/LPD CH** : DPA, consentements, droit à l'effacement, DPA avec PSP & email provider.

* **KYC/KYB** : obligatoire si payouts (PSP gère, stocker états seulement).

* **Sécurité** :

  * 2FA optionnelle

  * Rate limiting par IP/user

  * CSP stricte, SameSite cookies, HTTPS only

  * RBAC en middleware, audit logs

  * Stockage S3 privé \+ liens signés

* **Juridique** (conditions v1) : responsabilités, propriété intellectuelle, délais & pénalités, arbitrage (loi CH, for à Fribourg par défaut), TVA/impôts à charge des utilisateurs.

---

# **12\) Règles de libération/remboursement (calcul)**

À `Released` :

* **Payout créateur** \= `budget - fee` \+ **remboursement dépôt créateur**

* **Remboursement marque** \= **dépôt marque** (si pas de pénalité)

**Annulation mutuelle avant publication** :

* Rembourser **budget** à la marque

* Rembourser **dépôts** aux deux OU appliquer petite **penalty** convenue (paramètre %)

**Expiration sans soumission** :

* Rembourser **budget** à la marque

* **Confisquer** dépôt créateur (en tout ou partie, règle paramétrable ; v1 \= 100%)

**Litige (admin)** :

* `released` / `refunded` / `split` → montants calculés et journalisés

---

# **13\) Notifications**

* Email & in-app :

  * Propositions, acceptations, demandes de financement

  * Soumission reçue, rappel auto-review (T+24h), auto-approve (T+48h)

  * Annulation en attente de confirmation

  * Litige ouvert / résolu

* Digest hebdo (opt-in)

---

# **14\) Observabilité & journalisation**

* **ContractEvent** pour chaque transition d'état (sources-of-truth pour timelines)

* Traçage webhooks (idempotency keys)

* Table **AuditLog** (actes sensibles : release/refund/resolve)

---

# **15\) Critères d'acceptation (extraits)**

* Un créateur **ne peut pas** démarrer sans que **les 3 fonds** soient `succeeded` (budget marque \+ dépôt marque \+ dépôt créateur).

* La **soumission** exige une **URL valide** \+ au moins **1 capture**.

* Si la marque n'agit pas dans les **48h** après `Submitted`, le système **approuve automatiquement** et déclenche le **payout**.

* Les **remboursements** et **payouts** s'alignent exactement sur la décision (logs & montants vérifiables).

* L'**admin** peut forcer `release/refund/split` et tout est consigné dans **AuditLog**.

* Les utilisateurs **voient** en temps réel l'état, les montants bloqués, les échéances.

---

# **16\) Plan de tests (MVP)**

## **Unit**

* Calculs financiers (arrondis, split)

* Transitions d'états (machine à états)

* Validation de payloads (Zod)

## **Intégration**

* Webhooks PSP (success/fail, idempotency)

* Upload S3 \+ accès via URL signée

* Auth & RBAC (accès croisé interdit)

## **E2E (Playwright)**

* Parcours complet marque→créateur→funding→soumission→approval→payout

* Annulation mutuelle

* Expiration (simulateur de temps)

* Litige et résolution admin

---

# **17\) Backlog priorisé**

1. **Core contrats & états**

2. **Paiements/dépôts** (PSP)

3. **Soumission & review**

4. **Auto-approve \+ payouts**

5. **Annulation mutuelle**

6. **Litiges admin**

7. **Admin console**

8. Emails & notifications

9. i18n EN

10. Export PDF du contrat signé (hashé)

---

# **18\) Exemple de contrat (clauses v1 – résumé)**

* Objet & livrable (plateforme, format, durée, mentions obligatoires, hashtags)

* Droits d'utilisation (durée, territoires, boost paid media : oui/non)

* Calendrier & deadline

* Révisions (1 itération incluse v1)

* Rémunération & dépôts (montants, devise)

* Vérification & approbation (48h)

* Annulation, expiration, litiges, pénalités

* Loi applicable & for

* Consentement électronique (horodatage \+ hash)

---

# **19\) Snippets techniques (orientation)**

## **19.1 Énumérations (TypeScript)**

`export type ContractState =`  
  `| 'Draft' | 'Proposed' | 'Accepted' | 'Funded'`  
  `| 'InProgress' | 'Submitted' | 'UnderReview'`  
  `| 'RevisionsRequested' | 'Released' | 'Closed'`  
  `| 'Expired' | 'Cancelled' | 'Disputed' | 'AdminResolved';`

## **19.2 Validation (Zod)**

`const CreateContractSchema = z.object({`  
  `title: z.string().min(3),`  
  `brief: z.string().min(10),`  
  `deliverable: z.object({`  
    `platform: z.enum(['tiktok','instagram','youtube','other']),`  
    `durationSec: z.number().int().positive().max(180),`  
    `hashtags: z.array(z.string()).max(10),`  
  `}),`  
  `budgetCents: z.number().int().min(1000),`  
  `creatorDepositCents: z.number().int().min(0),`  
  `brandDepositCents: z.number().int().min(0),`  
  `productValueCents: z.number().int().min(0),`  
  `deadlineAt: z.string().datetime(),`  
`});`

## **19.3 Idempotency (webhook)**

`// if (await seen(event.id)) return 200; else markSeen(event.id)`

---

# **20\) Roadmap v2+**

* **Vérification automatique** : API plateformes (oEmbed/Graph), NLP/computer vision pour détecter le produit/texte/hashtags, fingerprint média.

* **Marketplace** : recherche créateurs par niche/audience, scoring fiabilité (SLA de livraison).

* **Contrats multiples / bundles** (séries de posts, multi-plateformes).

* **Scores de réputation** \+ badges (on-time, quality).

* **Assurance** (optionnelle) contre non-livraison.

* **Skribble / DocuSign** pour signature AdES/QES.

---

## **Ce qu'il reste à décider (inputs fondateurs)**

* % **frais plateforme** (p. ex. 8–10%)

* **Montant standard** du dépôt créateur (p. ex. \= min(product value, 100 CHF) ?)

* **Auto-approve delay** (48h v1)

* **PSP** : Stripe (plus simple) vs MangoPay (escrow "wallet" natif UE)

* **Loi & for** par défaut (CH/FR)

---

## Mise à jour (2025-08-25) — Profil utilisateur & Préférences

* Schéma Prisma: ajout `UserSettings` (1:1 avec `User`) et lien `User.settings`.
* API:
  * `POST /api/signup` (création compte email+password + `Profile` et `UserSettings` par défaut)
  * `GET/PUT /api/user/profile` (lecture/mise à jour `Profile`)
  * `GET/PUT /api/user/settings` (lecture/mise à jour `UserSettings`)
* UI:
  * Page `signin` existante, nouvelle page `signup`, nouvelle page `profile` (édition profil & préférences).
  * Header "auth-aware": affiche `Profile` + `Sign out` si connecté; `Sign in` + `Sign up` sinon.
* Auth: NextAuth Credentials, session via `auth()` dans les server components; `signOut()` côté client.
* Conventions: routes en runtime Node.js, validation Zod.

##### Schéma Prisma complet

Voici le **schéma Prisma complet** pour TrustMeBro (PostgreSQL). Il couvre les entités, relations, contraintes et index du MVP décrit. Copie-colle ce fichier en `prisma/schema.prisma`.

`// prisma/schema.prisma`

`generator client {`  
  `provider = "prisma-client-js"`  
`}`

`datasource db {`  
  `provider = "postgresql"`  
  `url      = env("DATABASE_URL")`  
`}`

`/// =======================`  
`/// Enums`  
`/// =======================`  
`enum Role {`  
  `brand`  
  `creator`  
  `admin`  
`}`

`enum ContractState {`  
  `Draft`  
  `Proposed`  
  `Accepted`  
  `Funded`  
  `InProgress`  
  `Submitted`  
  `UnderReview`  
  `RevisionsRequested`  
  `Released`  
  `Closed`  
  `Expired`  
  `Cancelled`  
  `Disputed`  
  `AdminResolved`  
`}`

`enum FundingType {`  
  `brand_budget`  
  `brand_deposit`  
  `creator_deposit`  
`}`

`enum FundingStatus {`  
  `pending`  
  `succeeded`  
  `failed`  
`}`

`enum ReviewDecision {`  
  `approve`  
  `revise`  
`}`

`enum DisputeStatus {`  
  `open`  
  `resolved`  
`}`

`enum DisputeResolution {`  
  `released`  
  `refunded`  
  `split`  
`}`

`enum FeeKind {`  
  `platform`  
`}`

`enum Currency {`  
  `CHF`  
  `EUR`  
  `USD`  
`}`

`enum Platform {`  
  `tiktok`  
  `instagram`  
  `youtube`  
  `other`  
`}`

`/// =======================`  
`/// Models`  
`/// =======================`

`model User {`  
  `id           String   @id @default(cuid())`  
  `email        String   @unique`  
  `name         String?`  
  `role         Role     @default(creator)`  
  `createdAt    DateTime @default(now())`  
  `updatedAt    DateTime @updatedAt`

  `profile      Profile?`  
  `// Relations`  
  `brandContracts   Contract[] @relation("BrandContracts")`  
  `creatorContracts Contract[] @relation("CreatorContracts")`  
  `contractEvents   ContractEvent[]`  
  `reviews          Review[]`  
  `disputesOpened   Dispute[]  @relation("DisputeOpener")`  
  `payouts          Payout[]`  
  `auditLogs        AuditLog[]`  
`}`

`model Profile {`  
  `userId        String   @id`  
  `companyName   String?`  
  `vatId         String?`  
  `address       String?`  
  `country       String?`  
  `pspAccountId  String?  // Stripe/MangoPay account`  
  `kycStatus     String?  // mirrored from PSP`

  `user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)`  
`}`

`/// Contrat entre une marque (brand) et un créateur (creator)`  
`model Contract {`  
  `id                     String         @id @default(cuid())`  
  `title                  String`  
  `brief                  String`  
  `deliverableType        Platform`  
  `deliverableRequirements Json`  
  `hashtags               Json`  
  `productName            String`  
  `productValueCents      Int            @default(0)`

  `currency               Currency       @default(CHF)`  
  `budgetCents            Int            // montant rémunération créateur`  
  `creatorDepositCents    Int            @default(0)`  
  `brandDepositCents      Int            @default(0)`

  `deadlineAt             DateTime`  
  `state                  ContractState  @default(Draft)`  
  `autoApproveAfterH      Int            @default(48)`

  `createdAt              DateTime       @default(now())`  
  `updatedAt              DateTime       @updatedAt`

  `// Relations`  
  `brandId                String`  
  `creatorId              String`  
  `brand                  User           @relation("BrandContracts", fields: [brandId], references: [id], onDelete: Restrict)`  
  `creator                User           @relation("CreatorContracts", fields: [creatorId], references: [id], onDelete: Restrict)`

  `events                 ContractEvent[]`  
  `fundings               Funding[]`  
  `submissions            Submission[]`  
  `reviews                Review[]`  
  `disputes               Dispute[]`  
  `payouts                Payout[]`  
  `fees                   Fee[]`

  `@@index([state, brandId])`  
  `@@index([state, creatorId])`  
  `@@index([brandId, creatorId])`  
  `@@index([deadlineAt])`  
`}`

`/// Historique immuable des transitions / actions`  
`model ContractEvent {`  
  `id         String   @id @default(cuid())`  
  `contractId String`  
  `actorId    String?`  
  `type       String   // e.g. "PROPOSED","FUNDED.brand_budget","AUTO_APPROVE"`  
  `payload    Json`  
  `createdAt  DateTime @default(now())`

  `contract   Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)`  
  `actor      User?    @relation(fields: [actorId], references: [id], onDelete: SetNull)`

  `@@index([contractId, createdAt])`  
`}`

`/// Traces de paiements entrants (dépôts + budget)`  
`model Funding {`  
  `id                   String        @id @default(cuid())`  
  `contractId           String`  
  `type                 FundingType`  
  `amountCents          Int`  
  `pspPaymentIntentId   String        @unique`  
  `status               FundingStatus @default(pending)`  
  `createdAt            DateTime      @default(now())`

  `contract             Contract      @relation(fields: [contractId], references: [id], onDelete: Cascade)`

  `@@index([contractId, type, status])`  
`}`

`/// Soumission de la publication par le créateur`  
`model Submission {`  
  `id            String   @id @default(cuid())`  
  `contractId    String`  
  `url           String`  
  `platform      Platform`  
  `postIdentifier String?`  
  `screenshots   Json     // array of objects (keys: url, s3Key, etc.)`  
  `notes         String?`  
  `createdAt     DateTime @default(now())`

  `contract      Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)`

  `@@unique([contractId, createdAt]) // limite rudimentaire v1 (1 soumission par itération temporelle)`  
  `@@index([contractId, createdAt])`  
`}`

`/// Décision de la marque suite à une soumission`  
`model Review {`  
  `id          String         @id @default(cuid())`  
  `contractId  String`  
  `reviewerId  String`  
  `decision    ReviewDecision`  
  `comment     String?`  
  `createdAt   DateTime       @default(now())`

  `contract    Contract       @relation(fields: [contractId], references: [id], onDelete: Cascade)`  
  `reviewer    User           @relation(fields: [reviewerId], references: [id], onDelete: Restrict)`

  `@@index([contractId, createdAt])`  
`}`

`/// Litige ouvert par une des deux parties`  
`model Dispute {`  
  `id          String            @id @default(cuid())`  
  `contractId  String`  
  `openerId    String`  
  `reason      String`  
  `evidence    Json?`  
  `status      DisputeStatus     @default(open)`  
  `resolution  DisputeResolution?`  
  `createdAt   DateTime          @default(now())`  
  `resolvedAt  DateTime?`

  `contract    Contract          @relation(fields: [contractId], references: [id], onDelete: Cascade)`  
  `opener      User              @relation("DisputeOpener", fields: [openerId], references: [id], onDelete: Restrict)`

  `@@index([contractId, status])`  
`}`

`/// Paiement sortant (créateur) lors du Released`  
`model Payout {`  
  `id              String   @id @default(cuid())`  
  `contractId      String`  
  `beneficiaryId   String`  
  `amountCents     Int`  
  `pspTransferId   String?  @unique`  
  `status          String    // e.g. "queued","paid","failed"`  
  `createdAt       DateTime  @default(now())`

  `contract        Contract  @relation(fields: [contractId], references: [id], onDelete: Cascade)`  
  `beneficiary     User      @relation(fields: [beneficiaryId], references: [id], onDelete: Restrict)`

  `@@index([contractId, status])`  
`}`

`/// Frais plateforme calculés à la libération`  
`model Fee {`  
  `id               String   @id @default(cuid())`  
  `contractId       String`  
  `kind             FeeKind  @default(platform)`  
  `baseAmountCents  Int`  
  `percentage       Float`  
  `amountCents      Int`  
  `createdAt        DateTime @default(now())`

  `contract         Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)`

  `@@index([contractId])`  
`}`

`/// Journal d'audit (actions sensibles, admin, webhooks, etc.)`  
`model AuditLog {`  
  `id         String   @id @default(cuid())`  
  `actorId    String?`  
  `action     String`  
  `resource   String`  
  `resourceId String?`  
  `metadata   Json`  
  `createdAt  DateTime @default(now())`

  `actor      User?    @relation(fields: [actorId], references: [id], onDelete: SetNull)`

  `@@index([createdAt])`  
`}`

---

## **(Optionnel) Diagramme ER (Mermaid)**

Tu peux coller ce bloc dans un viewer Mermaid pour un aperçu visuel.

`erDiagram`  
  `User ||--o| Profile : has`  
  `User ||--o{ Contract : "brand (BrandContracts)"`  
  `User ||--o{ Contract : "creator (CreatorContracts)"`  
  `User ||--o{ ContractEvent : acts`  
  `User ||--o{ Review : writes`  
  `User ||--o{ Dispute : opens`  
  `User ||--o{ Payout : receives`  
  `User ||--o{ AuditLog : triggers`

  `Contract ||--o{ ContractEvent : has`  
  `Contract ||--o{ Funding : has`  
  `Contract ||--o{ Submission : has`  
  `Contract ||--o{ Review : has`  
  `Contract ||--o{ Dispute : has`  
  `Contract ||--o{ Payout : has`  
  `Contract ||--o{ Fee : has`

  `Profile {`  
    `string userId PK`  
    `string companyName`  
    `string vatId`  
    `string address`  
    `string country`  
    `string pspAccountId`  
    `string kycStatus`  
  `}`

  `User {`  
    `string id PK`  
    `string email`  
    `string name`  
    `enum   role`  
    `date   createdAt`  
    `date   updatedAt`  
  `}`

  `Contract {`  
    `string id PK`  
    `string title`  
    `string brief`  
    `enum   deliverableType`  
    `json   deliverableRequirements`  
    `json   hashtags`  
    `string productName`  
    `int    productValueCents`  
    `enum   currency`  
    `int    budgetCents`  
    `int    creatorDepositCents`  
    `int    brandDepositCents`  
    `date   deadlineAt`  
    `enum   state`  
    `int    autoApproveAfterH`  
    `date   createdAt`  
    `date   updatedAt`  
    `string brandId FK`  
    `string creatorId FK`  
  `}`

  `ContractEvent {`  
    `string id PK`  
    `string contractId FK`  
    `string actorId FK`  
    `string type`  
    `json   payload`  
    `date   createdAt`  
  `}`

  `Funding {`  
    `string id PK`  
    `string contractId FK`  
    `enum   type`  
    `int    amountCents`  
    `string pspPaymentIntentId`  
    `enum   status`  
    `date   createdAt`  
  `}`

  `Submission {`  
    `string id PK`  
    `string contractId FK`  
    `string url`  
    `enum   platform`  
    `string postIdentifier`  
    `json   screenshots`  
    `string notes`  
    `date   createdAt`  
  `}`

  `Review {`  
    `string id PK`  
    `string contractId FK`  
    `string reviewerId FK`  
    `enum   decision`  
    `string comment`  
    `date   createdAt`  
  `}`

  `Dispute {`  
    `string id PK`  
    `string contractId FK`  
    `string openerId FK`  
    `string reason`  
    `json   evidence`  
    `enum   status`  
    `enum   resolution`  
    `date   createdAt`  
    `date   resolvedAt`  
  `}`

  `Payout {`  
    `string id PK`  
    `string contractId FK`  
    `string beneficiaryId FK`  
    `int    amountCents`  
    `string pspTransferId`  
    `string status`  
    `date   createdAt`  
  `}`

  `Fee {`  
    `string id PK`  
    `string contractId FK`  
    `enum   kind`  
    `int    baseAmountCents`  
    `float  percentage`  
    `int    amountCents`  
    `date   createdAt`  
  `}`

  `AuditLog {`  
    `string id PK`  
    `string actorId FK`  
    `string action`  
    `string resource`  
    `string resourceId`  
    `json   metadata`  
    `date   createdAt`  
  `}`

Souhaites-tu que je passe à **\#2 – modèle de contrat PDF (template prêt à remplir \+ hash & horodatage)** ?

##### **You said:**

Continue

###### **ChatGPT said:**

Réflexion durant 16s  
Analyzed  
Always show details  
`# Create a French contract template for TrustMeBro and a hashing guide as Markdown files.`

`contract_content = """# Contrat de Collaboration — TrustMeBro (v1)`

`**Référence contrat (auto)** : {{CONTRACT_ID}}`
`**Date d'émission** : {{ISSUE_DATE}}`
`**Loi applicable / For** : {{GOVERNING_LAW}} / {{JURISDICTION}}`  

`---`

`## 1) Parties`

`**Marque (Donneur d'ordre)**`
`- Dénomination : {{BRAND_COMPANY_NAME}}`
`- N° TVA (si applicable) : {{BRAND_VAT_ID}}`
`- Adresse : {{BRAND_ADDRESS}}`
`- Pays : {{BRAND_COUNTRY}}`
`- Représentant : {{BRAND_REP_NAME}} ({{BRAND_REP_TITLE}})`
`- Email : {{BRAND_EMAIL}}`  

`**Créateur de contenu (Prestataire)**`
`- Nom / Dénomination : {{CREATOR_NAME}}`
`- N° TVA (si applicable) : {{CREATOR_VAT_ID}}`
`- Adresse : {{CREATOR_ADDRESS}}`
`- Pays : {{CREATOR_COUNTRY}}`
`- Email : {{CREATOR_EMAIL}}`
`- Comptes plateformes : TikTok: {{CREATOR_TIKTOK}}, Instagram: {{CREATOR_IG}}, YouTube: {{CREATOR_YT}}`  

`---`

`## 2) Objet et livrable`

`- **Produit / Marque promus** : {{PRODUCT_NAME}}`
`- **Plateforme** : {{PLATFORM}} (TikTok / Instagram / YouTube / Autre: {{PLATFORM_OTHER}})`
`- **Format & durée** : {{FORMAT_SPEC}} (ex. vidéo 15–60s)`
`- **Mentions obligatoires** : {{MANDATORY_MENTIONS}}`
`- **Hashtags** : {{HASHTAGS}}`
`- **Lien(s) d'appel à l'action (CTA)** : {{CTA_LINKS}}`
`- **Exigences spécifiques** : {{SPECIAL_REQUIREMENTS}}`
`- **Droits d'utilisation par la Marque** : {{USAGE_RIGHTS}} (ex. organique 12 mois, paid media: NON/OUI {{PAID_MEDIA_WINDOW}})`  

`---`

`## 3) Calendrier`

`- **Date limite de publication** : {{DEADLINE_AT}} (TZ : {{TIMEZONE}})`
`- **Fenêtre de validation par la Marque** : {{AUTO_APPROVE_HOURS}} heures après soumission (à défaut d'action, approbation automatique).`
`- **Prolongation** (optionnelle) : 1 prolongation possible de {{EXTENSION_DAYS}} jours si demandée avant l'échéance et acceptée par l'autre partie.`  

`---`

`## 4) Rémunération, dépôts et flux financiers`

`- **Devise** : {{CURRENCY}} (v1 par défaut CHF)`
`- **Budget contrat (Marque → Créateur)** : {{BUDGET_AMOUNT}} {{CURRENCY}}`
`- **Dépôt Créateur (caution remboursable)** : {{CREATOR_DEPOSIT}} {{CURRENCY}}`
`- **Dépôt Marque (optionnel)** : {{BRAND_DEPOSIT}} {{CURRENCY}}`
`- **Frais plateforme (TrustMeBro)** : {{PLATFORM_FEE_PERCENT}}% prélevés sur le budget lors de la libération.`  

`**Règles**`
`1. Les fonds sont bloqués via le prestataire de paiement (escrow).`
`2. À **publication conforme** et **validation** (ou auto-approbation), la plateforme :`
   `- déclenche le **payout** du budget (moins frais) au Créateur ;`
   `- **rembourse** la caution du Créateur ;`
   `- **rembourse** la caution de la Marque (si applicable).`
`3. **Annulation mutuelle** : remboursement des fonds selon accord ; par défaut, budget et cautions remboursés intégralement.`
`4. **Expiration sans soumission** : remboursement du **budget** à la Marque ; caution du Créateur **confisquée** (sauf décision contraire en litige).`
`5. **Litige** : la décision d'arbitrage (voir §8) détermine release/refund/split.`  

`---`

`## 5) Processus de livraison & vérification`

`1. Le Créateur publie le contenu et soumet dans l'app : **URL publique**, **captures d'écran**, **identifiant de post** si disponible.`
`2. La Marque dispose de {{AUTO_APPROVE_HOURS}}h pour **Approuver** ou **Demander des révisions** (commentaire requis).`
`3. Passé ce délai, l'**approbation est automatique**.`
`4. La conformité couvre : présence du produit/marque, mentions/hashtags/CTA, format & timing convenus.`  

`---`

`## 6) Propriété intellectuelle & droits d'usage`

`- Le **Créateur** reste titulaire des droits d'auteur sur son contenu, sous réserve des **licences** accordées à la Marque :`
  `- **Usage organique** (non sponsorisé) sur canaux de la Marque : {{USAGE_ORG_DURATION}} mois à compter de la publication.`
  `- **Paid media / whitelisting** : {{PAID_MEDIA_AUTH}} (OUI/NON) ; si OUI, fenêtre : {{PAID_MEDIA_WINDOW}} ; périmètre : {{PAID_MEDIA_TERRITORIES}}.`
`- Toute adaptation, montage, sous-titrage, ou boost payant au-delà de ce qui précède nécessite l'accord écrit du Créateur.`  

`---`

`## 7) Confidentialité & conformité`

`- Les parties s'engagent à conserver confidentielles les informations non publiques reçues dans le cadre du contrat.`
`- Chacune des parties garantit respecter les lois applicables (publicité, droit à l'image, CGU des plateformes, fiscalité, protection des données).`
`- Le Créateur s'engage à signaler toute relation rémunérée (#ad, #sponsorisé) conformément aux lois locales.`  

`---`

`## 8) Annulation, expiration, litiges`

`- **Annulation mutuelle** : effective dès double consentement dans l'app ; remboursements selon §4.`
`- **Expiration** : en cas de non-publication à la date limite, application de la règle §4.4.`
`- **Litige** : peut être ouvert par l'une des parties. TrustMeBro (ou un arbitre désigné) tranche dans un délai raisonnable et peut décider :`
  `- **Released** (paiement au Créateur),`
  `- **Refunded** (remboursement à la Marque),`
  `- **Split** (répartition).`
`La décision est **exécutoire dans la plateforme**.`  

`---`

`## 9) Responsabilités & garanties`

`- Le Créateur garantit que le contenu ne viole pas de droits tiers et respecte les CGU des plateformes.`
`- La Marque garantit la véracité de ses informations sur le produit et détient les droits sur marques & logos fournis.`
`- **Limitation de responsabilité** de TrustMeBro : rôle de plateforme de mise en relation et d'exécution technique des flux ; pas responsable des dommages indirects ; responsabilité totale limitée aux frais perçus sur le contrat concerné.`  

`---`

`## 10) Données personnelles`

`- Chaque partie agit comme **responsable de traitement** pour ses propres finalités ; la plateforme agit en **sous-traitant** pour l'hébergement et l'exécution des traitements techniques nécessaires au contrat.`
`- Droits des personnes, sécurité, conservation : selon Politique de confidentialité TrustMeBro.`  

`---`

`## 11) Loi applicable, juridiction, langue`

`- **Loi** : {{GOVERNING_LAW}} (par défaut : Suisse).`
`- **For/Juridiction** : {{JURISDICTION}} (par défaut : Fribourg).`
`- **Langue** : français ; en cas de versions multiples, la version française prévaut (sauf stipulation contraire).`  

`---`

`## 12) Consentement électronique & preuve`

`- Les parties acceptent la **signature électronique simple** via l'application TrustMeBro.`
`- Un **horodatage** et l'**empreinte (hash)** du PDF généré sont conservés.`
`- La preuve contractuelle inclut : métadonnées (IP, user agent), événements d'audit, accusés de réception email et journaux de paiement.`
`- (Option v2) Signature qualifiée via prestataire eIDAS (ex. Skribble / DocuSign).`  

`---`

`## 13) Signatures`

`**Pour la Marque**`
`Nom : {{BRAND_REP_NAME}} — Titre : {{BRAND_REP_TITLE}}`
`Date : {{SIGN_DATE_BRAND}}`
`Signature électronique : (référence) {{ESIGN_REF_BRAND}}`

`**Pour le Créateur**`
`Nom : {{CREATOR_NAME}}`
`Date : {{SIGN_DATE_CREATOR}}`
`Signature électronique : (référence) {{ESIGN_REF_CREATOR}}`

`---`

`### Annexe A — Brief détaillé / storyboard (optionnel)`  
`{{ANNEX_BRIEF}}`

`### Annexe B — Actifs & guidelines (logos, police, ton)`  
`{{ANNEX_ASSETS}}`

`### Annexe C — Détails financiers (frais, TVA, IBAN si besoin)`  
`{{ANNEX_FINANCE}}`  
`"""`

`hash_guide = """# Guide vérification — Hash & horodatage (v1)`

`Ce guide explique comment **générer** et **enregistrer** l'empreinte (hash) du contrat PDF pour preuve d'intégrité.`

`## 1) Pipeline recommandé`  
`1. Générer le PDF du contrat depuis l'app.`
`2. Calculer le **hash SHA-256** du PDF.`
``3. Enregistrer : hash, horodatage, `CONTRACT_ID`, `USER_IDs`, IP, UA dans **AuditLog**.``
`4. (Option) Ancrer le hash dans une **blockchain publique** (ex. via un service tiers) — v2.`

`## 2) Exemple Node.js (TypeScript)`  
```` ```ts ````  
`import { createHash } from 'crypto';`  
`import { readFileSync } from 'fs';`

`export function sha256FileHex(path: string) {`  
  `const buf = readFileSync(path);`  
  `const hash = createHash('sha256').update(buf).digest('hex');`  
  `return hash;`  
`}`

`// Usage`  
`const hex = sha256FileHex('/path/to/contract.pdf');`  
`console.log('SHA256:', hex);`

## **3\) Exemple Next.js API (enregistrement AuditLog)**

Always show details  
`// POST /api/v1/contracts/:id/hash-proof`  
`// body: { pdfBase64: string }`  
`import { createHash } from 'crypto';`  
`import { prisma } from '@/lib/prisma';`

`export async function POST(req: Request, { params }: { params: { id: string }}) {`  
  `const { pdfBase64 } = await req.json();`  
  `const pdf = Buffer.from(pdfBase64, 'base64');`  
  `const sha = createHash('sha256').update(pdf).digest('hex');`

  `await prisma.auditLog.create({`  
    `data: {`  
      `actorId: null, // system`  
      `action: 'CONTRACT_HASHED',`  
      `resource: 'Contract',`  
      `resourceId: params.id,`  
      `metadata: { sha256: sha, len: pdf.length },`  
    `},`  
  `});`

  `return new Response(JSON.stringify({ sha256: sha }), { status: 200 });`  
`}`

## **4\) Vérification ultérieure**

Pour vérifier un PDF téléchargé plus tard : recalculer le SHA-256 et le comparer au `metadata.sha256` de l'entrée `AuditLog(CONTRACT_HASHED)` correspondante.

## **5\) Horodatage fiable**

* Stocker `createdAt` (horloge serveur) \+ empreinte.

* (Option) Utiliser un service d'horodatage qualifié (RFC 3161 / eIDAS) en v2.  
   """

# **Write files**

contract\_path \= "/mnt/data/trustmebro\_contrat\_template\_fr\_v1.md"  
 hash\_path \= "/mnt/data/trustmebro\_hash\_guide\_v1.md"

with open(contract\_path, "w", encoding="utf-8") as f:  
 f.write(contract\_content)

with open(hash\_path, "w", encoding="utf-8") as f:  
 f.write(hash\_guide)

(contract\_path, hash\_path)

Always show details  
Result  
('/mnt/data/trustmebro\_contrat\_template\_fr\_v1.md',  
 '/mnt/data/trustmebro\_hash\_guide\_v1.md')

Top. J'ai créé deux fichiers prêts à l'emploi :

* Contrat modèle (FR) — TrustMeBro v1

* Guide vérification — Hash & horodatage v1

Tu peux les ouvrir, adapter les placeholders `{{…}}`, puis exporter en PDF depuis ton éditeur.

Je passe à **\#3 – squelette de tests E2E Playwright** ou tu préfères **\#2 bis – version EN du contrat** avant ?

##### **You said:**

\#2 bis en premier

###### **ChatGPT said:**

Analyzed  
Always show details  
`# Create an English version of the TrustMeBro contract template`

`contract_content_en = """# Collaboration Contract — TrustMeBro (v1)`

`**Contract reference (auto)**: {{CONTRACT_ID}}`
`**Issue date**: {{ISSUE_DATE}}`
`**Governing law / Jurisdiction**: {{GOVERNING_LAW}} / {{JURISDICTION}}`  

`---`

`## 1) Parties`

`**Brand (Client)**`
`- Company name: {{BRAND_COMPANY_NAME}}`
`- VAT ID (if applicable): {{BRAND_VAT_ID}}`
`- Address: {{BRAND_ADDRESS}}`
`- Country: {{BRAND_COUNTRY}}`
`- Representative: {{BRAND_REP_NAME}} ({{BRAND_REP_TITLE}})`
`- Email: {{BRAND_EMAIL}}`  

`**Content Creator (Service Provider)**`
`- Name / Company: {{CREATOR_NAME}}`
`- VAT ID (if applicable): {{CREATOR_VAT_ID}}`
`- Address: {{CREATOR_ADDRESS}}`
`- Country: {{CREATOR_COUNTRY}}`
`- Email: {{CREATOR_EMAIL}}`
`- Platform accounts: TikTok: {{CREATOR_TIKTOK}}, Instagram: {{CREATOR_IG}}, YouTube: {{CREATOR_YT}}`  

`---`

`## 2) Purpose and deliverable`

`- **Promoted product / brand**: {{PRODUCT_NAME}}`
`- **Platform**: {{PLATFORM}} (TikTok / Instagram / YouTube / Other: {{PLATFORM_OTHER}})`
`- **Format & duration**: {{FORMAT_SPEC}} (e.g. 15–60s video)`
`- **Mandatory mentions**: {{MANDATORY_MENTIONS}}`
`- **Hashtags**: {{HASHTAGS}}`
`- **Call-to-action (CTA) links**: {{CTA_LINKS}}`
`- **Special requirements**: {{SPECIAL_REQUIREMENTS}}`
`- **Usage rights granted to Brand**: {{USAGE_RIGHTS}} (e.g. organic 12 months, paid media: NO/YES {{PAID_MEDIA_WINDOW}})`  

`---`

`## 3) Schedule`

`- **Publication deadline**: {{DEADLINE_AT}} (TZ: {{TIMEZONE}})`
`- **Brand validation window**: {{AUTO_APPROVE_HOURS}} hours after submission (if no action, auto-approval).`
`- **Extension** (optional): 1 extension of {{EXTENSION_DAYS}} days if requested before the deadline and accepted by the other party.`  

`---`

`## 4) Compensation, deposits, and financial flows`

`- **Currency**: {{CURRENCY}} (default v1: CHF)`
`- **Contract budget (Brand → Creator)**: {{BUDGET_AMOUNT}} {{CURRENCY}}`
`- **Creator deposit (refundable caution)**: {{CREATOR_DEPOSIT}} {{CURRENCY}}`
`- **Brand deposit (optional)**: {{BRAND_DEPOSIT}} {{CURRENCY}}`
`- **Platform fee (TrustMeBro)**: {{PLATFORM_FEE_PERCENT}}% deducted from the budget upon release.`  

`**Rules**`
`1. Funds are held in escrow via the payment service provider.`
`2. Upon **compliant publication** and **validation** (or auto-approval), the platform:`
   `- triggers the **payout** of the budget (minus fees) to the Creator;`
   `- **refunds** the Creator's deposit;`
   `- **refunds** the Brand's deposit (if applicable).`
`3. **Mutual cancellation**: refunds according to agreement; by default, budget and deposits refunded in full.`
`4. **Expiration without submission**: refund of **budget** to Brand; Creator's deposit is **forfeited** (unless otherwise decided in dispute).`
`5. **Dispute**: arbitration decision (see §8) determines release/refund/split.`  

`---`

`## 5) Delivery & verification process`

`1. Creator publishes the content and submits in the app: **public URL**, **screenshots**, **post ID** if available.`
`2. Brand has {{AUTO_APPROVE_HOURS}}h to **Approve** or **Request revisions** (comment required).`
`3. After this delay, **auto-approval** applies.`
`4. Compliance includes: presence of product/brand, required mentions/hashtags/CTA, agreed format & timing.`  

`---`

`## 6) Intellectual property & usage rights`

`- The **Creator** retains copyright in their content, subject to the **licenses** granted to the Brand:`
  `- **Organic usage** (non-sponsored) on Brand's channels: {{USAGE_ORG_DURATION}} months from publication.`
  `- **Paid media / whitelisting**: {{PAID_MEDIA_AUTH}} (YES/NO); if YES, window: {{PAID_MEDIA_WINDOW}}; territory: {{PAID_MEDIA_TERRITORIES}}.`
`- Any adaptation, editing, subtitling, or paid boosting beyond the above requires the Creator's written consent.`  

`---`

`## 7) Confidentiality & compliance`

`- Both parties agree to keep confidential any non-public information shared under this contract.`
`- Each party warrants compliance with applicable laws (advertising, image rights, platform ToS, tax, data protection).`
`- Creator agrees to disclose any sponsored relationship (#ad, #sponsored) in accordance with local laws.`  

`---`

`## 8) Cancellation, expiration, disputes`

`- **Mutual cancellation**: effective upon double consent in the app; refunds as per §4.`
`- **Expiration**: if no publication by deadline, apply rule §4.4.`
`- **Dispute**: may be initiated by either party. TrustMeBro (or designated arbitrator) decides within a reasonable delay and may resolve as:`
  `- **Released** (payout to Creator),`
  `- **Refunded** (refund to Brand),`
  `- **Split** (distribution).`
`Decision is **binding within the platform**.`  

`---`

`## 9) Responsibilities & warranties`

`- Creator warrants that content does not infringe third-party rights and complies with platform ToS.`
`- Brand warrants accuracy of product information and that it owns rights to provided trademarks & logos.`
`- **TrustMeBro liability limitation**: role limited to technical facilitation; not responsible for indirect damages; liability capped at platform fees collected for the contract in question.`  

`---`

`## 10) Personal data`

`- Each party acts as **data controller** for their own purposes; platform acts as **processor** for hosting and technical execution.`
`- Data subject rights, security, retention: as per TrustMeBro Privacy Policy.`  

`---`

`## 11) Governing law, jurisdiction, language`

`- **Law**: {{GOVERNING_LAW}} (default: Switzerland).`
`- **Jurisdiction**: {{JURISDICTION}} (default: Fribourg).`
`- **Language**: English; in case of multiple versions, the English version prevails (unless otherwise agreed).`  

`---`

`## 12) Electronic consent & evidence`

`- Parties accept **simple electronic signature** via TrustMeBro app.`
`- **Timestamp** and **hash** of the generated PDF are stored.`
`- Proof includes: metadata (IP, user agent), audit logs, payment receipts.`
`- (Option v2) Qualified signature via eIDAS provider (e.g. Skribble / DocuSign).`  

`---`

`## 13) Signatures`

`**For the Brand**`
`Name: {{BRAND_REP_NAME}} — Title: {{BRAND_REP_TITLE}}`
`Date: {{SIGN_DATE_BRAND}}`
`Electronic signature: (reference) {{ESIGN_REF_BRAND}}`

`**For the Creator**`
`Name: {{CREATOR_NAME}}`
`Date: {{SIGN_DATE_CREATOR}}`
`Electronic signature: (reference) {{ESIGN_REF_CREATOR}}`

`---`

`### Annex A — Detailed brief / storyboard (optional)`  
`{{ANNEX_BRIEF}}`

`### Annex B — Assets & guidelines (logos, fonts, tone of voice)`  
`{{ANNEX_ASSETS}}`

`### Annex C — Financial details (fees, VAT, IBAN if needed)`  
`{{ANNEX_FINANCE}}`  
`"""`

`contract_path_en = "/mnt/data/trustmebro_contract_template_en_v1.md"`

`with open(contract_path_en, "w", encoding="utf-8") as f:`  
    `f.write(contract_content_en)`

`contract_path_en`

Result  
'/mnt/data/trustmebro\_contract\_template\_en\_v1.md'

Voilà la version anglaise du contrat modèle :

📄 Contract template (EN) — TrustMeBro v1

Veux-tu que je passe maintenant à **\#3 – squelette de tests E2E avec Playwright** ?

##### **You said:**

oui

###### **ChatGPT said:**

Analyzed  
Always show details  
`# Create a Playwright E2E test skeleton for TrustMeBro (TypeScript)`  
`import os, json, textwrap, zipfile, pathlib`

`base = "/mnt/data/trustmebro-playwright-e2e"`  
`os.makedirs(base, exist_ok=True)`  
`os.makedirs(f"{base}/tests", exist_ok=True)`  
`os.makedirs(f"{base}/fixtures", exist_ok=True)`  
`os.makedirs(f"{base}/utils", exist_ok=True)`

`package_json = {`  
  `"name": "trustmebro-e2e",`  
  `"private": True,`  
  `"type": "module",`  
  `"scripts": {`  
    `"test": "playwright test",`  
    `"test:ui": "playwright test --ui",`  
    `"codegen": "playwright codegen http://localhost:3000",`  
    `"show-report": "playwright show-report",`  
    `"format": "prettier --write ."`  
  `},`  
  `"devDependencies": {`  
    `"@playwright/test": "^1.45.0",`  
    `"prettier": "^3.3.0",`  
    `"ts-node": "^10.9.2",`  
    `"typescript": "^5.5.0",`  
    `"zod": "^3.23.8"`  
  `}`  
`}`

`playwright_config = """import { defineConfig, devices } from '@playwright/test';`

`export default defineConfig({`  
  `testDir: './tests',`  
  `fullyParallel: true,`  
  `forbidOnly: !!process.env.CI,`  
  `retries: process.env.CI ? 2 : 0,`  
  `workers: process.env.CI ? 2 : undefined,`  
  `reporter: [['html', { open: 'never' }], ['list']],`  
  `use: {`  
    `baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',`  
    `trace: 'on-first-retry',`  
    `screenshot: 'only-on-failure',`  
    `video: 'retain-on-failure',`  
  `},`  
  `projects: [`  
    `{`  
      `name: 'chromium',`  
      `use: { ...devices['Desktop Chrome'] },`  
    `},`  
    `{`  
      `name: 'firefox',`  
      `use: { ...devices['Desktop Firefox'] },`  
    `},`  
    `{`  
      `name: 'webkit',`  
      `use: { ...devices['Desktop Safari'] },`  
    `},`  
  `],`  
`});`  
`"""`

`readme = """# TrustMeBro — E2E Tests (Playwright, TS)`

`This is a ready-to-run skeleton for end-to-end testing the TrustMeBro web app.`

`## Prerequisites`  
`- Node 18+`  
``- App running locally at `http://localhost:3000` (override with `E2E_BASE_URL`)``  
``- Test users seeded (see `.env.example`)``

`## Install & run`  
```` ```bash ````  
`npm i`  
`npx playwright install`  
`E2E_BASE_URL=http://localhost:3000 npm test`  
`npm run show-report`

## **Test strategy (MVP)**

* **Happy path**: brand proposes → creator accepts → both fund → submit → approve → payout

* **Cancellation**: mutual cancel before submission

* **Expiration**: creator misses deadline → auto refund budget, forfeit deposit

* **Dispute**: open dispute and resolve by admin (released/refunded/split)

* **Payments/webhooks**: idempotency and state transitions

## **Conventions**

* Add `data-testid` attributes in app UI (stable selectors)

* Use **fixtures** for test users and contract data

* Keep time-based flows controllable (feature flag / test endpoint to fast-forward)

* External calls (PSP/webhooks) should have **sandbox/mocks** in test env

## **Structure**

Always show details  
`fixtures/`  
  `users.ts`  
  `contracts.ts`  
`tests/`  
  `auth.spec.ts`  
  `contract-happy-path.spec.ts`  
  `cancellation.spec.ts`  
  `expiration.spec.ts`  
  `dispute.spec.ts`  
  `payments-webhook.spec.ts`  
`utils/`  
  `selectors.ts`  
  `api.ts`  
`playwright.config.ts`  
`package.json`  
`.env.example`

"""

env\_example \= """\# E2E environment example  
 E2E\_BASE\_URL=<http://localhost:3000>

# **Seeded brand user**

E2E\_BRAND\_EMAIL=<brand@example.com>  
 E2E\_BRAND\_PASSWORD=Passw0rd\!

# **Seeded creator user**

E2E\_CREATOR\_EMAIL=<creator@example.com>  
 E2E\_CREATOR\_PASSWORD=Passw0rd\!

# **Seeded admin user**

E2E\_ADMIN\_EMAIL=<admin@example.com>  
 E2E\_ADMIN\_PASSWORD=Passw0rd\!  
 """

selectors\_ts \= """// Centralize stable selectors used in tests.  
 export const s \= {  
 // Auth  
 signInEmail: '\[data-testid="auth-email"\]',  
 signInPassword: '\[data-testid="auth-password"\]',  
 signInSubmit: '\[data-testid="auth-submit"\]',

// Dashboard  
 dashboardCard: (name: string) \=\> `[data-testid=\"dashboard-${'{'}name{'}'}\"]`,

// Contract wizard  
 createContractBtn: '\[data-testid="create-contract"\]',  
 contractTitle: '\[data-testid="contract-title"\]',  
 contractBrief: '\[data-testid="contract-brief"\]',  
 contractPlatform: '\[data-testid="contract-platform"\]',  
 contractHashtags: '\[data-testid="contract-hashtags"\]',  
 contractBudget: '\[data-testid="contract-budget"\]',  
 contractCreatorDeposit: '\[data-testid="contract-creator-deposit"\]',  
 contractBrandDeposit: '\[data-testid="contract-brand-deposit"\]',  
 contractDeadline: '\[data-testid="contract-deadline"\]',  
 contractNext: '\[data-testid="contract-next"\]',  
 contractSubmit: '\[data-testid="contract-submit"\]',

// Funding  
 fundBrandBudget: '\[data-testid="fund-brand-budget"\]',  
 fundBrandDeposit: '\[data-testid="fund-brand-deposit"\]',  
 fundCreatorDeposit: '\[data-testid="fund-creator-deposit"\]',  
 fundStatus: '\[data-testid="fund-status"\]',

// Submission  
 submitUrl: '\[data-testid="submission-url"\]',  
 submitScreenshotUpload: '\[data-testid="submission-upload"\]',  
 submitSend: '\[data-testid="submission-send"\]',

// Review  
 reviewApprove: '\[data-testid="review-approve"\]',  
 reviewRevise: '\[data-testid="review-revise"\]',  
 reviewComment: '\[data-testid="review-comment"\]',

// Cancellation & dispute  
 cancelRequest: '\[data-testid="cancel-request"\]',  
 cancelConfirm: '\[data-testid="cancel-confirm"\]',  
 disputeOpen: '\[data-testid="dispute-open"\]',  
 disputeReason: '\[data-testid="dispute-reason"\]',  
 adminResolveReleased: '\[data-testid="admin-resolve-released"\]',  
 adminResolveRefunded: '\[data-testid="admin-resolve-refunded"\]',  
 adminResolveSplit: '\[data-testid="admin-resolve-split"\]',

// Money / status  
 statusPill: (state: string) \=\> `[data-testid=\"state-${'{'}state{'}'}\"]`,  
 amount: (key: string) \=\> `[data-testid=\"amount-${'{'}key{'}'}\"]`  
 };  
 """

api\_ts \= """import { expect, request } from '@playwright/test';

/\*\* Simple helper to call backend test endpoints or public APIs. \*/  
 export async function api(baseURL: string) {  
 const ctx \= await request.newContext({ baseURL });  
 return {  
 ctx,  
 async resetDb() {  
 const r \= await ctx.post('/api/test/reset');  
 expect(r.ok()).toBeTruthy();  
 },  
 async seedUsers() {  
 const r \= await ctx.post('/api/test/seed-users');  
 expect(r.ok()).toBeTruthy();  
 return r.json();  
 },  
 async fastForward(hours: number) {  
 const r \= await ctx.post('/api/test/fast-forward', { data: { hours } });  
 expect(r.ok()).toBeTruthy();  
 },  
 async simulateWebhook(event: any) {  
 const r \= await ctx.post('/webhooks/psp', { data: event });  
 expect(r.ok()).toBeTruthy();  
 }  
 }  
 }  
 """

fixtures\_users\_ts \= """export const brand \= {  
 email: process.env.E2E\_BRAND\_EMAIL\!,  
 password: process.env.E2E\_BRAND\_PASSWORD\!,  
 };

export const creator \= {  
 email: process.env.E2E\_CREATOR\_EMAIL\!,  
 password: process.env.E2E\_CREATOR\_PASSWORD\!,  
 };

export const admin \= {  
 email: process.env.E2E\_ADMIN\_EMAIL\!,  
 password: process.env.E2E\_ADMIN\_PASSWORD\!,  
 };  
 """

fixtures\_contracts\_ts \= """export const basicContract \= {  
 title: 'Tripod promo — TikTok short',  
 brief: 'Show the tripod, highlight stability & weight; include CTA link',  
 platform: 'tiktok',  
 hashtags: \['\#tripod', '\#golflife'\],  
 budgetCents: 60000,  
 creatorDepositCents: 10000,  
 brandDepositCents: 5000,  
 deadlineDaysFromNow: 7,  
 submissionUrl: '<https://www.tiktok.com/@creator/video/1234567890>'  
 };  
 """

auth\_spec \= """import { test, expect } from '@playwright/test';  
 import { s } from '../utils/selectors';  
 import { brand } from '../fixtures/users';

test.describe('Auth', () \=\> {  
 test('Sign in as brand', async ({ page }) \=\> {  
 await page.goto('/signin');  
 await page.fill(s.signInEmail, brand.email);  
 await page.fill(s.signInPassword, brand.password);  
 await page.click(s.signInSubmit);  
 await expect(page).toHaveURL(/dashboard/);  
 await expect(page.locator(s.dashboardCard('inprogress'))).toBeVisible();  
 });  
 });  
 """

happy\_path\_spec \= """import { test, expect } from '@playwright/test';  
 import { s } from '../utils/selectors';  
 import { brand, creator } from '../fixtures/users';  
 import { basicContract } from '../fixtures/contracts';  
 import { api } from '../utils/api';

test.describe('Contract happy path', () \=\> {  
 test.beforeEach(async ({ baseURL }) \=\> {  
 const a \= await api(baseURL\!);  
 await a.resetDb();  
 await a.seedUsers();  
 });

test('brand→creator funding→submit→approve→payout', async ({ page, baseURL, browser }) \=\> {  
 // Brand creates contract  
 await page.goto('/signin');  
 await page.fill(s.signInEmail, brand.email);  
 await page.fill(s.signInPassword, brand.password);  
 await page.click(s.signInSubmit);

Always show details  
`await page.click(s.createContractBtn);`  
`await page.fill(s.contractTitle, basicContract.title);`  
`await page.fill(s.contractBrief, basicContract.brief);`  
`await page.selectOption(s.contractPlatform, basicContract.platform);`  
`await page.fill(s.contractHashtags, basicContract.hashtags.join(','));`  
`await page.fill(s.contractBudget, (basicContract.budgetCents/100).toString());`  
`await page.fill(s.contractCreatorDeposit, (basicContract.creatorDepositCents/100).toString());`  
`await page.fill(s.contractBrandDeposit, (basicContract.brandDepositCents/100).toString());`  
`// naive: deadline today + 7`  
`const deadline = new Date(Date.now()+ basicContract.deadlineDaysFromNow*24*3600*1000).toISOString().slice(0,16);`  
`await page.fill(s.contractDeadline, deadline);`  
`await page.click(s.contractSubmit);`

`// Brand funds budget + deposit`  
`await page.click(s.fundBrandBudget);`  
`await page.click(s.fundBrandDeposit);`  
`await expect(page.locator(s.fundStatus)).toContainText('brand funded');`

`// Creator accepts & funds deposit`  
`const ctx2 = await browser.newContext();`  
`const page2 = await ctx2.newPage();`  
`await page2.goto('/signin');`  
`await page2.fill(s.signInEmail, creator.email);`  
`await page2.fill(s.signInPassword, creator.password);`  
`await page2.click(s.signInSubmit);`

`// Accept`  
`await page2.click('[data-testid=\"accept-contract\"]');`  
`await page2.click(s.fundCreatorDeposit);`  
`await expect(page2.locator(s.fundStatus)).toContainText('all funded');`

`// Submit`  
`await page2.fill(s.submitUrl, basicContract.submissionUrl);`  
`await page2.setInputFiles(s.submitScreenshotUpload, 'tests/assets/sample-screenshot.png');`  
`await page2.click(s.submitSend);`  
`await expect(page2.locator(s.statusPill('UnderReview'))).toBeVisible();`

`// Brand approves`  
`await page.bringToFront();`  
`await page.click(s.reviewApprove);`  
`await expect(page.locator(s.statusPill('Released'))).toBeVisible();`

`// Money assertions (UI shows computed amounts)`  
`await expect(page.locator(s.amount('payout-creator'))).toContainText('CHF');`

});  
 });  
 """

cancellation\_spec \= """import { test, expect } from '@playwright/test';  
 import { s } from '../utils/selectors';

test('Mutual cancellation before submission', async ({ page }) \=\> {  
 // assumes contract in Accepted state  
 await page.click(s.cancelRequest);  
 // other party confirms (would be separate session in real test)  
 await page.click(s.cancelConfirm);  
 await expect(page.locator(s.statusPill('Cancelled'))).toBeVisible();  
 });  
 """

expiration\_spec \= """import { test, expect } from '@playwright/test';  
 import { api } from '../utils/api';  
 import { s } from '../utils/selectors';

test('Expiration without submission refunds budget and forfeits deposit', async ({ page, baseURL }) \=\> {  
 const a \= await api(baseURL\!);  
 // fast-forward beyond deadline  
 await a.fastForward(72);  
 await page.reload();  
 await expect(page.locator(s.statusPill('Expired'))).toBeVisible();  
 // UI should reflect refunds/confiscation  
 await expect(page.locator(s.amount('brand-refund'))).toBeVisible();  
 await expect(page.locator(s.amount('creator-deposit-forfeit'))).toBeVisible();  
 });  
 """

dispute\_spec \= """import { test, expect } from '@playwright/test';  
 import { s } from '../utils/selectors';

test('Dispute and admin resolution', async ({ page }) \=\> {  
 await page.click(s.disputeOpen);  
 await page.fill(s.disputeReason, 'Content does not meet brief');  
 // Admin resolves (released/refunded/split) \- simplified same session  
 await page.click(s.adminResolveSplit);  
 await expect(page.locator(s.statusPill('AdminResolved'))).toBeVisible();  
 });  
 """

payments\_webhook\_spec \= """import { test, expect } from '@playwright/test';  
 import { api } from '../utils/api';

test('Webhook idempotency and state updates', async ({ baseURL }) \=\> {  
 const a \= await api(baseURL\!);  
 const payload \= { type: 'payment\_intent.succeeded', data: { object: { id: 'pi\_test\_123' }}};  
 // first call ok  
 await a.simulateWebhook(payload);  
 // second call should be idempotent and still ok  
 await a.simulateWebhook(payload);  
 });  
 """

# **Write files**

with open(f"{base}/package.json", "w", encoding="utf-8") as f:  
 json.dump(package\_json, f, indent=2)

with open(f"{base}/playwright.config.ts", "w", encoding="utf-8") as f:  
 f.write(playwright\_config)

with open(f"{base}/README.md", "w", encoding="utf-8") as f:  
 f.write(readme)

with open(f"{base}/.env.example", "w", encoding="utf-8") as f:  
 f.write(env\_example)

with open(f"{base}/utils/selectors.ts", "w", encoding="utf-8") as f:  
 f.write(selectors\_ts)

with open(f"{base}/utils/api.ts", "w", encoding="utf-8") as f:  
 f.write(api\_ts)

with open(f"{base}/fixtures/users.ts", "w", encoding="utf-8") as f:  
 f.write(fixtures\_users\_ts)

with open(f"{base}/fixtures/contracts.ts", "w", encoding="utf-8") as f:  
 f.write(fixtures\_contracts\_ts)

# **create a placeholder asset**

assets\_dir \= f"{base}/tests/assets"  
 os.makedirs(assets\_dir, exist\_ok=True)  
 with open(f"{assets\_dir}/sample-screenshot.png", "wb") as f:  
 f.write(b"\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\rIHDR\\x00\\x00\\x00\\x08\\x00\\x00\\x00\\x08\\x08\\x06\\x00\\x00\\x00\\xc4\\x0f\\xbe\\x8b\\x00\\x00\\x00\\x0cIDATx\\x9cc`\x18\x05\xa3`\\x14\\x8c\\x02\\x00\\x06\\x0c\\x02\\x01\\xd9\\xf0\\xb8\\x1b\\x00\\x00\\x00\\x00IEND\\xaeB\`\\x82")

with open(f"{base}/tests/auth.spec.ts", "w", encoding="utf-8") as f:  
 f.write(auth\_spec)

with open(f"{base}/tests/contract-happy-path.spec.ts", "w", encoding="utf-8") as f:  
 f.write(happy\_path\_spec)

with open(f"{base}/tests/cancellation.spec.ts", "w", encoding="utf-8") as f:  
 f.write(cancellation\_spec)

with open(f"{base}/tests/expiration.spec.ts", "w", encoding="utf-8") as f:  
 f.write(expiration\_spec)

with open(f"{base}/tests/dispute.spec.ts", "w", encoding="utf-8") as f:  
 f.write(dispute\_spec)

with open(f"{base}/tests/payments-webhook.spec.ts", "w", encoding="utf-8") as f:  
 f.write(payments\_webhook\_spec)

# **Zip everything for easy download**

zip\_path \= "/mnt/data/trustmebro-playwright-e2e.zip"  
 with zipfile.ZipFile(zip\_path, "w", zipfile.ZIP\_DEFLATED) as z:  
 for p in pathlib.Path(base).rglob("\*"):  
 z.write(p, arcname=p.relative\_to("/mnt/data"))

(zip\_path, base)

Always show details  
Result  
('/mnt/data/trustmebro-playwright-e2e.zip',  
 '/mnt/data/trustmebro-playwright-e2e')

Parfait. Voici le **squelette Playwright E2E (TypeScript)** prêt à brancher sur ton app :

* 📦 **ZIP complet** : trustmebro-playwright-e2e.zip

* 📁 Dossier : `sandbox:/mnt/data/trustmebro-playwright-e2e`

Contenu clé :

* `playwright.config.ts` (multi-navigateurs, baseURL, traces/screenshots)

* `tests/`

  * `auth.spec.ts`

  * `contract-happy-path.spec.ts` (flux complet jusqu'au payout)

  * `cancellation.spec.ts`

  * `expiration.spec.ts`

  * `dispute.spec.ts`

  * `payments-webhook.spec.ts` (idempotence & transitions)

* `fixtures/` (comptes & contrats types), `utils/` (sélecteurs & mini-client API)

* `.env.example`, `README.md`

Instructions rapides :

`cd trustmebro-playwright-e2e`  
`npm i`  
`npx playwright install`  
`E2E_BASE_URL=http://localhost:3000 npm test`  
`npm run show-report`

⚠️ Pour que ça tourne out-of-the-box, prévois dans ton app des endpoints test (protégés par un flag env) :

* `POST /api/test/reset` → reset DB

* `POST /api/test/seed-users` → crée `brand@example.com`, `creator@example.com`, `admin@example.com`

* `POST /api/test/fast-forward` → avance le temps (ou monte une horloge simulée côté serveur)

* `POST /webhooks/psp` → sandbox webhook PSP (retour 200 \+ idempotency)

Tu veux que je passe à **\#4 – checklist DevOps (envs, secrets, CI/CD Vercel \+ AWS, webhooks, sécurité)** ou préfères-tu que je te génère **les modèles d'e-mails transactionnels** d'abord ?

##### **You said:**

oui

###### **ChatGPT said:**

Parfait — voici **\#4 : la checklist DevOps & sécurité** pour TrustMeBro (MVP web app). C'est concret, actionnable, et prêt à coller dans tes docs internes.

# **Envs & secrets**

## **Environnements**

* **local** (dev)

* **preview** (PRs / branches) — Vercel previews

* **staging** (pré-prod, sandbox PSP)

* **prod** (PSP live)

## **Variables (.env)**

`# App`  
`APP_URL=https://trustmebro.app`  
`NEXT_PUBLIC_APP_NAME=TrustMeBro`  
`NODE_ENV=production`

`# Auth`  
`AUTH_PROVIDER=nextauth`  
`NEXTAUTH_URL=${APP_URL}`  
`NEXTAUTH_SECRET=...`

`# DB`  
`DATABASE_URL=postgresql://user:pass@host:5432/trustmebro`  
`DATABASE_POOL_MAX=10`

`# Storage`  
`AWS_REGION=eu-central-1`  
`S3_BUCKET=trustmebro-prod`  
`S3_SIGNED_URL_TTL=900`

`# Emails`  
`EMAIL_PROVIDER=resend`  
`RESEND_API_KEY=...`

`# PSP (Stripe ou MangoPay)`  
`PSP=stripe`  
`STRIPE_SECRET_KEY=sk_live_...`  
`STRIPE_PUBLISHABLE_KEY=pk_live_...`  
`STRIPE_WEBHOOK_SECRET=whsec_...`  
`STRIPE_CONNECT_TYPE=standard`

`# Webhooks`  
`WEBHOOK_SIGNING_SECRET=whsig_...  # pour signer les webhooks sortants internes si besoin`

`# Observabilité`  
`SENTRY_DSN=...`  
`OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp.eu.myvendor.com`  
`OTEL_SERVICE_NAME=trustmebro-app`  
`LOG_LEVEL=info`

`# Security`  
`RATE_LIMIT_WINDOW_MS=60000`  
`RATE_LIMIT_MAX=120`

`# Feature flags`  
`FEATURE_TEST_ENDPOINTS=false`  
`AUTO_APPROVE_HOURS=48`

**Staging** : mêmes clés mais sandbox PSP (ex. `sk_test_...`, `whsec_test...`), buckets S3 dédiés, URL staging.

# **Secrets & gestion des clés**

* **Store** : Vercel Project → Environment Variables (preview/staging/prod), **AWS Secrets Manager** pour les workers/cron.

* **Rotation** : PSP & SMTP tous les 90 jours (calendrier).

* **Accès** : principe du moindre privilège (IAM), pas de secrets en clair dans Git, audit activé.

# **Base de données & migrations**

* **PostgreSQL** (RDS/Aurora Serverless v2, Multi-AZ, storage autoscaling).

* **Migrations** : Prisma `prisma migrate deploy` en CI/CD (staging → prod).

* **Backups** : snapshots journaliers, rétention 14–30j, restauration testée mensuellement.

* **Maintenance** : auto-vacuum ON, pgbouncer (facultatif) si trafic élevé.

# **Stockage fichiers (captures, PDFs)**

* **S3 privé** \+ **CloudFront**.

* Upload via **URL signées** (TTL court).

* **Encryption** at rest (SSE-S3/KMS) & in transit.

* Lifecycle : déplacer en S3 IA après 30j, supprimer après 365j (configurable).

# **CI/CD (exemple GitHub Actions)**

* **Triggers** : PR → tests \+ build \+ lint ; merge → déploiement **staging** ; tag `v*` → **prod**.

* **Étapes** :

  1. `npm ci`

  2. Lint/Typecheck (`eslint`, `tsc`)

  3. Tests unitaires (`vitest/jest`)

  4. Tests E2E Playwright (sur staging ephemeral si possible)

  5. `prisma migrate deploy` (staging/prod)

  6. Build & deploy (Vercel CLI ou GitHub→Vercel Integration)

  7. Run post-deploy checks (health, DB connections, webhooks reachable)

### **Workflow minimal (YAML)**

`name: ci`  
`on:`  
  `pull_request:`  
  `push:`  
    `branches: [main]`  
`jobs:`  
  `test:`  
    `runs-on: ubuntu-latest`  
    `steps:`  
      `- uses: actions/checkout@v4`  
      `- uses: actions/setup-node@v4`  
        `with: { node-version: 20 }`  
      `- run: npm ci`  
      `- run: npm run lint && npm run typecheck`  
      `- run: npm run test:unit`  
  `deploy-staging:`  
    `if: github.ref == 'refs/heads/main'`  
    `needs: [test]`  
    `runs-on: ubuntu-latest`  
    `steps:`  
      `- uses: actions/checkout@v4`  
      `- run: npm ci && npx prisma migrate deploy`  
      `- run: npx vercel deploy --prod=false --token=${{ secrets.VERCEL_TOKEN }}`  
  `deploy-prod:`  
    `if: startsWith(github.ref, 'refs/tags/v')`  
    `needs: [test]`  
    `runs-on: ubuntu-latest`  
    `steps:`  
      `- uses: actions/checkout@v4`  
      `- run: npm ci && npx prisma migrate deploy`  
      `- run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}`

# **Vercel (front \+ API Next.js)**

* **Project** relié à GitHub, previews automatiques sur PR.

* **Env Vars** : définir Preview/Staging/Prod distincts.

* **Domains** : `app.trustmebro.com` (prod), `staging.trustmebro.com`.

* **Edge** : active les **Edge Functions** seulement si besoin (webhooks: préférer Serverless Functions).

* **Headers de sécurité** via `next.config.js` : CSP, HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy.

### **Exemple headers (Next)**

`// next.config.js`  
`const securityHeaders = [`  
  `{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },`  
  `{ key: 'X-Content-Type-Options', value: 'nosniff' },`  
  `{ key: 'X-Frame-Options', value: 'DENY' },`  
  `{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },`  
  `{ key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=()' },`  
  `// CSP minimale (adapter les origins)`  
  `{ key: 'Content-Security-Policy', value:`  
    `"default-src 'self'; script-src 'self' 'unsafe-inline' vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://api.stripe.com https://*.sentry.io; frame-src https://js.stripe.com; object-src 'none'; base-uri 'self'; form-action 'self';" },`  
`];`  
`module.exports = {`  
  `async headers() { return [{ source: '/(.*)', headers: securityHeaders }]; },`  
`};`

# **Webhooks PSP (Stripe)**

* **Endpoints** :

  * `POST /webhooks/psp` (staging/prod)

* **Valider la signature** via `STRIPE_WEBHOOK_SECRET`.

* **Idempotency** applicative (table `AuditLog` / clé évènement).

* **Événements clés** :

  * `payment_intent.succeeded/failed` → maj Funding

  * `account.updated` (Connect) → statut KYC

  * `transfer.paid/failed` → maj Payout

* **Alerting** : toute 5xx sur endpoint \= alerte (Pager/Sentry).

# **Observabilité**

## **Logs & traces**

* **Sentry** : erreurs front & API (source maps), release tagging.

* **OpenTelemetry** : traces HTTP → exporter OTLP (collector managé ou vendor).

* **Correlations** : ajouter `contract_id`, `user_id`, `event_id` dans logs.

## **Metrics (SLOs)**

* **API** : p95 \< 400ms, error rate \< 1%

* **Webhooks** : 2xx \> 99.9%

* **Job payouts** : délai médian \< 5 min après `Released`

* **DB** : CPU \< 60%, connexions \< 80% max

# **Sécurité applicative**

## **AuthZ / RBAC**

* Middlewares par route (role=brand|creator|admin).

* Pas d'accès cross-tenant (brand/creator ne voient que leurs contrats).

## **Anti-abus**

* **Rate limiting** (IP \+ user) → `RATE_LIMIT_MAX`/`WINDOW_MS`.

* **Bot protection** : hCaptcha/Turnstile pour endpoints sensibles (auth, création contrat).

* **Validation stricte** (Zod) et **output encoding**.

## **Données & conformité**

* **GDPR/LPD** : registre de traitements, DPA avec PSP, emails provider.

* **Droit à l'effacement** : marquage `soft-delete` \+ purge asynchrone.

* **Chiffrement** : TLS partout, S3 chiffré, DB col/row-level si PII sensibles.

# **Monitoring & alerting**

* **Healthchecks** : `/api/health` (DB ping \+ S3 HEAD).

* **Probes** : UptimeRobot/Betterstack (staging & prod).

* **Alertes** :

  * Taux 5xx \> 2% (5 min)

  * Webhooks 5xx \> 0 sur 5 min

  * Jobs payouts en file \> 10 min

  * DB connections \> 80%

# **Jobs & tâches asynchrones**

* **Queue** :

  * Simple (MVP) : Route Handler \+ cron Vercel \+ backoff (limité).

  * Reco : **AWS SQS \+ Lambda** pour `payouts`, `auto-approve`, `emails`.

* **Planificateur** : EventBridge (cron) — ex. check auto-approve toutes les 5 min.

# **Runbooks (opérations)**

## **Incident Webhooks (paiement non reflété)**

1. Vérifier Sentry pour erreurs `webhooks/psp`.

2. Rejouer l'évènement Stripe Dashboard.

3. Si toujours en échec, forcer l'état via **Admin console** \+ consigner **AuditLog**.

4. Ouvrir ticket PSP si divergence.

## **Restauration DB**

1. Isoler incident (read-only).

2. Restaurer snapshot RDS vers instance temporaire.

3. Diff & apply (pg\_dump/pg\_restore) ou basculer (si perte totale).

4. Post-mortem.

## **Clés compromises**

1. Révoquer clé dans le provider.

2. Rotation dans Secrets Manager / Vercel.

3. Invalider sessions (si Auth compromise).

4. Audit & post-mortem.

# **Terraform/CDK (esquisse)**

* **AWS** : VPC, RDS Postgres, S3, CloudFront, Secrets Manager, SQS, EventBridge, IAM.

* **Outputs** : ARNs/URLs → injectées dans envs Vercel/GitHub.

* **Policies minimales** pour Lambdas (S3 read/write limité aux prefixes).

# **Check final avant go-live**

* **HTTPS** \+ HSTS \+ CSP en place

* **Backups DB** testés

* **Webhooks** validés (signature \+ idempotency)

* **Payout** sandbox → succès bout-en-bout

* **Admin console** opérationnelle (force release/refund)

* **Page statut** & **contact support**

* **Politique de confidentialité** & **CGU** publiées

* **Runbooks** rédigés & on-call défini

---

Si tu veux, je peux te générer :

* un **`next.config.js`** complet avec headers \+ i18n,

* un **Dockerfile** \+ compose pour staging self-hosted,

* un **Terraform starter** (S3, CloudFront, RDS, IAM).  
   Tu me dis ce qui t'arrange et je te le produis direct.

# **10) Intégration Paiement/Escrow (v1 pragmatique) — EU & US**

* Stripe Connect (Standard) pour EU & US.
* Dépôts = PaymentIntents capturés, remboursables selon issue.
* Budget = capture à l'approbation (autorisation ~7j, reconfirmation si >7j).
* Payout = Transfer vers compte connecté (moins les frais).
* KYC/KYB via Stripe. US: SSN/EIN lorsque requis.
* Devises supportées: CHF/EUR (EU), USD (US). `Contract.currency` pilote les montants.
* Alternative MangoPay (UE) : wallets escrow natifs.

# **11) Sécurité, conformité, légal — EU & US**

* Signatures électroniques (simple) v1 ; eIDAS (AdES) v2.
* EU/CH: GDPR/LPD (DPA, droits, effacement). US: CCPA/CPRA (opt‑out, droits d'accès/suppression), bannière cookies.
* FTC (US): disclosures #ad/#sponsored exigés dans le brief et la soumission.
* Sécurité: 2FA, rate‑limit, CSP/HSTS, RBAC, audit logs, S3 privé.
* Juridique: UE par défaut CH/FR; US: État (Delaware/NY) à confirmer. Fiscalité 1099‑K via PSP si applicable.

# **12) Règles de libération/remboursement — multi‑région**

* Payout créateur = budget – fee + restitution dépôt (devise du contrat)
* Annulation/expiration/litige: règles identiques, paiements/restits dans la devise du contrat.
* Monnaies: CHF/EUR/USD, stockées en centimes (entiers).

... (le reste du document inchangé) ...
