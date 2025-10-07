import cors from 'cors';
import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/NotFound';
import { router } from './app/routes';
import passport from 'passport';
import expressSession from 'express-session';
import { envVars } from './app/config/env';
import './app/config/passport';
const app = express();

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
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