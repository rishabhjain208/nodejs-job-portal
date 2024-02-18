import express from "express";
import { testController } from '../controllers/testController.js';
import { userAuth } from "../middleware/authmiddleware.js";
// routes object
const router = express.Router();

router.post('/test-post', userAuth, testController);
// router.post('/test-post',async function(req,res){
//     const {name} = await req.body
//     res.status(200).send(`Your name is ${name}`)
// })

// export
export default router;
