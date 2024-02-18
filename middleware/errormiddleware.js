const errormiddleware = (err, res, req, next) => {
    console.log(err);
    req.status(500).send({
        success: false,
        message: 'Something went wrong',
        err
    })
}
export default errormiddleware;