const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const authguard = require('../middlewares/authguard')

//router.get('/', authguard, user.getAll);
router.get('/', user.getAll);
router.post('/register', user.register);
router.post('/login', user.login);
router.delete('/delete/:id', user.delete);

module.exports = router;