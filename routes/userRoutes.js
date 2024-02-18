import express from "express";
import { userAuth } from "../middleware/authmiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

// update || put 
router.put('/update', userAuth, updateUserController);

export default router;