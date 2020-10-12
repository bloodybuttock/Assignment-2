const User = require('../models/User');

class attackController {

    static randomSuccess(attacker, defender){
        const arr = [];
        for(let i=0; i<3; i++) {
            arr.push(Math.random() < (attacker / (defender + 1)))
        }
        return arr.filter(el => el).length >= 2 ? true : false;
    }

    static attack (req, res, next){
        const {id} = req.params;
        const attackerSoldiers = Number(req.body.soldiers);
        let attacker;
        let defender;
        let isSuccess;
        User.findById({ _id : req._id})
            .then((user) => {
                if(user) {
                    attacker = user;
                    return User.findById({_id:id});
                } else throw {name:'NOT_FOUND'}; 
            })
            .then((user) => {
                defender = user;
                if(defender.resources.soldiers >= 50 && req.body.soldiers>0){
                    return true;
                } else throw {name:'USER_INVULNERABLE'};  
            })
            .then((user) => {
                if(user) {
                    if (attacker.resources.soldiers >= attackerSoldiers){        
                        const resources = attacker.resources;
                        resources.soldiers = attacker.resources.soldiers - attackerSoldiers;
                        // return true;
                        return user;

                    } else throw {name:'NOT_ENOUGH'};
                } else throw {name:'NOT_FOUND'};
            })
            .then((user) => {
                isSuccess = attackController.randomSuccess(attackerSoldiers,defender.resources.soldiers);
                const resources = attacker.resources;
                if(isSuccess){
                    const newMedals = attacker.medals +5;
                    resources.golds = resources.golds + Math.floor(defender.resources.golds /2);
                    resources.foods = resources.foods + Math.floor(defender.resources.foods /2);
                    resources.soldiers = attacker.soldiers - attackerSoldiers;
                    return User.findOneAndUpdate({_id:attacker._id},  {medals:newMedals, resources});
                } else { 
                    resources.soldiers = attacker.soldiers - attackerSoldiers;
                    const newMedals = Math.floor(attacker.medals /2);
                    return User.findOneAndUpdate({_id:attacker._id},  {medals:newMedals,resources});
                }
            })
            .then((user) => {
                attacker = user;
                if (isSuccess) {
                    const resources = defender.resources;
                    resources.foods = Math.ceil(resources.foods /2);
                    resources.golds = Math.ceil(resources.golds /2);
                    resources.soldiers = 0;
                    return User.findOneAndUpdate({_id:defender._id}, {resources})
                } else {
                    return User.findOneAndUpdate({_id:defender._id},{medals:defender.medals +2});
                }
            })
            .then((user) => {
                defender = user;
                res.status(200).json({
                    success:true,
                    message: `Attack ${isSuccess ? 'Success':'Fail'}`
                    })
            })
            .catch(next);
    }
}


module.exports=attackController