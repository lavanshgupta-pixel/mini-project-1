const multer = require('multer');


//disk storage 
const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './public/images/uploads');
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }

});

//export upload variable 

const upload = multer({ storage });
module.exports = upload;

 