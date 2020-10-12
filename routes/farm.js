const router = require('express').Router();
const farmController = require('../controllers/FarmController');
const authorization = require('../middlewares/authorization')


router.get('/',farmController.list);
router.post('/', farmController.create);
router.get('/:id', authorization.farmAuthorization,farmController.info);
router.put('/:id', authorization.farmAuthorization,farmController.rename);
router.delete('/:id', authorization.farmAuthorization,farmController.demolish);
router.get('/:id/collect', authorization.farmAuthorization,farmController.collect);

module.exports=router