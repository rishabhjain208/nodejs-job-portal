import express from "express"; // we have to import express for perfrom routing 
import { authController, loginController } from "../controllers/authController.js";
import { rateLimit } from 'express-rate-limit';
// ip limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
})

const router = express.Router(); // router object

//Routes || Register || Post
router.post('/register', limiter, authController);

//R outes || Login || Post
router.post('/login', limiter, loginController);

export default router; // exports