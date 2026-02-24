import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";
import { createUserSchema, loginUserSchema } from "../validations/auth.validations";
import { validate } from "../middleware/validate.middleware";

const router = Router();


router.post('/createProperty', validate(createUserSchema), createUser);
router.post('/login', validate(loginUserSchema), loginUser);

export { router as authRoutes };