import { Router } from "express";

import { userRouter } from "./userRouters.js";

export const router = Router();

router.use(userRouter);