const router = require('express').Router();
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
// router.get('/:id', UserController.resources);

module.exports=router