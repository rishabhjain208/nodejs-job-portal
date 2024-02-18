import JWT from 'jsonwebtoken';

// two factor Authorization
export const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        next("Auto failed");
    }

    const token = authHeader.split(" ")[1];
    try {
        const playlod = JWT.verify(token, process.env.JWT_SECURE);
        req.user = { userID: playlod.userID };
        next();
    } catch (error) {
        next("Auto failed");
    }
};
