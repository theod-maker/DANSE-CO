-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "Homepage" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "PageTexts" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "Pricing" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "RegistrationInfo" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "ScheduleEntry" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "SiteInfo" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;
