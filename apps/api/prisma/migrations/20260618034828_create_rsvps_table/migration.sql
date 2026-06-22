-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('attending', 'not_attending');

-- CreateTable
CREATE TABLE "rsvps" (
    "id" UUID NOT NULL,
    "guest_id" UUID NOT NULL,
    "invitation_id" UUID NOT NULL,
    "attendance_status" "AttendanceStatus" NOT NULL,
    "guest_count" INTEGER NOT NULL DEFAULT 1,
    "message" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rsvps_guest_id_key" ON "rsvps"("guest_id");

-- CreateIndex
CREATE INDEX "rsvps_invitation_id_idx" ON "rsvps"("invitation_id");

-- CreateIndex
CREATE INDEX "rsvps_attendance_status_idx" ON "rsvps"("attendance_status");

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
