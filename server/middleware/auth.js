// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'].split(' ')[1];
//     if(!token) return res.status(401).json({message:'Acceso denegado'})
//     try {
//         const verified = jwt.verify(token, process.env.SECRET)
//         //guarda los datos del token en .user en este caso solo el user_id
//         req.user = verified
//         next()
//     } catch (error) {
//         res.status(400).json({error:'token no es válido'})
//     }
// }

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Buffer } = require('buffer');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        // Intenta verificar el token normalmente
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        // Si la verificación falla, se asume que el token está encriptado
        try {
            const decryptedToken = decryptToken(token);
            
            // Verifica el token desencriptado
            const verified = jwt.verify(decryptedToken, process.env.SECRET);
            req.user = verified;
            next();
        } catch (decryptError) {
            res.status(400).json({ error: 'Token no es válido' });
        }
    }
}

// Función para desencriptar el token
function decryptToken(token) {
    
    const algorithm = 'aes-192-cbc';
    const password = crypto.scryptSync(process.env.SECRET, 'salt', 24);
    const iv = Buffer.alloc(16, 0); 
    const decipher = crypto.createDecipheriv(algorithm, password, iv);
    let decryptedToken = decipher.update(token, 'hex', 'utf8');
    decryptedToken += decipher.final('utf8');
    
    return decryptedToken;
}

module.exports = verifyToken;
