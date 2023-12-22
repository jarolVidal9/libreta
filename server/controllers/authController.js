const {validateRegister} = require('../schemas/register')
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const query ='INSERT INTO users (email, username, name, last_name,gender, date_of_birth, password, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [email, username, name, last_name, gender, date_of_birth, hashedPassword, image];
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
    
  } catch (error) {
    
  }
}


module.exports = {
  register,
  login
}