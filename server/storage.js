const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'server/storage/imgs')
    },
    filename:function(req,file,cb){
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`)
    }
})


const upload = multer({storage})

module.exports =upload