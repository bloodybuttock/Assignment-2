const User = require('../models/User');

class TownhallController{ 
    static resources (req, res, next) {
        User.findById(req.params.id)
            .then((user) => {
                res.status(201).json({
                    success:true,
                    townhall:user.townhall,
                    medals:user.medals,
                    resources:user.resources,
                })
            }).catch(next)
    }

    static rename (req, res, next) {
        const { id } = req.params;
        let townhall;
        User.findById(id)
            .then((town) => {
                if(town) {
                    return User.findOneAndUpdate({_id:id},{townhall:req.body.townhall})
                    }else throw {name: 'NOT_FOUND'};
                })
                .then((town) => {
                    res.status(200).json({
                        success:true,
                        message:'Townhall name has successfully changed',
                        data:town.townhall,
                    });
                })
                .catch(next)
    }
}

module.exports = TownhallController