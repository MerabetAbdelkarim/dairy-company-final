const router = require('express').Router()
const cowRoutes = require('../components/cow/routes')
const medical = require('../components/medical/routes')
const milkRoutes = require('../components/milk/routes')


router.use('/cow', cowRoutes);
router.use('/medical', medical);
router.use('/milk', milkRoutes);


module.exports = router