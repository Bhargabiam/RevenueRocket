import pool from "../../config/db.js";

// Get All aCustomer
const customers = async () => {
  let query = "SELECT * FROM customer_details";
  const { rows } = await pool.query(query);
  return rows;
};
// Get One Customer Depend on id
const getCustomer = async (id) => {
  let query = "SELECT * FROM customer_details WHERE customer_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};
// Get Customer Depend on Mobile Number
const customerByMobile = async (mobile) => {
  let query = "SELECT * FROM customer_details WHERE customer_mobile = $1";
  const { rows } = await pool.query(query, [mobile]);
  return rows;
};

// Insert a New Customer
const addNewCustomer = async (data) => {
  let { mobile, name, email, address, dob } = data;
  if (dob) {
    const query = `INSERT INTO customer_details (customer_name, customer_mobile, customer_email, customer_address, customer_dob) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
    const { rows } = await pool.query(query, [
      name,
      mobile,
      email,
      address,
      dob,
    ]);
    return rows;
  } else {
    const query = `INSERT INTO customer_details (customer_name, customer_mobile, customer_email, customer_address) VALUES ($1,$2,$3,$4) RETURNING *;`;
    const { rows } = await pool.query(query, [name, mobile, email, address]);
    return rows;
  }
};

export { customers, getCustomer, customerByMobile, addNewCustomer };
