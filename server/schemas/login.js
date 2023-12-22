const z = require('zod')


const loginSchema = z.object({
    user: z.require({
        required_error: "Debes ingresar un valor"
    }).min(3),
    password: z.require().string().min(5).max(15)
})

function validateLogin(object){
    return loginSchema.safeParse(Object)
}

module.exports = {
    validateLogin
}