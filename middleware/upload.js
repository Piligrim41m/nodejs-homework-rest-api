const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.resolve('./tmp'));
    },
    filename: (req, file, cd) => {
        const [filename, extention] = file.originalname.split('.');
        cd(null, `${filename}.${extention}`);
    },
})

const upload = multer({ storage })

module.exports = upload