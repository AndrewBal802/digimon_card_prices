const fs = require('fs');

const db = require('../models');

const uploadFiles = async(req, res) => {
    try{
        console.log(req.file);

        if (req.file == undefined){
            //return res.send('M')
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(__basedir + "/resources/static/assets/uploads/" + req.file.filename)
        }).then((image) => {
            fs.writeFileSync(__basedir + "/resources/static/assets/tmp/" + image.name, image.data);
            
            return res.send('File Uploaded Successfully');

        });
        
       
    }catch (err){
        console.log(error);
        return res.send(`Error when trying to upload images: ${error}`);
    }
};

module.exports = {
    uploadFiles
};