const Farm = require('../models/Farm');
const User = require('../models/User')

class marketController {
    static list (req, res, next){
        Farm.find({_userId:req._id})
            .then ((farms) => {
                res.status(200).json({ 
                    success:true, 
                    data:farms})
            }).catch(next)
    }

    static create (req, res, next){
        User.findById(req._id)
            .then((user) => {
                if(user) {
                    if (user.resources.golds >= 10 && user.resources.foods >= 30) {
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
                const { farmName } = req.body;
                const farm = new Farm ({ _userId:req._id, farmName });
                return farm.save();
            })
            .then((farm) => {
                res.status(200).json({success:true, data:farm})
            })
            .catch(next)
    }

    static info (req, res, next){
        Farm.findOne({_id:req.params.id})
            .then((farm) => {
                if(farm) {
                    res.status(200).json({
                        success:true,
                        data:{
                            _id:farm._id,
                            farmName:farm.farmName,
                            lastCollected:farm.lastCollected,
                        }
                    });
                }else throw {name: 'NOT_FOUND'};
            })
            .catch(next)
    }

    static rename (req, res, next){
        const {farmName} = req.body;
        Farm.findOne({_id:req.params.id})
            .then((farm) => {
                if(farm) {
                    farm.farmName = farmName;
                    return farm.save()
                    }else throw {name: 'NOT_FOUND'};
                })
                .then((farm) => {
                    res.status(200).json({
                        success:true,
                        data:farm
                    });
                })
                .catch(next)
    }
            
    static demolish (req, res, next){
        Farm.findOne({ _id:req.params.id })
            .then((farm) => {
                return farm.remove();
            })
            .then((farm) => {
                res.status(200).json({ success:true, deleted:farm })
            })
            .catch(next)
    }

    static collect (req, res, next){
        const { id } = req.params;
        let foods;
        Farm.findById(id)
            .then((farm) => {
                if(farm) {
                    foods = Math.floor((Date.now() - farm.lastCollected) / 60000);
                    foods = foods>20? 20:foods;
                    farm.lastCollected = Date.now();
                    return farm.save();
                } else{throw 'NOT_FOUND'}
            })
            .then((farm) => {
                return User.findById(req._id);
            })
            .then((user) => {
                const resources = user.resources;
                resources.foods += foods;
                resources.foods = resources.foods >= 1000? 1000:resources.foods; 
                return User.updateOne({_id:req._id},{resources:resources}); 
            })
            .then((result) => {
                res.status(200).json({
                    success:true,
                    message: `${foods} foods has been added to your resources`,
                });
            })
            .catch(next)
    }
}

module.exports = marketController