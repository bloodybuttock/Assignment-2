const Barrack = require('../models/Barrack');
const User = require('../models/User')

class barrackController {
    static list (req, res, next){
        Barrack.find({_userId:req._id})
            .then ((barracks) => {
                res.status(200).json({ 
                    success:true, 
                    data:barracks})
            }).catch(next)
    }

    static create (req, res, next){
        User.findById(req._id)
            .then((user) => {
                if(user) {
                    if (user.resources.golds >= 30 && user.resources.foods >= 30) {
                        const resources = user.resources;
                        resources.golds -= 10;
                        resources.foods -= 30;
                        return User.updateOne({ _id:req._id }, { resources });
                    } else {
                        throw 'NOT_ENOUGH';
                    }
                } else {
                    throw 'NOT_FOUND';
                }
            })
            .then((user) => {
                const { barrackName } = req.body;
                const barrack = new Barrack ({ _userId:req._id, barrackName });
                return barrack.save();
            })
            .then((barrack) => {
                res.status(200).json({success:true, data:barrack})
            })
            .catch(next)
    }

    static info (req, res, next){
        Barrack.findOne({_id:req.params.id})
            .then((barrack) => {
                if(barrack) {
                    res.status(200).json({
                        success:true,
                        data:{
                            _id:barrack._id,
                            barrackName:barrack.barrackName,
                            lastTrained:barrack.lastTrainsed,
                        }
                    });
                }else throw {name: 'NOT_FOUND'};
            })
            .catch(next)
    }

    static rename (req, res, next){
        const {barrackName} = req.body;
        Barrack.findOne({_id:req.params.id})
            .then((barrack) => {
                if(barrack) {
                    barrack.barrackName = barrackName;
                    return barrack.save()
                    }else throw {name: 'NOT_FOUND'};
                })
                .then((barrack) => {
                    res.status(200).json({
                        success:true,
                        data:barrack
                    });
                })
                .catch(next)
    }
            
    static demolish (req, res, next){
        Barrack.findOne({ _id:req.params.id })
            .then((barrack) => {
                return barrack.remove();
            })
            .then((barrack) => {
                res.status(200).json({ success:true, deleted:barrack })
            })
            .catch(next)
    }

    static collect (req, res, next){
        const { id } = req.params;
        let soldiers;
        Barrack.findById(id)
            .then((barrack) => {
                if(barrack) {
                    soldiers = Math.floor((Date.now() - barrack.lastTrained) / 60000);
                    soldiers = soldiers>10? 10:soldiers;
                    barrack.lastTrained = Date.now();
                    return barrack.save();
                } else{throw 'NOT_FOUND'}
            })
            .then((barrack) => {
                return User.findById(req._id);
            })
            .then((user) => {
                const resources = user.resources;
                resources.soldiers += soldiers;
                resources.soldiers = resources.soldiers >= 500? 500:resources.soldiers; 
                return User.updateOne({_id:req._id},{resources:resources}); 
            })
            .then((result) => {
                res.status(200).json({
                    success:true,
                    message: `${soldiers} soldiers has been trained`,
                });
            })
            .catch(next)
    }
}

module.exports = barrackController