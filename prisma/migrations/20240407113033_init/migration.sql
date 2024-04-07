/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Character";

-- CreateTable
CREATE TABLE "characters" (
    "character_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("character_id")
);
