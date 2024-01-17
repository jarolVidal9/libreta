require('dotenv').config()
//variables de desarrollo
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//importar rutas
const userRouter = require('./router/user.router')
const noteRouter = require('./router/note.router')

//incializar
const app = express();
const PORT =  process.env.PORT || 3000;

//configuracion de cors para aceptar request de front
app.use(cors({
  origin: 'http://localhost:4200', // Reemplaza con la URL de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"))

//rutas
app.use('/user/',userRouter);
app.use('/note/',noteRouter);

//incia el servidor en un puerto
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});



