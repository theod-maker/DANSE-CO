-- CreateTable
CREATE TABLE "PageSeo" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "pages" JSONB NOT NULL,
    "publishedSnapshot" JSONB,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSeo_pkey" PRIMARY KEY ("id")
);
