import pool from "../../config/db.js";

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
  retun = rows;
};

export { user, usersList, userByEmail, pendingList, denyPending, allowPending };
