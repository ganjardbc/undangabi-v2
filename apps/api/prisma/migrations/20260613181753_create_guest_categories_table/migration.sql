-- CreateTable
CREATE TABLE "guest_categories" (
    "id" UUID NOT NULL,
    "invitation_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "guest_categories_invitation_id_idx" ON "guest_categories"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "guest_categories_invitation_id_name_key" ON "guest_categories"("invitation_id", "name");

-- AddForeignKey
ALTER TABLE "guest_categories" ADD CONSTRAINT "guest_categories_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
