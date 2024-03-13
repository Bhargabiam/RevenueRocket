import pool from "../../config/db.js";
import { beforeDate } from "../../utils/date.js";

const salesBetweenDays = async (days) => {
  const [firstDate, lastDate] = beforeDate(days);
  const query = `SELECT cd.customer_name as "Name",sd.bill_number as "Bill Number",sd.second_mob as "Bill Mobile",sd.customer_type as "Type",sd.metal_type as "Metal",sd.walkin_source as "Source",cl.executive_name as "Executive",al.executive_name as "Associate",pl.product_name as "Product",sd.fm_name as "Manager",sd.current_status as "Status",sd.non_conversion as "Reason",sd.remarks as "Remarks", To_CHAR(DATE(sd.sale_date), 'YYYY-MM-DD') as "Start Date", sd.visit_dates as "Visit Dates", To_CHAR(DATE(sd.end_date), 'YYYY-MM-DD') as "End Date" FROM sales_data sd JOIN customer_details cd ON sd.customer_id = cd.customer_id JOIN executive_list cl ON sd.executive_id = cl.executive_id JOIN executive_list al ON sd.associate_id = al.executive_id JOIN product_list pl ON sd.product_id = pl.product_id WHERE sd.end_date BETWEEN $1 AND $2 AND sd.sales_status = true;`;
  const { rows } = await pool.query(query, [firstDate, lastDate]);
  return rows;
};

const processBetweenDays = async (days) => {
  const [firstDate, lastDate] = beforeDate(days);
  const query = `SELECT cd.customer_name as "Name",cd.customer_mobile as "Mobile",cp.second_mob as "Sec Mobile",cp.customer_type as "Type",cp.metal_type as "Metal",cp.walkin_source as "Source",cl.executive_name as "Executive",al.executive_name as "Associate",pl.product_name as "Product",cp.fm_name as "Manager",cp.current_status as "Status",cp.non_conversion as "Reason",cp.remarks as "Remarks",TO_CHAR(DATE(cp.sale_date), 'YYYY-MM-DD') as "Start Date",cp.visit_dates as "Visit Dates", To_CHAR(DATE(cp.followup_date), 'YYYY-MM-DD') as "Next Date" FROM customer_in_process cp JOIN customer_details cd ON cp.customer_id = cd.customer_id JOIN executive_list cl ON cp.executive_id = cl.executive_id JOIN executive_list al ON cp.associate_id = al.executive_id JOIN product_list pl ON cp.product_id = pl.product_id WHERE cp.process_status = true AND (cp.sale_date BETWEEN $1 AND $2 OR cp.followup_date BETWEEN $1 AND $2);`;
  const { rows } = await pool.query(query, [firstDate, lastDate]);
  return rows;
};

const fullBetweenDays = async (days) => {
  const [firstDate, lastDate] = beforeDate(days);
  const query = `SELECT NULL AS "Last Status",cd.customer_name AS "Name",cd.customer_mobile AS "Mobile",sd.bill_number AS "Bill Id",sd.second_mob AS "Bill Mob",sd.metal_type AS "Metal",el.executive_name AS "Executive",ael.executive_name AS "Associate",pl.product_name AS "Product",sd.current_status AS "Status",sd.non_conversion AS "Resoin",sd.remarks AS "Remarks",TO_CHAR(DATE(sd.sale_date), 'YYYY-MM-DD') AS "Start",NULL AS "Next followup",TO_CHAR(DATE(sd.end_date), 'YYYY-MM-DD') AS "End",sd.visit_dates AS "Visits" FROM public.sales_data sd JOIN public.customer_details cd ON sd.customer_id = cd.customer_id JOIN public.executive_list el ON sd.executive_id = el.executive_id JOIN public.executive_list ael ON sd.associate_id = ael.executive_id JOIN public.product_list pl ON sd.product_id = pl.product_id WHERE sd.sales_status = true AND sd.end_date BETWEEN $1 AND $2 UNION ALL SELECT cip.process_status,cd.customer_name AS "Name",cd.customer_mobile AS "Mobile",NULL AS bill_number,cip.second_mob AS "Bill Mob",cip.metal_type AS "Metal",el.executive_name AS "Executive",ael.executive_name AS "Associate",pl.product_name AS "Product",cip.current_status AS "Status",cip.non_conversion AS "Reson",cip.remarks AS "Remark",TO_CHAR(DATE(cip.sale_date), 'YYYY-MM-DD') AS "Start",TO_CHAR(DATE(cip.followup_date), 'YYYY-MM-DD') as "Next followup",NULL AS end_date,cip.visit_dates AS "Visit" FROM public.customer_in_process cip JOIN public.customer_details cd ON cip.customer_id = cd.customer_id JOIN public.executive_list el ON cip.executive_id = el.executive_id JOIN public.executive_list ael ON cip.associate_id = ael.executive_id JOIN public.product_list pl ON cip.product_id = pl.product_id WHERE cip.sale_date BETWEEN $1 AND $2 AND cip.followup_date BETWEEN $1 AND $2 AND cip.process_status = true ORDER BY "Start";`;
  const { rows } = await pool.query(query, [firstDate, lastDate]);
  return rows;
};

