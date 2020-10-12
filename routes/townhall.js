const router = require('express').Router();
const TownhallController = require('../controllers/TownhallController');
const authorization = require('../middlewares/authorization')

router.get('/:id', authorization.userAuthorization,TownhallController.resources);
router.put('/:id', authorization.userAuthorization,TownhallController.rename);

module.exports=router