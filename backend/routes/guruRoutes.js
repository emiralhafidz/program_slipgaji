const express = require("express");
const router = express.Router();
const {
  getAllGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru,
} = require("../controllers/guruControllers");

router.get('/', getAllGuru)
router.get('/:id', getGuruById)
router.post('/', createGuru)
router.put('/:id', updateGuru)
router.delete('/:id', deleteGuru)

module.exports = router;
