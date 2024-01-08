const express = require('express');
const authController = require('./controllers/authController');
const morgan = require('morgan');

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"))

app.post('/register',authController.register);
app.post('/login', authController.login);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

