-- CreateTable
CREATE TABLE "Grant" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "authorized" BOOLEAN NOT NULL DEFAULT false,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow" (
    "code" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "grantId" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flow_grantId_key" ON "Flow"("grantId");

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "Grant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
