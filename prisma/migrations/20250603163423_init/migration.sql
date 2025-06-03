-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "auth0_user_id" TEXT NOT NULL,
    "display_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chord_sheets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "grid_type" TEXT NOT NULL,
    "grid_rows" INTEGER NOT NULL,
    "grid_cols" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chord_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chords" (
    "id" TEXT NOT NULL,
    "sheet_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position_in_sheet" INTEGER NOT NULL,
    "num_strings" INTEGER NOT NULL,
    "num_frets" INTEGER NOT NULL,
    "fret_numbers" JSONB NOT NULL,
    "notes" JSONB NOT NULL,
    "open_strings" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sheet_permissions" (
    "id" TEXT NOT NULL,
    "sheet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "permission_level" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sheet_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_auth0_user_id_key" ON "users"("auth0_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sheet_permissions_sheet_id_user_id_key" ON "sheet_permissions"("sheet_id", "user_id");

-- AddForeignKey
ALTER TABLE "chord_sheets" ADD CONSTRAINT "chord_sheets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chords" ADD CONSTRAINT "chords_sheet_id_fkey" FOREIGN KEY ("sheet_id") REFERENCES "chord_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sheet_permissions" ADD CONSTRAINT "sheet_permissions_sheet_id_fkey" FOREIGN KEY ("sheet_id") REFERENCES "chord_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sheet_permissions" ADD CONSTRAINT "sheet_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
