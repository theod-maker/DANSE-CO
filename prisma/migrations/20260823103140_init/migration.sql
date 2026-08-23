-- CreateEnum
CREATE TYPE "DisciplineIcon" AS ENUM ('Zap', 'Star', 'Heart', 'Music', 'Users');

-- CreateTable
CREATE TABLE "Homepage" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroImageUrl" TEXT,
    "heroTagline" TEXT,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "aboutTitle" TEXT NOT NULL,
    "philosophyTitle" TEXT NOT NULL,
    "philosophyBlock1Label" TEXT NOT NULL,
    "philosophyBlock1Text" TEXT NOT NULL,
    "philosophyBlock2Label" TEXT NOT NULL,
    "philosophyBlock2Text" TEXT NOT NULL,
    "philosophyImageUrl" TEXT,
    "featuredVideoDescription" TEXT NOT NULL,
    "featuredImageUrl" TEXT,
    "featuredSectionLabel" TEXT,
    "servicesSectionTitle" TEXT NOT NULL,
    "servicesSectionSubtitle" TEXT NOT NULL,
    "servicesCard1Description" TEXT NOT NULL,
    "servicesCard1ImageUrl" TEXT,
    "servicesCard2Description" TEXT NOT NULL,
    "servicesCard2ImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homepage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "season" TEXT NOT NULL,
    "membershipFee" TEXT NOT NULL,
    "infoItems" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingRow" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "pricingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteInfo" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mailingAddress" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "twitterUrl" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "footerTagline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationInfo" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "permanence1Days" TEXT NOT NULL,
    "permanence1Hours" TEXT NOT NULL,
    "permanence1Venue" TEXT NOT NULL,
    "permanence2Days" TEXT NOT NULL,
    "permanence2Hours" TEXT NOT NULL,
    "permanence2Venue" TEXT NOT NULL,
    "requiredDocuments" TEXT[],
    "photoNote" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistrationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageTexts" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "planningSubtitle" TEXT NOT NULL,
    "disciplinesSubtitle" TEXT NOT NULL,
    "locationsSubtitle" TEXT NOT NULL,
    "contactSubtitle" TEXT NOT NULL,
    "instructorsSubtitle" TEXT NOT NULL,
    "pricingSubtitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageTexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "photoUrl" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleEntry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "venue" TEXT,
    "level" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "iconName" "DisciplineIcon" NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT[],
    "imageUrl" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amenities" TEXT[],
    "mapEmbedUrl" TEXT NOT NULL,
    "googleMapsUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "excerpt" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PricingRow_pricingId_displayOrder_idx" ON "PricingRow"("pricingId", "displayOrder");

-- CreateIndex
CREATE INDEX "Instructor_displayOrder_idx" ON "Instructor"("displayOrder");

-- CreateIndex
CREATE INDEX "ScheduleEntry_day_displayOrder_idx" ON "ScheduleEntry"("day", "displayOrder");

-- CreateIndex
CREATE INDEX "Discipline_displayOrder_idx" ON "Discipline"("displayOrder");

-- CreateIndex
CREATE INDEX "Venue_displayOrder_idx" ON "Venue"("displayOrder");

-- CreateIndex
CREATE INDEX "News_date_idx" ON "News"("date");

-- AddForeignKey
ALTER TABLE "PricingRow" ADD CONSTRAINT "PricingRow_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
