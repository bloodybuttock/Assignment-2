module.exports=(err, req, res, next) => {
    let code;
    let name = err.name;
    let message;

    switch (name) {
        case 'ALREADY_EXIST':
            code=409;
            message='Already exist';
            break;
        case 'MONGOOSE_ERROR':
            code=500;
            message='mongoose error';
            break;
        case 'LOGIN_FAIL':
            code=401;
            message='Email & password combination not found';
            break;
        case 'MISSING_TOKEN':
            code=401;
            message='Missing access token';
            break;
        case 'INVALID_TOKEN':
            code=401;
            message='Invalid access token';
            break;
        case 'NOT_FOUND':
            code=404;
            message='Email and Password combination not found';
            break;
        case 'NOT_ENOUGH':
            code=404;
            message='Resource not enough';
            break;
        case 'FORBIDDEN':
            code=403;
            message='No access';
            break;
        case 'USER_INVULNERABLE':
            code=403;
            message=`this user have less than 50 soldiers OR you entered zero?!`;
            break;
        default:
            code=500;
            message='Internal server error';
            console.log(err);
            break;
    }
    res.status(code).json({success:false, message})
}