import { Router } from "express";
import { createUser } from "../controllers/auth.controller";
import { createUserSchema } from "../validations/auth.validations";
import { validate } from "../middleware/validate.middleware";

const router = Router();


router.post('/register', validate(createUserSchema), createUser);

export { router as authRoutes };