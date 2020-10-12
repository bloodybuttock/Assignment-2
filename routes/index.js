const router = require('express').Router();
const { Router } = require('express');
const userRoutes = require('../routes/user');
const marketRoutes = require('./market');
const farmRoutes = require('./farm');
const barrackRoutes = require('./barrack');
const attackRoutes = require('./attack');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const townhallRoutes = require('../routes/townhall')

router.use('/users', userRoutes);
router.use(authentication);
router.use('/users',townhallRoutes);
router.use('/markets', marketRoutes);
router.use('/farms', farmRoutes);
router.use('/barracks', barrackRoutes);
router.use('/attack', attackRoutes);
router.use(errorHandler);

module.exports = router;