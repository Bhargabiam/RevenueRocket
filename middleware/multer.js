import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profiles");
  },
  filename: function (req, file, cb) {
    if (!req.user || !req.user.user_id) {
      return cb("User id is required", null);
    }
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return cb("Only JPG and PNG files are allowed", null);
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return cb("File size exceeds the limit of 5MB", null);
    }
    const filename = `${req.user.user_id}}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

export default upload;
