import pool from "../../config/db.js";

const getUsers = async () => {
  let query = "SELECT * FROM user_list";
  const { rows } = await pool.query(query);
  return rows;
};

const getUser = async (id) => {
  let query = "SELECT * FROM user_list WHERE user_id = $1;";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

const getUserByEmail = async (email) => {
  let query = "SELECT * FROM user_list WHERE email = $1;";
  const { rows } = await pool.query(query, [email]);
  return rows;
};

export { getUser, getUserByEmail, getUsers };
