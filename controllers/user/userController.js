import { user, usersList, userByEmail } from "../../db/user/userQuery.js";
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
  let userId = req.params.id;
  try {
    let result = await user(userId);
    res.status(200).json({ user: result });
  } catch (err) {
    next(err);
  }
};

const userEmail = async (req, res, next) => {
  let email = req.params.email;
  try {
    let result = await userByEmail(email);
    res.status(200).json({ user: result });
  } catch (err) {
    next(err);
  }
};
export { getUser, userList, userEmail };
