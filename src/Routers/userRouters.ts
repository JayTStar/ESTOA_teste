import { Router } from "express";

import * as userController from "../Controllers/userControllers.js";
import * as schemas from "../Schemas/userSchemas.js";
import { validateSchema } from "../Middlewares/schemaValidation.js";

export const userRouter = Router();

userRouter.post("/sign-up",validateSchema(schemas.signupSchema), userController.signup);
userRouter.post("/sign-in",validateSchema(schemas.signinSchema), userController.signin);
userRouter.get("/users", userController.getUsers);
userRouter.post("/user/:id", userController.editUser);
userRouter.delete("/user/:id", userController.deleteUser)