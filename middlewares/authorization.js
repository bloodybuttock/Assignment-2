const User = require('../models/User')
const Market = require('../models/Market');
const Farm = require('../models/Farm');
const Barrack = require('../models/Barrack');


class authorization {
    
    static userAuthorization (req, res, next) {
        User.findOne({_id:req.params.id})
        .then((user) => {
            if(user){
                if(user._id.toString() === req._id) next();
                else throw {name: 'FORBIDDEN'}
            }else throw {name: 'NOT_FOUND'};
        })
        .catch(next);
    };

    static marketAuthorization (req, res, next) {
        Market.findOne({_id:req.params.id})
        .then((market) => {
            if(market){
                if(market._userId.toString() === req._id) next();
                else throw {name: 'FORBIDDEN'}
            }else throw {name: 'NOT_FOUND'};
        })
        .catch(next);
    };

    static farmAuthorization (req, res, next) {
        Farm.findOne({_id:req.params.id})
        .then((farm) => {
            if(farm){
                if(farm._userId.toString() === req._id) next();
                else throw {name: 'FORBIDDEN'}
            }else throw {name: 'NOT_FOUND'};
        })
        .catch(next);
    };

    static barrackAuthorization (req, res, next) {
        Barrack.findOne({_id:req.params.id})
        .then((barrack) => {
            if(barrack){
                if(barrack._userId.toString() === req._id) next();
                else throw {name: 'FORBIDDEN'}
            }else throw {name: 'NOT_FOUND'};
        })
        .catch(next);
    };

}

module.exports = authorization