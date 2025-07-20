import { errorHandler } from "./middleware/errorMiddleware";

import codeRouter from "./routes/codeRoutes";
import authRouter from './routes/authRouter';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api/code', codeRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});