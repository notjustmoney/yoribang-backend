-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarId_fkey` FOREIGN KEY (`avatarId`) REFERENCES `Attachment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
