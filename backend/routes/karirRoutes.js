const express = require('express')

const router = express.Router();
const {getAllKarir, getkarirById,  createKarir, updateKarir, deleteKarir} =require('../controllers/karirControllers')


router.get('/', getAllKarir)
router.get('/:id', getkarirById)
router.post('/', createKarir)
router.put('/:id', updateKarir)
router.delete('/:id', deleteKarir)

module.exports = router;