const z = require('zod')

const loginSchema = z.object({
    email: z.string({ 
        required_error: "El correo es requerido",
    }).email({
        message:"Debe ingresar un correo válido"}
    ),
    password: z.string({required_error: "Debes ingresar una contraseña",
        }).min(5, {message:"La contraseña debe tener al menos 5 caracteres"}).max(20,{message:"La contraseña no debe tener mas de 20 caracteres"}),
})

function validateLogin(Object){
    return loginSchema.safeParse(Object)
}

module.exports = {
    validateLogin
}