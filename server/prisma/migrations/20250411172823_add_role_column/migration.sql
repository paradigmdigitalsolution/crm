/*
  Warnings:

  - You are about to drop the column `cognitoId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamName]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Sales', 'ProjectManager', 'Production', 'Client', 'QA');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- DropIndex
DROP INDEX "User_cognitoId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cognitoId",
DROP COLUMN "teamId",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role",
ADD COLUMN     "teamName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamName_key" ON "Team"("teamName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamName_fkey" FOREIGN KEY ("teamName") REFERENCES "Team"("teamName") ON DELETE SET NULL ON UPDATE CASCADE;
