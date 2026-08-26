-- CreateTable
CREATE TABLE "ContentHistoryEntry" (
    "id" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "snapshot" JSONB,
    "adminUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentHistoryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContentHistoryEntry_contentType_entityId_createdAt_idx" ON "ContentHistoryEntry"("contentType", "entityId", "createdAt");
