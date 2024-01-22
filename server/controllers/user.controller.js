const {validateRegister} = require('../utils/schemas/register')
const {validateLogin} = require('../utils/schemas/login')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sendEmail = require('../utils/emails/sendEmail');
const message = require('../utils/emails/template/message')


const register = async (req, res) =>{
  try{
      //validation with zod
      const result = validateRegister(req.body)
      if(result.success){
        //create table in database
        await User.sync({alter:true})
        //encript password
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        result.data.password = hashedPassword;
        if (req.file) result.data.image =req.file.filename
        const emailUnique = await User.findOne({where:{email:result.data.email}})
        const usernameUnique =await  User.findOne({where:{username:result.data.username}})
        if(!emailUnique && !usernameUnique){
          await User.create(result.data)
          //send mail notification
          sendEmail(result.data.email,'welcome',message.MessageWelcome(result.data.name));
          return res.status(200).json({ status: 200, message:"Usuario creado"});
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
          return res.status(400).json({ status: 400, error: errors });
        }
      }else{
        return res.status(400).json({status: 400, error: JSON.parse(result.error.message)})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Error interno del servidor' });
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
        return res.status(401).json({status: 401, error:{message:'El email no se encuentra registrado'}})
      }
      const hashedPassword = user.password
      //compare password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if(!passwordMatch){
        return res.status(401).json({ status: 401, error:{message:'La contrasena es incorrecta'}})
      }
      const token = jwt.sign({ user_id: user.user_id ,role:'user' }, process.env.SECRET , { expiresIn: '1h' });
      res.json({ token });
    }else{
      return res.status(400).json({status: 400, error: JSON.parse(result.error.message)})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Error interno del servidor' });
  }
}

const forgotPassword = async (req,res)=>{
  try {
    const email = req.body.email;
    const user = await User.findOne({where:{email:email}});
    if(!user) res.status(404).json({status: 404, error:true, message:"El usuario no se encuentra registrado"});
    else{
      const token = jwt.sign({ user_id: user.user_id, type:'reset_password' }, process.env.SECRET , { expiresIn: '1h' });
      sendEmail(user.email,'Reset Password',message.MessageResetPassword(user.name, token));
      res.status(200).json({ status:200, token:token})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status:500, message:'Error interno en el servidor'})
  }
}

const resetPassword = async (req, res)=>{
  try {
    const user_id = req.user.user_id;
    const user = await User.findOne({where:{user_id:user_id}});
    if(!user) return res.status(404).json({status:404, message:"Usuario no encontrado"})
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.update({password:hashedPassword},{where:{user_id:user_id}})
    sendEmail(user.email,'Confirm Reset Password',message.confirmResetPassword(user.name));
    res.status(200).json({status:200, message:'La contraseña se ha actualizado'})
  } catch (error) {
    console.error(error);
    res.status(500).json({status:500, message:'Error interno en el servidor'})
  }
}

const getAllUser = async (req,res)=>{
  try {
    const users = await User.findAll()
    res.status(200).json({status:200,users})
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Error interno del servidor' });
  }
}

const deleteUser = async (req ,res) =>{
  try {
    const user_id = req.params.user_id;
    await User.destroy({where:{user_id: user_id}})
    res.status(204).json({status: 204,})
  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500, message:'Error interno en el servidor'})
  }
}

const updateUser = async (req, res) =>{
  try {
    const id = req.params.user_id;
    const result = validateRegister(req.body)
    if(result.success){
      await User.update(result.data, {where:{user_id:id}})
      return res.status(200).json({status: 200, message:"Created user"});
    }else{
      return res.status(400).json({status: 400, error: JSON.parse(result.error.message)})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({status: 500, message:'Error interno del servidor' })
  }
}


const getImage = async (req,res)=>{
  try {
    const user_id = req.params.user_id
    const user = await User.findOne({where:{user_id:user_id}})
    res.sendfile('server/storage/imgs/'+user.image);
  } catch (error) {
    res.status(500).json({status: 500, message:error})
  }
}
module.exports = {
  register,
  login,
  getAllUser,
  deleteUser,
  updateUser,
  getImage,
  forgotPassword,
  resetPassword
}