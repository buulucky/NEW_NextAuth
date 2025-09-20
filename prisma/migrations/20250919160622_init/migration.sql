-- CreateTable
CREATE TABLE "public"."Employees" (
    "employee_id" SERIAL NOT NULL,
    "personal_id" TEXT NOT NULL,
    "prefix_th" TEXT NOT NULL,
    "first_name_th" TEXT NOT NULL,
    "last_name_th" TEXT NOT NULL,
    "prefix_en" TEXT,
    "first_name_en" TEXT,
    "last_name_en" TEXT,
    "birth_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_personal_id_key" ON "public"."Employees"("personal_id");
