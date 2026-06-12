-- CreateTable
CREATE TABLE "placeholders" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placeholders_pkey" PRIMARY KEY ("id")
);
