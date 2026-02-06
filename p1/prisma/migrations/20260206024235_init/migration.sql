-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('registrada', 'en_proceso', 'finalizada');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "area_solicitante" TEXT NOT NULL,
    "prioridad" INTEGER NOT NULL,
    "costo_estimado" DECIMAL(65,30) NOT NULL,
    "estado" "Estado" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
