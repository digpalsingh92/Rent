import { Request, Response } from "express";
import { StatusCodes } from "../constants/StatusCodes";
import { prisma } from "../config/Database.config";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}


export const createProperty = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    const {
      title,
      description,
      price,
      images = [],
      amenities = [],
      location,
      features,
      currency
    } = req.body;

    if (!title || !description || !price || !location) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Required fields missing",
      });
    }

    const property = await prisma.$transaction(async (tx) => {

      const newProperty = await tx.property.create({
        data: {
          title,
          description,
          price: Number(price),
          ownerId: userId,

          images: {
            create: images.map((url: string) => ({ url }))
          },

          amenities: {
            create: amenities.map((name: string) => ({
              amenity: {
                connectOrCreate: {
                  where: { name },
                  create: { name }
                }
              }
            }))
          },

          location: {
            create: {
              address: location.address,
              city: location.city,
              state: location.state,
              zipCode: location.zipCode,
              latitude: location.latitude,
              longitude: location.longitude
            }
          },

          features: features
            ? {
                create: {
                  bedrooms: features.bedrooms,
                  bathrooms: features.bathrooms,
                  areaSqft: features.areaSqft,
                  yearBuilt: features.yearBuilt
                }
              }
            : undefined
        }
      });

      await tx.propertyRole.create({
        data: {
          propertyId: newProperty.id,
          userId: userId,
          role: "OWNER"
        }
      });

      return newProperty;
    });

    return res.status(StatusCodes.CREATED).json(property);

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};