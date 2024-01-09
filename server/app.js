require('dotenv').config()

const express = require('express');
const userController = require('./controllers/user.controller');
const morgan = require('morgan');

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"))

app.post('/register',userController.register);
app.post('/login', userController.login);
app.get('/getAllUsers',userController.getAllUser);
app.delete('/deleteUser/:user_id',userController.deleteUser);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

