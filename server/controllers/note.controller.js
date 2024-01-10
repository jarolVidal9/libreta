const Note = require('../models/note.model')

const createNote = async (req,res) =>{
    try {
        const user_id = req.user.user_id;
        console.log(req.user.user_id);
        const data = req.body
        data.user_id = user_id;
        Note.create(data)
        return res.status(200).json({ message:"Nota creada"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error en el servidor'})
    }
}


const editNote = async (req,res) =>{
    try {
        const id = req.params.note_id;
        const data = req.body
        Note.update(data, {where: {note_id : id}})
        return res.status(200).json({ message:"Nota edita"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error en el servidor'})
    }
}

const deleteNote = async(req, res)=>{
    try {
        const id = req.params.note_id
        Note.destroy({where:{note_id:id}})
        return res.status(200).json({ message:"Nota eliminada"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error en el servidor'})

    }
}

const getNotesByUser = async (req, res)=>{
    try {
        const user_id = req.user.user_id
        const notes  = await Note.findAll({where:{user_id:user_id}})
        res.status(200).json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error en el servidor'})
    }
}
module.exports = {
    createNote,
    editNote,
    deleteNote,
    getNotesByUser
}