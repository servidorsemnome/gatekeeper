-- DropForeignKey
ALTER TABLE "Flow" DROP CONSTRAINT "Flow_grantId_fkey";

-- AlterTable
ALTER TABLE "Flow" ALTER COLUMN "grantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "Grant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
