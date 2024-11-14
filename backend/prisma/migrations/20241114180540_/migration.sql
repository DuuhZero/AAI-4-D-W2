/*
  Warnings:

  - You are about to drop the column `cnpj` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactInfo` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `cnpj`,
    DROP COLUMN `number`,
    ADD COLUMN `contactInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_email_key` ON `Supplier`(`email`);
