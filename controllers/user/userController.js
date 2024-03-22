import {
  user,
  usersList,
  userByEmail,
  pendingList,
  denyPending,
  allowPending,
  createUserQuery,
  brandUploadQuery,
} from "../../db/user/userQuery.js";
import passport from "passport";
import Multer from "../../middleware/multer.js";
import resizeImage from "../../utils/imageJs.js";

const userList = async (req, res, next) => {
  try {
    let userList = await usersList();
    res.status(200).json({ userList: userList });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  let userId = req.query.userId;
  try {
    let result = await user(userId);
    res.status(200).json({ user: result });
  } catch (err) {
    next(err);
  }
};

const userEmail = async (req, res, next) => {
  let email = req.query.email;
  try {
    let result = await userByEmail(email);
    res.status(200).json({ user: result });
  } catch (err) {
    next(err);
  }
};

const userPending = async (req, res) => {
  try {
    const result = await pendingList();
    res.status(200).json({ pendingList: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allowUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const result = await allowPending(userId);
    res.status(200).json({ userName: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const denyUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const result = await denyPending(userId);
    res.status(200).json({ userName: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userLogin = async (req, res, next) => {
  await passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(403).json({ error: "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
};

const userRegister = async (req, res) => {
  const { name, email, password, roll } = req.body;
  try {
    const checkUser = (await userByEmail(email))[0];
    if (checkUser) {
      res.status(400).json({ error: "User already registered" });
      // throw new Error("User already registered");
    } else {
      const newUser = await createUserQuery(req.body);
      res.status(200).json({ newUser: newUser[0] });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

const adminLogin = (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === "admin" && password === "admin") {
      res.status(200).json({ status: "Authenticated" });
    } else {
      res.status(403).json({ message: "wrong cradential" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
  });
  res.redirect("/login");
};

const fileUpload = async (req, res) => {
  try {
    const name = req.body.name;
    const image = req.file.filename;
    // resizeImage(req.file.path, 36, 30);
    const rows = await brandUploadQuery(name, image);
    res.status(200).json({ details: rows });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const checkUser = (req, res) => {
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (err, session) => {
    console.log(session);
  });
  return req.isAuthenticated()
    ? res.status(200).json({ user: req.user })
    : res.status(401).json({ error: "User not authenticated" });
};

export {
  getUser,
  userList,
  userEmail,
  userPending,
  allowUser,
  denyUser,
  userLogin,
  userRegister,
  adminLogin,
  logout,
  checkUser,
  fileUpload,
};
