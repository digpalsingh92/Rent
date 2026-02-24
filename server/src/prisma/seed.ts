import { PrismaClient } from "@prisma/client";

const seedProperties = async (prisma: PrismaClient) => {

  const propertyData = {
    title: "Skyline Residency Phase II",
    type: "Apartment",
    price: 25000,
    location: "Sector 45, Gurgaon",
    status: "Available For Rent",
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      area_sqft: 1850
    },
    unitInternalFeatures: [
      "Water Purifier", "Gas Pipeline", "Servant Room", 
        "4 Fan", "15 Light", "2 Wardrobe", "2 Geyser", 
        "Chimney", "Modular Kitchen"
    ],
    amenities: [
      "AC", "TV", "Geyser", "Swimming Pool", "Gym", "Lift", 
        "Power Backup", "Intercom", "Garden", "Sports", "Kids Area", 
        "CCTV", "Gated Community", "Club House", "Community Hall", 
        "Regular Water Supply", "Attached Balcony", "Amphitheater", 
        "Cricket Pitch", "Gazebo", "Garbage Disposal", "Reflexology Park", 
        "Skating Rink", "Fire Sprinklers", "Fire Fighting System", 
        "Manicured Garden", "Car Parking", "Multipurpose Room", 
        "Jogging Track", "Street Lighting", "Senior Citizen Siteout", 
        "Indoor Games", "Lawn Tennis Court", "Sewage Treatment Plant", 
        "Entrance Lobby", "Yoga / Meditation Area", "Recreation Facilities", 
        "Solid Waste Management And Disposal", "Badminton Court", 
        "Sun Deck", "Basketball Court", "Paved Compound", "Banquet Hall", 
        "Library", "Rain Water Harvesting", "24x7 Security", "Jacuzzi", 
        "24x7 CCTV Surveillance"
    ]
  };

  // 1️⃣ Create or Get Amenities
  for (const amenityName of propertyData.amenities) {
    await prisma.amenity.upsert({
      where: { name: amenityName },
      update: {},
      create: { name: amenityName }
    });
  }

  // 2️⃣ Create or Get Furnishings
  for (const furnishingName of propertyData.unitInternalFeatures) {
    await prisma.furnishing.upsert({
      where: { name: furnishingName },
      update: {},
      create: { name: furnishingName }
    });
  }

  // 3️⃣ Create Property
  const property = await prisma.property.create({
    data: {
      title: propertyData.title,
      price: propertyData.price,
      location: propertyData.location,
      status: propertyData.status,
      ownerId: "OWNER_USER_ID", // Replace with real user
    }
  });

  // 4️⃣ Connect Amenities
  for (const amenityName of propertyData.amenities) {
    const amenity = await prisma.amenity.findUnique({
      where: { name: amenityName }
    });

    await prisma.propertyAmenity.create({
      data: {
        propertyId: property.id,
        amenityId: amenity.id
      }
    });
  }

  // 5️⃣ Connect Furnishings
  for (const furnishingName of propertyData.unitInternalFeatures) {
    const furnishing = await prisma.furnishing.findUnique({
      where: { name: furnishingName }
    });

    await prisma.propertyFurnishing.create({
      data: {
        propertyId: property.id,
        furnishingId: furnishing.id
      }
    });
  }

  console.log("Property seeded successfully");
};