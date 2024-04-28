
const router = require('express').Router()

const { getMedical, addMedical, updateMedical, deleteMedical, getallMedical } = require('./controllers')


router.route('').get(getMedical).post(addMedical)
router.route('/:id').put(updateMedical).delete(deleteMedical)
router.route('/all').get(getallMedical)


module.exports = router