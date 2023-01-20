import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import "express-async-errors";

import { router } from "./Routers/index.js";
import { handleError } from "./Middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(handleError);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(chalk.yellow(`Server runing on port ${PORT}`)))