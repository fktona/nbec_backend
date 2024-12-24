/*
  Warnings:

  - Added the required column `isApproved` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isExternal` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "isApproved" BOOLEAN NOT NULL,
ADD COLUMN     "isExternal" BOOLEAN NOT NULL;
