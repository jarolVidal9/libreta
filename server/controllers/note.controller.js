const Note = require('../models/note.model')

const createNote = async (req,res) =>{
    try {
        const user_id = req.user.user_id;
        await Note.sync({alter:true})
        if (req.file) req.body.images =req.file.filename
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
        if (req.file) req.body.images =req.file.filename
        const id = req.params.note_id;
        const data = req.body
        Note.update(data, {where: {note_id : id}})
        return res.status(200).json({status:200, message:"Nota edita"});
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
        const notes  = await Note.findAll({where:{user_id:user_id},order: [['updatedAt', 'DESC']]})
        const notesWithImageUrls = notes.map(note => {
            if(note.images){
                return {
                    ...note.toJSON(),
                    images: `${process.env.BACKURL}/images/${note.images}`
                };
            }else{
                return note.toJSON()
            }
        });
        res.status(200).json(notesWithImageUrls)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error en el servidor'})
    }
}

const getOneNote = async(req,res)=>{
    try{
        const note_id = req.params.note_id
        const note = await Note.findOne({where:{note_id:note_id}})
        if(note.images) note.images = `${process.env.BACKURL}/images/${note.images}`
        res.status(200).json({status:200, note:note})
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Error en el servidor'})
    }
}
module.exports = {
    createNote,
    editNote,
    deleteNote,
    getNotesByUser,
    getOneNote
}