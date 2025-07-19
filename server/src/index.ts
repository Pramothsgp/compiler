import { errorHandler } from "./middleware/errorMiddleware";

import router from "./routes/codeRoutes";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/code', router);

app.use(errorHandler);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});