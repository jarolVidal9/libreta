const express = require('express')
const router = express.Router();
const noteController = require('../controllers/note.controller');
const upload = require('../storage')
const authUser = require('../middleware/auth')


router.post('/createNote',authUser, upload.single('image'),noteController.createNote)
router.put('/editNote/:note_id',authUser,noteController.editNote)
router.delete('/deleteNote/:note_id',authUser,noteController.deleteNote)
router.get('/getNotesByUser',authUser,noteController.getNotesByUser)
router.get('/getOneNote/:note_id',authUser, noteController.getOneNote)

module.exports = router
