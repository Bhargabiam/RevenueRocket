import {
  salesBetweenDays,
  processBetweenDays,
  fullBetweenDays,
  executiveSale,
  executiveFull,
} from "../../db/user/reportQuery.js";

const salesReport = async (req, res) => {
  const day = req.query.day;
  const month = req.query.month;
  const year = req.query.year;
  const date = year ? [year, "y"] : month ? [month, "m"] : [day, "d"];
  try {
    const result = await salesBetweenDays(date);
    res.status(200).json({ saleReport: result });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const processReport = async (req, res) => {
  const day = req.query.day;
  const month = req.query.month;
  const year = req.query.year;
  const date = year ? [year, "y"] : month ? [month, "m"] : [day, "d"];
  try {
    const result = await processBetweenDays(date);
    res.status(200).json({ processReport: result });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const fullReport = async (req, res) => {
  const day = req.query.day;
  const month = req.query.month;
  const year = req.query.year;
  const date = year ? [year, "y"] : month ? [month, "m"] : [day, "d"];
  try {
    const result = await fullBetweenDays(date);
    res.status(200).json({ fullReport: result });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const executiveSaleReport = async (req, res) => {
  const executiveId = req.params.executiveId;
  const day = req.query.day;
  const month = req.query.month;
  const year = req.query.year;
  const date = year ? [year, "y"] : month ? [month, "m"] : [day, "d"];
  try {
    const result = await executiveSale(date, executiveId);
    res.status(200).json({ executiveSale: result });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const executiveFullReport = async (req, res) => {
  const executiveId = req.params.executiveId;
  const day = req.query.day;
  const month = req.query.month;
  const year = req.query.year;
  const date = year ? [year, "y"] : month ? [month, "m"] : [day, "d"];
  try {
    const result = await executiveFull(date, executiveId);
    res.status(200).json({ executiveFullReport: result });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export {
  salesReport,
  processReport,
  fullReport,
  executiveSaleReport,
  executiveFullReport,
};
