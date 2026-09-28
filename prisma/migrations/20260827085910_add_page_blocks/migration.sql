-- AlterTable
ALTER TABLE "PageTexts" ADD COLUMN     "histoireSubtitle" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "PageBlock" (
    "id" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "fixedKey" TEXT,
    "content" JSONB,
    "publishedSnapshot" JSONB,
    "publishedAt" TIMESTAMP(3),
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageBlock_pageKey_displayOrder_idx" ON "PageBlock"("pageKey", "displayOrder");
