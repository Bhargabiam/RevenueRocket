import { getUser, getUserByEmail, getUsers } from "../../db/user/userQuery.js";
import errorHandler from "../../middleware/error.js";

const userList = async (req, res, next) => {
  console.log(req.sessionID);
  try {
    let userList = await getUsers();
    res.status(200).json({ userList: userList });
  } catch (err) {
    next(err);
  }
};

const user = async (req, res, next) => {
  let id = req.params.id;
  try {
    let user = await getUser(id);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
};

const userByEmail = async (req, res, next) => {
  let email = req.params.email;
  try {
    let user = await getUser(email);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
};
export { userList };
