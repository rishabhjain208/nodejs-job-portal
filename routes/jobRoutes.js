import express from 'express';
import { userAuth } from '../middleware/authmiddleware.js';
import { deleteJobController, findJobController, getJobcontroller, jobcontroller, statsJobController, upJobController } from '../controllers/jobController.js';

const router = express.Router();

// Create || JOB || POST

router.post('/create-job', userAuth, jobcontroller);

// get || JOB 
router.get('/get-job', userAuth, getJobcontroller);

//find || get
router.get('/find-job', userAuth, findJobController);

// update put patch
router.patch('/update-job/:id', userAuth, upJobController);

// DELETE || delete
router.delete('/delete-job/:id', userAuth, deleteJobController);

//stats || get
router.get('/stats-job', userAuth, statsJobController);

export default router; 