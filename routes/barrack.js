const router = require('express').Router();
const barrackController = require('../controllers/BarrackController');
const authorization = require('../middlewares/authorization')


router.get('/',barrackController.list);
router.post('/', barrackController.create);
router.get('/:id', authorization.barrackAuthorization,barrackController.info);
router.put('/:id', authorization.barrackAuthorization,barrackController.rename);
router.delete('/:id', authorization.barrackAuthorization,barrackController.demolish);
router.get('/:id/collect', authorization.barrackAuthorization,barrackController.collect);

module.exports=router