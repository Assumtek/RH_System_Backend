-- AlterTable
ALTER TABLE "PresenceDay" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Sem informação',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Sem informação';
