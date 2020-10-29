// Importation des packages
const multer = require('multer');

// Déclaration des formats autorisés
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
};

// Déclaration de storage qui permet de sauvegarder les images
// en leur indiquant la destination, et en changeant le nom
// de l'image ainsi que l'extension
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		const name = file.fieldname.split(' ').join('_');   //fieldname pour avoir juste le nom sans l'extention
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + '.' + extension);
	},
});
var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
	  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
		cb(null, true);
	  } else {
		cb(null, false);
		return cb(new Error('Only .png, .gif  .jpg and .jpeg  format allowed!'));
	  }
	}
  
  });
  
  
module.exports = multer({storage: storage}).single('inputFile');

//module.exports = multer({storage: storage}).single('inputFile');