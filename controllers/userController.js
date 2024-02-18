import userModel from "../models/userModels.js";

// update 
export const updateUserController = async (req, res, next) => {
    const { name, email, location, lastName } = req.body;
    if (!name || !email || !location || !lastName) {
        next('Please Provide All Fields');
    }
    const user = await userModel.findOne({ _id: req.user.userID });
    user.name = name
    user.email = email
    user.location = location
    user.lastName = lastName

    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        user,
        token
    });
};