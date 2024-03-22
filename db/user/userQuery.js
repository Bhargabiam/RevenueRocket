import pool from "../../config/db.js";
import { hashPassword } from "../../utils/bcrypt.js";

const usersList = async () => {
  let query = "SELECT * FROM user_list WHERE user_status = true;";
  const { rows } = await pool.query(query);
  return rows;
};

const user = async (userId) => {
  let query =
    "SELECT * FROM user_list WHERE user_id = $1 AND user_status = true;";
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

const userByEmail = async (email) => {
  let query =
    "SELECT * FROM user_list WHERE email = $1 AND user_status = true;";
  const { rows } = await pool.query(query, [email]);
  return rows;
};

const pendingList = async () => {
  const query =
    "SELECT user_id,user_name,email,roll,TO_CHAR(create_date, 'YYYY-MM-DD') AS create_date FROM user_list WHERE allow_status = true;";
  const { rows } = await pool.query(query);
  return rows;
};

const allowPending = async (userId) => {
  const query =
    "UPDATE user_list SET allow_status = false, user_status = true WHERE user_id = $1 RETURNING user_name;";
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

const denyPending = async (userId) => {
  const query =
    "UPDATE user_list SET allow_status = false WHERE user_id = $1 RETURNING user_name;";
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

const createUserQuery = async (formData, filename) => {
  const { name, email, password, roll } = formData;
  let date = new Date();
  const query =
    "INSERT INTO user_list (user_name, email, password, roll, create_date ) VALUES ($1,$2,$3,$4,$5) RETURNING user_name, email, roll, create_date;";
  const hpass = await hashPassword(password);
  const { rows } = await pool.query(query, [name, email, hpass, roll, date]);
  return rows;
};

const brandUploadQuery = async (name, image) => {
  const query = "INSERT INTO brand (name, logo) VALUES ($1, $2) RETURNING *;";
  const { rows } = await pool.query(query, [name, image]);
  return rows;
};

export {
  user,
  usersList,
  userByEmail,
  pendingList,
  denyPending,
  allowPending,
  createUserQuery,
  brandUploadQuery,
};
