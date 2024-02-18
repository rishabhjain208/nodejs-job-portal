import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    campany: {
        type: String,
        required: [true, 'Please Provide Campany Name']
    },
    position: {
        type: String,
        required: [true, 'Job Position is requried'],
        maxlength: 100
    },
    Status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    worktype: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contaract'],
        default: 'full-Time'
    },
    workLocation: {
        type: String,
        default: 'Noida',
        required: [true, 'WorkPlace Location is require']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestanps: true });

export default mongoose.model('Job', jobSchema);