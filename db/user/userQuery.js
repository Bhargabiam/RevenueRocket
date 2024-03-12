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

export { user, usersList, userByEmail };
