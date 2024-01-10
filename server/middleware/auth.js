const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if(!token) return res.status(401).json({message:'Acceso denegado'})
    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({error:'token no es válido'})
    }
}

module.exports = verifyToken;