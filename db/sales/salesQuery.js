import pool from "../../config/db.js";
// First check in Customer Table then get Data from Inprocess Table
const processDataList = async (customerId) => {
  let query = `SELECT process_id, customer_name, metal_type, executive_name, product_name, current_status, to_char(followup_date, 'YYYY-MM-DD') as followup_date FROM customer_in_process INNER JOIN customer_details ON customer_details.customer_id = customer_in_process.customer_id INNER JOIN executive_list ON executive_list.executive_id = customer_in_process.executive_id INNER JOIN product_list ON product_list.product_id = customer_in_process.product_id WHERE customer_in_process.customer_id = $1 AND process_status = true;`;
  let { rows } = await pool.query(query, [customerId]);
  return rows;
};

// get Inprocess Data using Processid
const processData = async (processId) => {
  let query = `SELECT *, to_char(followup_date, 'YYYY-MM-DD') as formatted_followup_date, to_char(sale_date, 'YYYY-MM-DD') as formatted_sale_date FROM customer_in_process WHERE process_id = $1 AND process_status = true`;
  const { rows } = await pool.query(query, [processId]);
  return rows;
};

// Add new Inprocess Data into process table
const addProcessData = async (customerId, data) => {
  const {
    sec_mobile,
    customer_type,
    metal_type,
    walkin_source,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    sale_date,
    follwup_date,
    inprocess,
  } = data;
  let query = `INSERT INTO customer_in_process (customer_id, second_mob, customer_type, metal_type, walkin_source, executive_id, associate_id, product_id, fm_name, current_status, non_conversion, remarks, sale_date, followup_date, visit_dates, process_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *;`;
  const { rows } = await pool.query(query, [
    customerId,
    sec_mobile,
    customer_type,
    metal_type,
    walkin_source,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    sale_date,
    follwup_date,
    sale_date,
    inprocess,
  ]);
  return rows;
};
// Get visited dates useing process id;
const visitedDate = async (id) => {
  const query = `SELECT visit_dates FROM customer_in_process WHERE process_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
};

// inprocess patch requests
const editProcessData = async (id, data) => {
  const {
    sec_mobile,
    metal_type,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    sale_date,
    follwup_date,
    inprocess,
  } = data;
  let visitDates = `${sale_date} - Prev. Visit date- `;
  visitDates += await visitedDate(id);
  const query = `UPDATE customer_in_process SET second_mob = $1, metal_type = $2, executive_id = $3, associate_id = $4, product_id =$5, fm_name =$6, current_status = $7, non_conversion = $8, remarks =$9, followup_date = $10, process_status = $11, visit_dates = $12 WHERE process_id = $13 RETURNING *;`;
  const { rows } = await pool.query(query, [
    sec_mobile,
    metal_type,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    follwup_date,
    inprocess,
    visitDates,
    id,
  ]);
  return rows;
};

//  Delete inprocess record using process_id
const deleteProcess = async (id) => {
  const query = `UPDATE customer_in_process SET process_status = false WHERE process_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
};

// Add New Sale Data
const addSaleData = async (id, data) => {
  const {
    sec_mobile,
    customer_type,
    metal_type,
    walkin_source,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    sale_date,
    bill_number,
  } = data;
  const query = `INSERT INTO sales_data (customer_id, second_mob, customer_type, metal_type, walkin_source, executive_id, associate_id, product_id, fm_name, current_status, non_conversion, remarks, sale_date, visit_dates, end_date, bill_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *;`;
  const { rows } = await pool.query(query, [
    id,
    sec_mobile,
    customer_type,
    metal_type,
    walkin_source,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    sale_date,
    sale_date,
    sale_date,
    bill_number,
  ]);
  return rows;
};
// get prcess data "customer_id, customer_type, walkin_source, sale_date, visit_dates"
const processLimitData = async (processid) => {
  const query = `SELECT customer_id, customer_type, walkin_source, sale_date, visit_dates FROM customer_in_process WHERE process_id = $1`;
  const { rows } = await pool.query(query, [processid]);
  return rows;
};

// add sale data from process Data;
const processToSale = async (id, data) => {
  const {
    sec_mobile,
    metal_type,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    sale_date,
    follwup_date,
    bill_number,
  } = data;
  var visitDates = `${sale_date} - Prev. Visit date- `;
  const { customerId, customerType, walkinSource, visit_Dates, saleDate } =
    await processLimitData(id);
  visitDates += visit_Dates;
  const query = `INSERT INTO sales_data (customer_id, second_mob, customer_type, metal_type, walkin_source, executive_id, associate_id, product_id, fm_name, current_status, non_conversion, remarks, sale_date, visit_dates, end_date, bill_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *;`;
  const { rows } = await pool.query(query, [
    customerId,
    sec_mobile,
    customerType,
    metal_type,
    walkinSource,
    executive_name,
    associate_name,
    product_name,
    fm_name,
    current_status,
    non_conversion,
    remarks,
    saleDate,
    visitDates,
    sale_date,
    bill_number,
  ]);
  return rows;
};

export {
  processDataList,
  processData,
  addProcessData,
  visitedDate,
  editProcessData,
  deleteProcess,
  addSaleData,
  processLimitData,
  processToSale,
};
