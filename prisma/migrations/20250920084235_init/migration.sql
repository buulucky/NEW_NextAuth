-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ContractStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'TERMINATED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING',
    "company_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."divisions" (
    "division_id" SERIAL NOT NULL,
    "division_name" TEXT NOT NULL,

    CONSTRAINT "divisions_pkey" PRIMARY KEY ("division_id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "department_id" SERIAL NOT NULL,
    "department_name" TEXT NOT NULL,
    "division_id" INTEGER NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "public"."Companies" (
    "company_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "public"."employees" (
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

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "public"."positions" (
    "position_id" SERIAL NOT NULL,
    "position_name" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "public"."pos" (
    "po_id" SERIAL NOT NULL,
    "po_number" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "position_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "employee_count" INTEGER NOT NULL,
    "po_type" TEXT NOT NULL,

    CONSTRAINT "pos_pkey" PRIMARY KEY ("po_id")
);

-- CreateTable
CREATE TABLE "public"."employee_contracts" (
    "employee_contract_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "po_id" INTEGER NOT NULL,
    "status" "public"."ContractStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "employee_code" TEXT NOT NULL,

    CONSTRAINT "employee_contracts_pkey" PRIMARY KEY ("employee_contract_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "public"."accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "public"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "public"."verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "public"."verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "employees_personal_id_key" ON "public"."employees"("personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "pos_po_number_key" ON "public"."pos"("po_number");

-- CreateIndex
CREATE UNIQUE INDEX "employee_contracts_employee_code_key" ON "public"."employee_contracts"("employee_code");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Companies"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."departments" ADD CONSTRAINT "departments_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "public"."divisions"("division_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pos" ADD CONSTRAINT "pos_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."Companies"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pos" ADD CONSTRAINT "pos_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pos" ADD CONSTRAINT "pos_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_contracts" ADD CONSTRAINT "employee_contracts_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_contracts" ADD CONSTRAINT "employee_contracts_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "public"."pos"("po_id") ON DELETE RESTRICT ON UPDATE CASCADE;
