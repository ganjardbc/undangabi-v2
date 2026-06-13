-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('wedding', 'khitanan', 'birthday', 'graduation', 'seminar', 'gathering', 'custom');

-- CreateTable
CREATE TABLE "invitations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "theme_id" UUID,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "event_type" "EventType" NOT NULL DEFAULT 'wedding',
    "status" "InvitationStatus" NOT NULL DEFAULT 'draft',
    "cover_image_url" TEXT,
    "music_url" TEXT,
    "youtube_url" TEXT,
    "story" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "og_image_url" TEXT,
    "theme_config" JSONB,
    "section_visibility" JSONB,
    "published_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitations_slug_key" ON "invitations"("slug");

-- CreateIndex
CREATE INDEX "invitations_user_id_idx" ON "invitations"("user_id");

-- CreateIndex
CREATE INDEX "invitations_slug_idx" ON "invitations"("slug");

-- CreateIndex
CREATE INDEX "invitations_status_idx" ON "invitations"("status");

-- CreateIndex
CREATE INDEX "invitations_event_type_idx" ON "invitations"("event_type");

-- CreateIndex
CREATE INDEX "invitations_deleted_at_idx" ON "invitations"("deleted_at");

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "invitation_themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
