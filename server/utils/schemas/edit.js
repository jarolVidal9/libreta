const z = require("zod")

const RegisterScheme  = z.object({
        username: z.string({
            required_error: "El nombre de usuario es requerido",
            invalid_type_error: "El nombre de usuario debe ser string"}
        ).min(5,{message:"El usuario debe tener al menos 5 caracteres"})
        .max(20,{message:"El usuario no debe tener mas de 20 caracteres"}),

        name: z.string({
            required_error: "El nombre es requerido",
            invalid_type_error: "El nombre debe ser string"
        }),
        
        last_name: z.string({
            required_error: "El nombre de usuario es requerido",
            invalid_type_error: "El nombre de usuario debe ser string"
        }),

        date_of_birth: z.coerce.date({
            required_error: "Debe ingresar una fecha de nacimiento",
            invalid_type_error: "La fecha de nacimiento tiene un formato incorrecto"}
        ),
        gender: z.string(),

        email: z.string({ 
            required_error: "El correo es requerido",
        }).email({
            message:"Debe ingresar un correo válido"}
        ),
        
        password: z.string({required_error: "Debes ingresar una contraseña",
        }).min(5, {message:"La contraseña debe tener al menos 5 caracteres"}).max(20,{message:"La contraseña no debe tener mas de 20 caracteres"}),  
        
        image: z.nullable(z.string())
});

function validateEdit(object){
    return RegisterScheme.safeParse(object)
}

module.exports = {
    validateEdit
}