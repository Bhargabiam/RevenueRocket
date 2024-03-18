import {
  user,
  usersList,
  userByEmail,
  pendingList,
  denyPending,
  allowPending,
} from "../../db/user/userQuery.js";
import passport from "passport";

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

const userLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
  });
  res.status(200).send("You have been logged out");
};

const fileUpload = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
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
  logout,
  checkUser,
  fileUpload,
};
