require('dotenv').config()

const express = require('express');
const userController = require('./controllers/user.controller');
const noteController = require('./controllers/note.controller');
const morgan = require('morgan');
const authUser = require('./middleware/auth')

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"))

app.post('/register',userController.register);
app.post('/login', userController.login);
app.get('/getAllUsers',userController.getAllUser);
app.delete('/deleteUser/:user_id',userController.deleteUser);
app.put('/updateUser/:user_id',userController.updateUser);


app.post('/createNote',authUser,noteController.createNote)
app.put('/editNote/:note_id',authUser,noteController.editNote)
app.delete('/deleteNote/:note_id',authUser,noteController.deleteNote)
app.get('/getNotesByUser',authUser,noteController.getNotesByUser)

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

