const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});

const uploadFile = async (req,res) => {
    
    const file = req.file;
    console.log(file);
    try {
        if (!file) return null;

        const response = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto"
        });
        
        console.log(response.url);
        fs.unlinkSync(file.path); 
        console.log(response.url);
        res.json(response.url);
    } catch (error) {
        console.log("error");
        fs.unlinkSync(file.path);
        return error;
    }
}

module.exports = { uploadFile };
