-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('brand', 'creator', 'admin');

-- CreateEnum
CREATE TYPE "public"."ContractState" AS ENUM ('Draft', 'Proposed', 'Accepted', 'Funded', 'InProgress', 'Submitted', 'UnderReview', 'RevisionsRequested', 'Released', 'Closed', 'Expired', 'Cancelled', 'Disputed', 'AdminResolved');

-- CreateEnum
CREATE TYPE "public"."FundingType" AS ENUM ('brand_budget', 'brand_deposit', 'creator_deposit');

-- CreateEnum
CREATE TYPE "public"."FundingStatus" AS ENUM ('pending', 'succeeded', 'failed');

-- CreateEnum
CREATE TYPE "public"."ReviewDecision" AS ENUM ('approve', 'revise');

-- CreateEnum
CREATE TYPE "public"."DisputeStatus" AS ENUM ('open', 'resolved');

-- CreateEnum
CREATE TYPE "public"."DisputeResolution" AS ENUM ('released', 'refunded', 'split');

-- CreateEnum
CREATE TYPE "public"."FeeKind" AS ENUM ('platform');

-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('CHF', 'EUR', 'USD');

-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('tiktok', 'instagram', 'youtube', 'other');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "role" "public"."Role" NOT NULL DEFAULT 'creator',
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "vatId" TEXT,
    "address" TEXT,
    "country" TEXT,
    "pspAccountId" TEXT,
    "kycStatus" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Contract" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "deliverableType" "public"."Platform" NOT NULL,
    "deliverableRequirements" JSONB NOT NULL,
    "hashtags" JSONB NOT NULL,
    "productName" TEXT NOT NULL,
    "productValueCents" INTEGER NOT NULL DEFAULT 0,
    "currency" "public"."Currency" NOT NULL DEFAULT 'CHF',
    "budgetCents" INTEGER NOT NULL,
    "creatorDepositCents" INTEGER NOT NULL DEFAULT 0,
    "brandDepositCents" INTEGER NOT NULL DEFAULT 0,
    "deadlineAt" TIMESTAMP(3) NOT NULL,
    "state" "public"."ContractState" NOT NULL DEFAULT 'Draft',
    "autoApproveAfterH" INTEGER NOT NULL DEFAULT 48,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContractEvent" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "actorId" TEXT,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Funding" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "type" "public"."FundingType" NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "pspPaymentIntentId" TEXT NOT NULL,
    "status" "public"."FundingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" "public"."Platform" NOT NULL,
    "postIdentifier" TEXT,
    "screenshots" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "decision" "public"."ReviewDecision" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dispute" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "openerId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "evidence" JSONB,
    "status" "public"."DisputeStatus" NOT NULL DEFAULT 'open',
    "resolution" "public"."DisputeResolution",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payout" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "pspTransferId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Fee" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "kind" "public"."FeeKind" NOT NULL DEFAULT 'platform',
    "baseAmountCents" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Contract_state_brandId_idx" ON "public"."Contract"("state", "brandId");

-- CreateIndex
CREATE INDEX "Contract_state_creatorId_idx" ON "public"."Contract"("state", "creatorId");

-- CreateIndex
CREATE INDEX "Contract_brandId_creatorId_idx" ON "public"."Contract"("brandId", "creatorId");

-- CreateIndex
CREATE INDEX "Contract_deadlineAt_idx" ON "public"."Contract"("deadlineAt");

-- CreateIndex
CREATE INDEX "ContractEvent_contractId_createdAt_idx" ON "public"."ContractEvent"("contractId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Funding_pspPaymentIntentId_key" ON "public"."Funding"("pspPaymentIntentId");

-- CreateIndex
CREATE INDEX "Funding_contractId_type_status_idx" ON "public"."Funding"("contractId", "type", "status");

-- CreateIndex
CREATE INDEX "Submission_contractId_createdAt_idx" ON "public"."Submission"("contractId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_contractId_createdAt_key" ON "public"."Submission"("contractId", "createdAt");

-- CreateIndex
CREATE INDEX "Review_contractId_createdAt_idx" ON "public"."Review"("contractId", "createdAt");

-- CreateIndex
CREATE INDEX "Dispute_contractId_status_idx" ON "public"."Dispute"("contractId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Payout_pspTransferId_key" ON "public"."Payout"("pspTransferId");

-- CreateIndex
CREATE INDEX "Payout_contractId_status_idx" ON "public"."Payout"("contractId", "status");

-- CreateIndex
CREATE INDEX "Fee_contractId_idx" ON "public"."Fee"("contractId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "public"."AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContractEvent" ADD CONSTRAINT "ContractEvent_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContractEvent" ADD CONSTRAINT "ContractEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Funding" ADD CONSTRAINT "Funding_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dispute" ADD CONSTRAINT "Dispute_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dispute" ADD CONSTRAINT "Dispute_openerId_fkey" FOREIGN KEY ("openerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payout" ADD CONSTRAINT "Payout_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payout" ADD CONSTRAINT "Payout_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Fee" ADD CONSTRAINT "Fee_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "public"."Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
