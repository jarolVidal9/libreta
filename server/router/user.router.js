const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../storage')

router.post('/register',upload.single('image'),userController.register);
router.post('/login', userController.login);
router.get('/getAllUsers',userController.getAllUser);
router.delete('/deleteUser/:user_id',userController.deleteUser);
router.put('/updateUser/:user_id',userController.updateUser);
router.get('/getImage/:user_id',userController.getImage);


module.exports = router
