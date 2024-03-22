import { join } from "path";
// import { __dirname } from "../../app.js";

const loginController = async (req, res) => {
  try {
    res.render("pages/login");
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const adminLoginController = async (req, res) => {
  try {
    res.render("pages/adminLogin");
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const dashboardController = async (req, res) => {
  try {
    res.render("pages/dashboard");
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const adminPageController = async (req, res) => {
  try {
    res.render("pages/admin");
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const registerController = async (req, res) => {
  try {
    res.render("pages/register");
  } catch (err) {
    res.status(500).json({ err: "Somthing Was wrong!" });
  }
};

const logoController = async (req, res) => {
  // const imgPath = path.join(__dirname, "/public/uploads/profiles/cat-red.jpg");
  try {
    res.sendFile(
      join(__dirname, "public", "uploads", "profiles", "cat-red.jpg")
    );
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export {
  loginController,
  adminLoginController,
  dashboardController,
  adminPageController,
  registerController,
  logoController,
};
