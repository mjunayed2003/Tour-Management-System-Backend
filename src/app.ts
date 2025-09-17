/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Request, Response } from 'express';
import { globalErrorHandler } from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/NotFound';
import { router } from './app/routes';
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

// global error handler
app.use(globalErrorHandler)

// route not found
app.use(notFound)

export default app;