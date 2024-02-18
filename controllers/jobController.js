import jobModels from "../models/jobModels.js";
import mongoose from "mongoose";
import moment from 'moment';

// =====================CREATE JOB=================
export const jobcontroller = async (req, res, next) => {
    const { campany, position } = req.body;

    if (!campany || !position) {
        next('Please Provide All Fields');
    }
    req.body.createdBy = req.user.userID;
    const job = await jobModels.create(req.body);

    res.status(201).json({
        // success: true,
        // message: "Successfully",
        job
    });
    // console.log(error);
    // next('error in User Controller');
}



// ========== GET JOB================
export const getJobcontroller = async (req, res, next) => {

    const { Status, workLocation, worktype, search, sort } = req.query;
    // conditions for Searching filter
    const queryObject = {
        createdBy: req.user.userID
    };
    if (Status && Status !== 'all') {
        queryObject.Status = Status;
    };

    if (workLocation && workLocation !== 'all') {
        queryObject.workLocation = workLocation;
    };
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' };
    }
    console.log(worktype);
    if (worktype && worktype !== 'all') {
        queryObject.worktype = { $regex: worktype, $options: 'i' };
    };
    console.log(queryObject);

    let queryResult = jobModels.find(queryObject);
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt');
    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt');
    }

    if (sort === 'a-z') {
        queryResult = queryResult.sort('position');
    }

    if (sort === 'z-a') {
        queryResult = queryResult.sort('-position');
    }

    // pagination

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit
    queryResult = queryResult.skip(skip).limit(limit);

    const TotalJobs = await jobModels.countDocuments(queryResult);
    const numOfpage = Math.ceil(TotalJobs / limit);

    const jobs = await queryResult;


    // console.log(jobs);
    // const jobs = await jobModels.find({ createdBy: req.user.userID });
    res.status(201).json({
        TotalJobs: jobs.length,
        numOfpage,
        jobs,
    });
};

//================find job============
export const findJobController = async (req, res, next) => {

    const { campany, position } = req.params;
    // const position = req.params;
    if (!campany || !position) {
        next('Please Provide All Fields');
        return;
    }
    // find Job
    const job = await jobModels.find({ campany: campany, position: position });

    if (!job) {
        next(`No Job found with this campany : ${campany} and position : ${position}`);
        return;
    }
    console.log(job)
    res.status(201).send({
        Message: 'Here Your Search Result',
        job
    });
}


// ===========update job================
export const upJobController = async (req, res, next) => {
    // const { id } = req.params;
    const id = req.query.id;
    const { campany, position } = req.body;
    //validation
    if (!campany || !position) {
        next('Please Provide All Fields');
    }
    // find job
    const job = await jobModels.findOne({ id })

    //validation
    if (!job) {
        next(`no jobs found with this is ${id}`);
    }
    if (!req.user.userID === job.createdBy.toString()) {
        next('You donnot have authorization to update job');
        return;
    }

    const updatejob = await jobModels.findOneAndUpdate({ id }, req.body, {
        new: true,
        runValidator: true
    })
    res.status(201).json({ updatejob });
};

// ==============delete jobs==============
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    // find job
    const job = await jobModels.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no jobs found with this is ${id}`);
    }
    if (!req.user.userID === job.createdBy.toString()) {
        next('You donnot have authorization to update job');
        return;
    }
    await job.deleteOne();
    res.status(200).json({ message: "Succes, Job Deleted!" });
};

//==============stats jobs==============
export const statsJobController = async (req, res, next) => {
    const stats = await jobModels.aggregate([
        // search by users job
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userID)
            },
        },

    ])
    let monthyApplication = await jobModels.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    monthyApplication = monthyApplication.map(item => {
        const { _id: { year, month }, count } = item
        const date = moment({ year, month: month - 1 }).format('MMM Y');
        return { date, count };

    }).reverse();
    res.status(200).json({ Total_jobs: stats.length, monthyApplication, stats });

}   