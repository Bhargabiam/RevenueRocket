import {
  user,
  usersList,
  userByEmail,
  pendingList,
  denyPending,
  allowPending,
} from "../../db/user/userQuery.js";
import errorHandler from "../../middleware/error.js";

const userList = async (req, res, next) => {
  console.log(req.sessionID);
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

export { getUser, userList, userEmail, userPending, allowUser, denyUser };
