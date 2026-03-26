/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Applications` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Applications" DROP CONSTRAINT "Applications_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Applications" DROP CONSTRAINT "Applications_userId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "CreatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CreatedAt",
DROP COLUMN "Phone",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "phone" VARCHAR(10) NOT NULL,
ADD COLUMN     "resumeurl" VARCHAR(5000),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "Applications";

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resumeurl" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application"("userId");

-- CreateIndex
CREATE INDEX "Application_jobId_idx" ON "Application"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_jobId_key" ON "Application"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
