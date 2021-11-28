/*
  Warnings:

  - You are about to drop the column `userId` on the `Attachment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attachment` DROP FOREIGN KEY `Attachment_userId_fkey`;

-- AlterTable
ALTER TABLE `Attachment` DROP COLUMN `userId`;
