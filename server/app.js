require('dotenv').config()
//variables de desarrollo
const express = require('express');
const morgan = require('morgan');
//importar rutas
const userRouter = require('./router/user.router')
const noteRouter = require('./router/note.router')

//incializar
const app = express();
const PORT =  process.env.PORT || 3000;
app.use(express.json());
app.use(morgan("dev"))

//rutas
app.use('/',userRouter);
app.use('/',noteRouter);

//incia el servidor en un puerto
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

