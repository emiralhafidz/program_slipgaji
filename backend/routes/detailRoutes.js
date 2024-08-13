const express = require('express')
const router = express.Router();
const {getAllDetail, getDetailById, createDetail, updateDetail, deleteDetail} = require('../controllers/detailControllers')


router.get('/', getAllDetail)
router.get('/:id', getDetailById)
router.post('/', createDetail)
router.put('/:id', updateDetail)
router.delete('/:id', deleteDetail)

module.exports = router