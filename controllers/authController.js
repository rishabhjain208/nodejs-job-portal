import userModels from "../models/userModels.js";

export const authController = async (req, res, next) => {
    const { name, email, passward, location, lastName } = req.body;
    if (!name) {
        next('Name is required');
    }
    if (!email) {
        next('Email is required');
    }
    if (!passward) {
        next('password is required');
    }
    const exisitingUser = await userModels.findOne({ email })
    if (exisitingUser) {
        next('Email is Already Created');
    }
    const user = await userModels.create({ name, email, passward, location, lastName });

    // token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        User: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location
        },
        // User: user,
        token

    });
    console.log(error);
    next('error in User Controller');
}

export const loginController = async (req, res, next) => {
    const { email, passward } = req.body;

    if (!email) {
        next('Please Provide All fields');
    }
    if (!passward) {
        next('Please Provide All fields');
    }

    const login = await userModels.findOne({ email }).select("+passward");
    if (!login) {
        next('Invalid Username and Password');
    }
    const isMatch = login.camparepassword(passward);
    if (!isMatch) {
        next('Invalid Username and Password');
    }
    const token = login.createJWT();
    login.passward = undefined;
    res.status(200).send({
        success: true,
        message: "Login Successfully",
        // login: {
        //     name: login.name,
        //     email: login.email,
        //     lastName: login.lastName,
        //     location: login.location
        // },
        login,
        token
    });

}


// #for reference code
// import userModels from "../models/userModels.js";

// export const authController = async (req, res, next) => {
//     try {

//         const { name, email, passward } = req.body;
//         if (!name) {
//             next('Name is required');
//             // return res.status(400).send({ success: false, message: 'Please Provide Name' })
//         }
//         if (!email) {
//             next('Email is required');
//             // return res.status(400).send({ success: false, message: 'Please Provide Email' })
//         }
//         if (!passward) {
//             next('password is required');
//             // return res.status(400).send({ success: false, message: 'Please Provide Passward' })
//         }

//         const exisitingUser = await userModels.findOne({ email })
//         if (exisitingUser) {
//             next('Email is Already Created');
//             // return res.status(200).send({
//             //     success: false,
//             //     message: 'Email is Already Created'
//             // })
//         }
//         const user = await userModels.create({ name, email, passward });
//         res.status(201).send({
//             success: true,
//             message: 'User Created Successfully',
//             User: user
//         });
//     } catch (error) {
//         console.log(error);
//         next('error in User Controller')
//         // res.status(200).send({
//         //     message: "error in User Controller",
//         //     success: false,
//         //     error
//         // }
//         // )
//     }
// } 

