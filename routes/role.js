const roleConroller = require('../controllers/role');
const express = require('express');
const router = express.Router();
const { authguard, admin } = require('../middlewares/authguard');

router.get('/', roleConroller.getAll);
router.post('/', roleConroller.create);
router.put('/', [authguard, admin], roleConroller.update);
router.delete('/', [authguard, admin], roleConroller.delete);


module.exports = router;