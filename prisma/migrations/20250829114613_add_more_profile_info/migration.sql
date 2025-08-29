-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "searchable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "socialInstagram" TEXT,
ADD COLUMN     "socialLinkedIn" TEXT,
ADD COLUMN     "socialTikTok" TEXT,
ADD COLUMN     "socialTwitch" TEXT,
ADD COLUMN     "socialTwitter" TEXT,
ADD COLUMN     "socialYouTube" TEXT;
