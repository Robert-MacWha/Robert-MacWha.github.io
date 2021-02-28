const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '/public/images/project-cards');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload an image.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
  
exports.uploadUserPhoto = upload.single('image');