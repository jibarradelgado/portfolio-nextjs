/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attribute_symbol_key" ON "Attribute"("symbol");
