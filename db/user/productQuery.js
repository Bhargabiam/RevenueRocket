import pool from "../../config/db.js";

const product = async (productId) => {
  const query =
    "SELECT * FROM product_list WHERE product_id = $1 AND product_status = true;";
  const { rows } = await pool.query(query, [productId]);
  return rows;
};

const productsList = async () => {
  const query = " SELECT * FROM product_list WHERE product_status = true;";
  const { rows } = await pool.query(query);
  return rows;
};

const newProduct = async (data) => {
  const { product_name } = data;
  const query =
    "INSERT INTO product_list (product_name) VALUES ($1) RETURNING *;";
  const { rows } = await pool.query(query, [product_name]);
  return rows;
};

const deleteProductQuery = async (productId) => {
  const query =
    "UPDATE product_list SET status = false WHERE product_id = $1 RETURNING *;";
  const { rows } = await pool.query(query, [productId]);
  return rows;
};

export { product, productsList, newProduct, deleteProductQuery };
