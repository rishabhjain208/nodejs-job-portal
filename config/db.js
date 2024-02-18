import mongoose from "mongoose";
import colors from 'colors';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Mongo Db error ${error}`.bgRed.white);
        process.exit(1);
    }
};
export default connectDB;
