const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register',userController.register);
router.post('/login', userController.login);
router.get('/getAllUsers',userController.getAllUser);
router.delete('/deleteUser/:user_id',userController.deleteUser);
router.put('/updateUser/:user_id',userController.updateUser);


module.exports = router
