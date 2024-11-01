const multer = require("multer"); // npm i multer
var storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public')
  },
  filename: function (_req, file, cb) {
    // Generate a unique filename using timestamp and random string
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  }
})
const fileFilter = (_req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Le format du fichier n'est pas valide. Veuillez télécharger une image.");
    error.code = "INVALID_FILE_TYPE";
    return cb(error, false);
  }
  cb(null, true);
};
var uploadFile = multer({ storage: storage ,
  fileFilter: fileFilter // Ajout du filtre de fichier

});
module.exports = uploadFile;