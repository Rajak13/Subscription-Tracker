import cors from "cors";
import express from "express";
import { PORT } from './config/env.js';

import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscriptions.route.js";
import userRouter from "./routes/user.routes.js";

import connectToDB from "./database/mongodb.js";

import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.com'] 
        : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send( 'Welcome to this backend project');
})


app.listen(PORT ,async () => {
    console.log(`Server is running on port http://localhost:${PORT} `);

    await connectToDB()
} )

export default app;