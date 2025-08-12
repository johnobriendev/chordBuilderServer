/*
  Warnings:

  - Added the required column `squares` to the `chords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triangles` to the `chords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x_marks` to the `chords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chords" ADD COLUMN "x_marks" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "chords" ADD COLUMN "triangles" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "chords" ADD COLUMN "squares" JSONB NOT NULL DEFAULT '[]';
