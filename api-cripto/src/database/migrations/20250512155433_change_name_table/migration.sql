/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "CryptoCurrency" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image" TEXT NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "high24h" DOUBLE PRECISION NOT NULL,
    "low24h" DOUBLE PRECISION NOT NULL,
    "high1h" DOUBLE PRECISION NOT NULL,
    "low1h" DOUBLE PRECISION NOT NULL,
    "signal" VARCHAR(1) NOT NULL,

    CONSTRAINT "CryptoCurrency_pkey" PRIMARY KEY ("id")
);
