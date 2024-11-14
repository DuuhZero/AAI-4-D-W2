/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `supplier` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[cnpj]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `contactInfo`,
    ADD COLUMN `cnpj` INTEGER NOT NULL,
    MODIFY `phone` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_cnpj_key` ON `Supplier`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_phone_key` ON `Supplier`(`phone`);
