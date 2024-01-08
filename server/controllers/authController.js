const {validateRegister} = require('../schemas/register')
const {validateLogin} = require('../schemas/login')
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const register = async (req, res) =>{
  try{
      //validation with zod
      const result = validateRegister(req.body)
      if(result.success){
        //get the values ​​after validating them 
        const { email, username, gender, name, last_name, date_of_birth, password , image} = result.data;
        //Encript the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Save in the DB
        const id = uuid.v4();
        const query ='INSERT INTO users (id, email, username, name, last_name,gender, date_of_birth, password, image) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [id, email, username, name, last_name, gender, date_of_birth, hashedPassword, image];
        const consulta = await connection.execute(query, values);
        return res.status(200).json({ message: req.body});
      }else{
        return res.status(400).json({error: JSON.parse(result.error.message)})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
}
const login = (req, res) =>{
  try {
    const result = validateLogin(req.body)
    if (result.success){
      const {email , password} = result.data;
      const query = 'SELECT * FROM users WHERE email = ?';
      connection.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos' });
        if (results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });
        const hashedPassword = results[0].password;
        // Comparar la contraseña proporcionada con la contraseña almacenada
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) return res.status(401).json({ message: 'Credenciales inválidas' });
        // Generar un token JWT
        const token = jwt.sign({ userId: results[0].id }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
      });
    }else{
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


module.exports = {
  register,
  login
}