import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import config from "./config/config";
import errorHandler from "./middleware/errorHandler";
import _404 from "./middleware/404";
import root from "./routes/root";
import { NODE_ENV } from "./types/config";
import articleRouter from "./routes/introduction";
import userRouter from "./routes/user";
import auth from "./middleware/auth";

const app:Application  = express();

//set up cors
const nodeEnv: NODE_ENV = config.nodeEnv as NODE_ENV;
app.use( cors({origin: config.clientOrigins[nodeEnv]}));

app.use(express.json());

// Apply most middleware first
app.use(express.urlencoded({ extended: true }));

//set up security headers
app.use(helmet());

app.use('/introduction', auth, articleRouter);
app.use('/user', userRouter);
app.use('/', root); 

// Apply error handling
app.use(_404);
app.use(errorHandler);

export default app;