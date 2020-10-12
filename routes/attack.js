const router = require('express').Router();
const AttackController = require('../controllers/AttackController')
router.post('/:id', AttackController.attack )

module.exports=router