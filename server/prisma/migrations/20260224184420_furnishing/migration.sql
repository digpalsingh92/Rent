-- AlterTable
ALTER TABLE "Amenity" ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "Furnishing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Furnishing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Furnishing_propertyId_key" ON "Furnishing"("propertyId");

-- AddForeignKey
ALTER TABLE "Furnishing" ADD CONSTRAINT "Furnishing_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
