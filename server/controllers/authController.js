const {validateRegister} = require('../schemas/register')
const {validateLogin} = require('../schemas/login')
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const register = async (req, res) =>{
  try{
      //validation with zod
      const result = validateRegister(req.body)
      if(result.success){
        await User.sync()
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        result.data.password = hashedPassword;
        const createUser = await User.create(result.data)
        return res.status(200).json({ message:"Created user"});
      }else{
        return res.status(400).json({error: JSON.parse(result.error.message)})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
}
const login = async (req, res) =>{
  try {
    const result = validateLogin(req.body)
    if (result.success){
      const {email , password} = result.data;
      //search the user for email
      const user = await User.findOne({where:{email:email}})
      if (!user){
        return res.status(401).json({error:{message:'El email no se encuentra registrado'}})
      }
      const hashedPassword = user.password
      //compare password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if(!passwordMatch){
        return res.status(401).json({error:{message:'La contrasena es incorrecta'}})
      }
      const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
      res.json({ token });
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