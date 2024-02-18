import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
// Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: validator.isEmail
    },
    passward: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'Password length should be grater than 6 characters']
    },
    location: {
        type: String,
        default: "India"
    }
},
    { timestamps: true })

// campare password
userSchema.methods.camparepassword = async function (userpassword) {
    const isMatch = await bcrypt.compare(userpassword, this.passward);
    return isMatch;
}

// encrpytion of password using hash   
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.passward = await bcrypt.hash(this.passward, salt);
})

// 
userSchema.methods.createJWT = function () {
    return JWT.sign({ userID: this._id }, process.env.JWT_SECURE);//, { expiresIn: '1d' });
}
export default mongoose.model('User', userSchema);