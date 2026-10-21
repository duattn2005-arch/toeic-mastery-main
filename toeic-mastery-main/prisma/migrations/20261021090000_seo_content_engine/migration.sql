-- CreateEnum
CREATE TYPE "SeoCompetitorStatus" AS ENUM ('PENDING', 'ANALYSING', 'ANALYSED', 'FAILED');

-- CreateEnum
CREATE TYPE "SeoTopicStatus" AS ENUM ('IDEA', 'WRITING', 'DRAFTED', 'PUBLISHED', 'REJECTED', 'FAILED');

-- CreateEnum
CREATE TYPE "BlogPostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "seo_competitor_pages" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "status" "SeoCompetitorStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT,
    "topic" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "summary" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "error" TEXT,
    "analysed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_competitor_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_topics" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "primary_keyword" TEXT NOT NULL,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "intent" TEXT,
    "angle" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "status" "SeoTopicStatus" NOT NULL DEFAULT 'IDEA',
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "seo_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primary_keyword" TEXT NOT NULL,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "summary" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" JSONB NOT NULL,
    "ads" JSONB,
    "cta_target" TEXT NOT NULL DEFAULT 'free_quiz',
    "word_count" INTEGER NOT NULL DEFAULT 0,
    "status" "BlogPostStatus" NOT NULL DEFAULT 'DRAFT',
    "topic_id" UUID,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "auto_enabled" BOOLEAN NOT NULL DEFAULT false,
    "auto_publish" BOOLEAN NOT NULL DEFAULT false,
    "drafts_per_run" INTEGER NOT NULL DEFAULT 1,
    "competitor_batch" INTEGER NOT NULL DEFAULT 5,
    "run_hour" INTEGER NOT NULL DEFAULT 7,
    "last_run_at" TIMESTAMP(3),
    "last_run_log" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seo_competitor_pages_url_key" ON "seo_competitor_pages"("url");

-- CreateIndex
CREATE INDEX "seo_competitor_pages_status_idx" ON "seo_competitor_pages"("status");

-- CreateIndex
CREATE INDEX "seo_topics_status_idx" ON "seo_topics"("status");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_topic_id_key" ON "blog_posts"("topic_id");

-- CreateIndex
CREATE INDEX "blog_posts_status_published_at_idx" ON "blog_posts"("status", "published_at");

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "seo_topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

