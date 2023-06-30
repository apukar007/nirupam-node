const category = require('../controllers/category');
const express = require('express');
const router = express.Router();

router.get('/', category.getAll);
router.post('/', category.create);

module.exports = router;

