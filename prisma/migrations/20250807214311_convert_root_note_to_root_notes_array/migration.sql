/*
  Warnings:

  - You are about to drop the column `root_note` on the `chords` table. All the data in the column will be lost.
  - Added the required column `root_notes` to the `chords` table without a default value. This is not possible if the table is not empty.

*/
-- Add the new root_notes column with a default empty array
ALTER TABLE "chords" ADD COLUMN "root_notes" JSONB NOT NULL DEFAULT '[]';

-- Convert existing single root notes to arrays
UPDATE "chords" 
SET "root_notes" = CASE 
  WHEN "root_note" IS NULL THEN '[]'::jsonb
  ELSE jsonb_build_array("root_note")
END;

-- Drop the old root_note column
ALTER TABLE "chords" DROP COLUMN "root_note";