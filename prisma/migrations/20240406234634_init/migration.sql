-- CreateTable
CREATE TABLE "Character" (
    "character_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("character_id")
);
