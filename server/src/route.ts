import { Router } from "express";
import { authRoutes } from "./routes/auth.route";
import { propertyRoutes } from "./routes/property.route";

const router = Router();

router.use('/auth', authRoutes);
router.use('/property', propertyRoutes);

export {router as ApiRoutes };