const router = require('express').Router();
const marketController = require('../controllers/MarketController');
const authorization = require('../middlewares/authorization');

router.get('/',marketController.list);
router.post('/', marketController.create);
router.get('/:id', authorization.marketAuthorization ,marketController.info);
router.put('/:id', authorization.marketAuthorization, marketController.rename);
router.delete('/:id', authorization.marketAuthorization, marketController.demolish);
router.get('/:id/collect', authorization.marketAuthorization, marketController.collect);

module.exports=router