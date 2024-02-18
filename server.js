// import express js
// const express = require('express');
import express from "express";
import "express-async-errors";
import ExpressMongoSanitize from "express-mongo-sanitize";
// import morgan from 'morgan';
// dotenv import 
import dotenv from "dotenv";

// colors 
import colors from 'colors';

// cors
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// routes imports
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errormiddleware from "./middleware/errormiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";
import helmet from 'helmet';
// DOT env config
dotenv.config();
// rest object
const app = express();

// mongo Db connection 
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(ExpressMongoSanitize());
// Use a format for morgan
app.use(morgan('combined'));

// Router
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);
//middleware
app.use(errormiddleware);
const Port = process.env.PORT;


app.listen(Port, () => {
    console.log(`Node Server in ${process.env.DEV_MODE} mode Running on port ${Port}`.bgCyan.white);
});