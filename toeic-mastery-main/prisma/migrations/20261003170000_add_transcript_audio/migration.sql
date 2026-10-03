-- CreateTable
CREATE TABLE "transcript_audio" (
    "id" UUID NOT NULL,
    "set_key" TEXT NOT NULL,
    "test_number" INTEGER NOT NULL,
    "part" INTEGER NOT NULL,
    "audio_url" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transcript_audio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transcript_audio_set_key_test_number_part_key" ON "transcript_audio"("set_key", "test_number", "part");
