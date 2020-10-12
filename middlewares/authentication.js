const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { access_token } = req.headers;
    if(access_token){
        jwt.verify(access_token, 'giveitaway', (err, decoded) => {   
            if(err) next({ message:'INVALID_TOKEN' });
            else {
                req._id = decoded._id;
                next();
            }
        });
    }else next({ message:'MISSING_TOKEN' })
};