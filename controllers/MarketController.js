const Market = require('../models/Market');
const User = require('../models/User')

class marketController {
    static list (req, res, next){
        Market.find({_userId:req._id})
            .then ((markets) => {
                
                res.status(200).json({ 
                    success:true, 
                    data:markets})
            }).catch(next)
    }

    static create (req, res, next){
        User.findById(req._id)
            .then((user) => {
                if(user) {
                    if (user.resources.golds >= 30 && user.resources.foods >= 10) {
                        const resources = user.resources;
                        resources.golds -= 30;
                        resources.foods -= 10;
                        return User.updateOne({ _id:req._id }, { resources });
                    } else {
                        throw 'NOT_ENOUGH';
                    }
                } else {
                    throw 'NOT_FOUND';
                }
            })
            .then((user) => {
                const { marketName } = req.body;
                const market = new Market ({ _userId:req._id, marketName });
                return market.save();
            })
            .then((market) => {
                res.status(200).json({success:true, data:market})
            })
            .catch(next)

        // const { marketName } = req.body;
        // const market = new Market({
        //     _userId:req._id,
        //     marketName,
        // });
        // market
        //     .save()
        //     .then((market) => {
        //         res.status(200).json({ success:true, data:market })
        //     })
        //     .catch(next);
    }

    static info (req, res, next){
        Market.findOne({_id:req.params.id})
            .then((market) => {
                if(market) {
                    res.status(200).json({
                        success:true,
                        data:{
                            _id:market._id,
                            marketName:market.marketName,
                            lastCollected:market.lastCollected,
                        }
                    });
                }else throw {name: 'NOT_FOUND'};
            })
            .catch(next)

    }

    static rename (req, res, next){
        const {marketName} = req.body;
        Market.findOne({_id:req.params.id})
            .then((market) => {
                if(market) {
                    market.marketName = marketName;
                    return market.save()
                    }else throw {name: 'NOT_FOUND'};
                })
                .then((market) => {
                    res.status(200).json({
                        success:true,
                        data:market
                    });
                })
                .catch(next)
    }
            
    static demolish (req, res, next){
        Market.findOne({ _id:req.params.id })
            .then((market) => {
                return market.remove();
            })
            .then((market) => {
                res.status(200).json({ success:true, deleted:market })
            })
            .catch(next)
    }

    static collect (req, res, next){
        const { id } = req.params;
        let golds;
        Market.findById(id)
            .then((market) => {
                if(market) {
                    golds = Math.floor((Date.now() - market.lastCollected) / 60000);
                    golds = golds>20? 20:golds;
                    market.lastCollected = Date.now();
                    return market.save();
                } else{throw 'NOT_FOUND'}
            })
            .then((market) => {
                return User.findById(req._id);
            })
            .then((user) => {
                const resources = user.resources;
                resources.golds += golds;
                resources.golds = resources.golds >= 1000? 1000:resources.golds; 
                return User.updateOne({_id:req._id},{resources:resources}); 
            })
            .then((result) => {
                res.status(200).json({
                    success:true,
                    message: `${golds} golds has been added to your resources`,
                });
            })
            .catch(next)
    }
}

module.exports = marketController