const executiveSale = async (days, executiveId) => {
  const [firstDate, lastDate] = beforeDate(days);
  const query = `SELECT cd.customer_name AS "Name",cd.customer_mobile AS "Mobile",sd.bill_number AS "Bill No",sd.second_mob AS "Bill/2nd Mob",sd.customer_type AS "Type",sd.walkin_source AS "Walk In",el.executive_name AS "Executive",al.executive_name AS "Associate",pl.product_name AS "Product",sd.fm_name AS "Maneger",sd.current_status AS "Status",sd.non_conversion AS "Reason",sd.remarks AS "Remark",To_CHAR((sd.sale_date),'YYYY-MM-DD') AS "Start",sd.visit_dates AS "Visit Dates",To_CHAR((sd.end_date), 'YYYY-MM-DD') AS "End" FROM sales_data sd JOIN customer_details cd ON cd.customer_id = sd.customer_id JOIN executive_list el ON el.executive_id = sd.executive_id JOIN executive_list al ON al.executive_id = sd.associate_id JOIN product_list pl ON pl.product_id = sd.product_id WHERE sd.end_date BETWEEN $1 AND $2 AND sd.sales_status = true AND (sd.executive_id = $3 OR sd.associate_id = $3)`;
  const { rows } = await pool.query(query, [firstDate, lastDate, executiveId]);
  return rows;
};

const executiveFull = async (days, executiveId) => {
  const [firstDate, lastDate] = beforeDate(days);
  const query = `SELECT NULL AS "Last Status",cd.customer_name AS "Name",cd.customer_mobile AS "Mobile",sd.bill_number AS "Bill No",sd.second_mob AS "Bill/2nd Mob",sd.customer_type AS "Type",sd.walkin_source AS "Walk In",el.executive_name AS "Executive",al.executive_name AS "Associate",pl.product_name AS "Product",sd.fm_name AS "Maneger",sd.current_status AS "Status",sd.non_conversion AS "Reason",sd.remarks AS "Remark",To_CHAR((sd.sale_date), 'YYYY-MM-DD') AS "Start",sd.visit_dates AS "Visit Dates",To_CHAR((sd.end_date), 'YYYY-MM-DD') AS "End",NULL AS "Follow Up" FROM sales_data sd JOIN customer_details cd ON cd.customer_id = sd.customer_id JOIN executive_list el ON el.executive_id = sd.executive_id JOIN executive_list al ON al.executive_id = sd.associate_id JOIN product_list pl ON pl.product_id = sd.product_id WHERE sd.end_date BETWEEN $1 AND $2 AND sd.sales_status = true AND (sd.executive_id = $3 OR sd.associate_id = $3) UNION ALL SELECT cp.process_status AS "Last Status",cd.customer_name AS "Name",cd.customer_mobile AS "Mobile",NULL AS "Bill No",cp.second_mob AS "Bill/2nd Mob",cp.customer_type AS "Type",cp.walkin_source AS "Walk In",el.executive_name AS "Executive",al.executive_name AS "Associate",pl.product_name AS "Product",cp.fm_name AS "Maneger",cp.current_status AS "Status",cp.non_conversion AS "Reason",cp.remarks AS "Remark",To_CHAR((cp.sale_date), 'YYYY-MM-DD') AS "Start",cp.visit_dates AS "Visit Dates", NULL AS "End",To_CHAR((cp.followup_date), 'YYYY-MM-DD') AS "Follow Up" FROM customer_in_process cp JOIN customer_details cd ON cd.customer_id = cp.customer_id JOIN executive_list el ON el.executive_id = cp.executive_id JOIN executive_list al ON al.executive_id = cp.associate_id JOIN product_list pl ON pl.product_id = cp.product_id WHERE (cp.sale_date BETWEEN $1 AND $2 OR cp.followup_date BETWEEN $1 AND $2) AND cp.process_status = true AND (cp.executive_id = $3 OR cp.associate_id = $3) ORDER BY "Start";`;
  const { rows } = await pool.query(query, [firstDate, lastDate, executiveId]);
  return rows;
};

export {
  salesBetweenDays,
  processBetweenDays,
  fullBetweenDays,
  executiveSale,
  executiveFull,
};
