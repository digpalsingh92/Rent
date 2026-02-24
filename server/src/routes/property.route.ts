import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createProperty } from "../controllers/property.controller";

const router = Router();


router.post('/createProperty', createProperty);

export { router as propertyRoutes };