import pool from "../../config/db.js";

const executiveQuery = async (executiveId) => {
  const query =
    "SELECT * FROM executive_list WHERE executive_id = $1 AND executive_status = true;";
  const { rows } = await pool.query(query, [executiveId]);
  return rows;
};

const executiveListQuery = async () => {
  const query = "SELECT * FROM executive_list WHERE executive_status = true;";
  const { rows } = await pool.query(query);
  return rows;
};

const newExecutiveQuery = async (data) => {
  const { executive_name } = data;
  const query =
    "INSERT INTO executive_list (executive_name) VALUES ($1) RETURNING *;";
  const { rows } = await pool.query(query, [executive_name]);
  return rows;
};

const deleteExecutiveQuery = async (executiveId) => {
  const query =
    "UPDATE executive_list SET executive_status = false WHERE executive_id = $1 RETURNING *;";
  const { rows } = await pool.query(query, [executiveId]);
  return rows;
};

export {
  executiveQuery,
  executiveListQuery,
  newExecutiveQuery,
  deleteExecutiveQuery,
};
