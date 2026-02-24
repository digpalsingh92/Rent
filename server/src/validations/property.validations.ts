import { z } from "zod";

export const createPropertySchema = z.object({
    title: z.string().nonempty('Title is required').max(255, 'Title must not exceed 255 characters'),
    description: z.string().nonempty('Description is required').max(1000, 'Description must not exceed 1000 characters'),
    price: z.number().positive('Price must be a positive number'),
    location: z.string().nonempty('Location is required').max(255, 'Location must not exceed 255 characters'),
    images: z.array(z.string().url('Each image must be a valid URL')).nonempty('At least one image URL is required'),
});

export const updatePropertySchema = z.object({
    title: z.string().max(255, 'Title must not exceed 255 characters').optional(),
    description: z.string().max(1000, 'Description must not exceed 1000 characters').optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    location: z.string().max(255, 'Location must not exceed 255 characters').optional(),
    images: z.array(z.string().url('Each image must be a valid URL')).optional(),
});