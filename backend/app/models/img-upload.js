const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb("Upload img files only", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-digimon_cards-${file.originalname}`);
    }
});


var uploadFile = multer({storage: storage, fileFilter: imageFilter});
module.exports = uploadFile;