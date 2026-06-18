-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('not_sent', 'sent', 'opened', 'rsvp_submitted', 'checked_in');

-- CreateTable
CREATE TABLE "guests" (
    "id" UUID NOT NULL,
    "invitation_id" UUID NOT NULL,
    "category_id" UUID,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "invitation_token" TEXT NOT NULL,
    "qr_code_token" TEXT NOT NULL,
    "status" "GuestStatus" NOT NULL DEFAULT 'not_sent',
    "max_guest_count" INTEGER NOT NULL DEFAULT 1,
    "opened_at" TIMESTAMP(3),
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guests_invitation_token_key" ON "guests"("invitation_token");

-- CreateIndex
CREATE UNIQUE INDEX "guests_qr_code_token_key" ON "guests"("qr_code_token");

-- CreateIndex
CREATE INDEX "guests_invitation_id_idx" ON "guests"("invitation_id");

-- CreateIndex
CREATE INDEX "guests_category_id_idx" ON "guests"("category_id");

-- CreateIndex
CREATE INDEX "guests_status_idx" ON "guests"("status");

-- CreateIndex
CREATE INDEX "guests_phone_idx" ON "guests"("phone");

-- CreateIndex
CREATE INDEX "guests_deleted_at_idx" ON "guests"("deleted_at");

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "guest_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
