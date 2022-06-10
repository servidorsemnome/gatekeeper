/*
  Warnings:

  - You are about to drop the column `uuid` on the `Flow` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Grant` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `Flow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `Grant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flow" DROP COLUMN "uuid",
ADD COLUMN     "nickname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Grant" DROP COLUMN "uuid",
ADD COLUMN     "nickname" TEXT NOT NULL;
