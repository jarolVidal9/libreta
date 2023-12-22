const express = require('express');
const authController = require('./controllers/authController')

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/register',authController.register);
app.post('/login', authController.login);



app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

