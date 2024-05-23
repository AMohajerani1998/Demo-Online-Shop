const multer = require("multer");
const uuid = require("uuid").v4;

    const storageConfig = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, uuid() + "-" + file.originalname);
        },
        destination: function (req, file, cb) {
            cb(null, "product-data/images");
        },
    });

    const upload = multer({ storage: storageConfig });
    const configuredMulterMiddleware = upload.single('image')


module.exports = configuredMulterMiddleware;
