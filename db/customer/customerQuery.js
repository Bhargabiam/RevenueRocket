import pool from "../../config/db.js";

const getCustomer = async (id) => {
  console.log(id);
  let query = "SELECT * FROM customer_details WHERE customer_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

export { getCustomer };
