-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "company_id" INTEGER,
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."Division" (
    "division_id" SERIAL NOT NULL,
    "division_name" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("division_id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "department_id" SERIAL NOT NULL,
    "department_name" TEXT NOT NULL,
    "division_id" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "public"."Companies" (
    "company_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("company_id")
);

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Companies"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Department" ADD CONSTRAINT "Department_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "public"."Division"("division_id") ON DELETE RESTRICT ON UPDATE CASCADE;
