/*
  Warnings:

  - You are about to drop the column `supplierId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_supplierId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `supplierId`;
