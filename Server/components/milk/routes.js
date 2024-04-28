
const router = require('express').Router()

const { addMilk,getMilks,updateMilk,deleteMilk, getallMilks } = require('./controllers')


router.route('').get(getMilks).post(addMilk)
router.route('/:id').put(updateMilk).delete(deleteMilk)
router.route('/all').get(getallMilks)


module.exports = router