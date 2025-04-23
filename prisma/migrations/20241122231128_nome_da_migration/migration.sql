/*
  Warnings:

  - You are about to drop the column `Contrato` on the `User` table. All the data in the column will be lost.
  - Added the required column `CPF` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RG` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrato` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nascimento` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Contrato",
ADD COLUMN     "CPF" TEXT NOT NULL,
ADD COLUMN     "RG" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "contrato" TEXT NOT NULL,
ADD COLUMN     "nascimento" TEXT NOT NULL;
