const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static signup (req, res, next){
        const {
            // townhall,
            email,
            password} = req.body;
        const user = new User ({townhall,email,password});
        user
            .save()
            .then((user) => {
                res.status(201).json({success:true,
                data:{
                    _id:user._id,
                    // townhall:user.townhall,
                    medals:user.medals,
                    email:user.email,
                    resources:user.resources
                }
                });
            })
            .catch(next)
    };

    static signin (req, res, next){
        const {email,password}=req.body;
        User.findOne({email})
            .then((user) => {
                if(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        const access_token = jwt.sign({_id: user._id}, 'giveitaway');
                        res.status(201).json({ success:true, access_token });
                    }else throw {name:'NOT_FOUND'}
                }else throw {name:'NOT_FOUND'}
            })
            .catch(next);
    }
};

module.exports = UserController