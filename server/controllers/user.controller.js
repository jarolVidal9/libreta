const {validateRegister} = require('../schemas/register')
const {validateLogin} = require('../schemas/login')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const Note = require('../models/note.model')


const register = async (req, res) =>{
  try{
      //validation with zod
      const result = validateRegister(req.body)
      if(result.success){
        //create table in database
        await User.sync()
        await Note.sync()
        //encript password
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        result.data.password = hashedPassword;
        const emailUnique = await User.findOne({where:{email:result.data.email}})
        const usernameUnique =await  User.findOne({where:{username:result.data.username}})
        if(!emailUnique && !usernameUnique){
          await User.create(result.data)
          return res.status(200).json({ message:"Created user"});
        }else{
          const errors = [];
          if (emailUnique) {
            errors.push({
              validation: "email",
              code: "unique_email",
              message: "El correo electrónico ya está registrado",
              path: ["email"],
            });
          }

          if (usernameUnique) {
            errors.push({
              validation: "username",
              code: "unique_username",
              message: "El nombre de usuario ya está en uso",
              path: ["username"],
            });
          }
          return res.status(400).json({ error: errors });
        }
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
      const token = jwt.sign({ userId: user.id }, process.env.SECRET , { expiresIn: '1h' });
      res.json({ token });
    }else{
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const getAllUser = async (req,res)=>{
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const deleteUser = async (req ,res) =>{
  try {
    const user_id = req.params.user_id;
    await User.destroy({where:{user_id: user_id}})
    res.status(204).json({})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error interno en el servidor'})
  }
}

module.exports = {
  register,
  login,
  getAllUser,
  deleteUser
}