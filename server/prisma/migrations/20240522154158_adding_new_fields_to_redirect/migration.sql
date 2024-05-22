/*
  Warnings:

  - You are about to drop the column `review` on the `Redirect` table. All the data in the column will be lost.
  - Added the required column `description` to the `Redirect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromDoctorId` to the `Redirect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Redirect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Redirect" DROP COLUMN "review",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "fromDoctorId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_fromDoctorId_fkey" FOREIGN KEY ("fromDoctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
