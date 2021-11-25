-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `serialCode` INTEGER NOT NULL,
    `isChief` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('ACTIVE', 'DEACTIVE', 'BANN') NOT NULL DEFAULT 'ACTIVE',
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `loginAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
