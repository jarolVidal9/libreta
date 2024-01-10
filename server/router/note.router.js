const express = require('express')
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authUser = require('../middleware/auth')

router.post('/createNote',authUser,noteController.createNote)
router.put('/editNote/:note_id',authUser,noteController.editNote)
router.delete('/deleteNote/:note_id',authUser,noteController.deleteNote)
router.get('/getNotesByUser',authUser,noteController.getNotesByUser)

module.exports = router
