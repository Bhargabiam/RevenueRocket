import { Image } from "image-js";

// const resizeImage = async (req, res, next) => {
//   if (!req.file) {
//     return next(new Error("No file uploaded"));
//   }

//   try {
//     const image = await Image.load(req.file.path);
//     const resizedImage = image.resize({ width: 36, height: 30 });
//     await resizedImage.save(req.file.path);
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const resizeImage = async (path, width, height) => {
  try {
    const image = await Image.load(path);
    const resizedImage = image.resize({ width: width, height: height });
    await resizedImage.save(path);
  } catch (error) {
    console.error(error);
  }
};
export default resizeImage;
