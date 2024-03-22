import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profiles");
  },
  filename: function (req, file, cb) {
    const name = req.body.name.replace(/\s/g, "");
    const filename = `${name}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG and PNG files are allowed"), false);
  }
  if (file.size > 5 * 1024 * 1024) {
    return cb(new Error("File size exceeds the limit of 5MB"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
