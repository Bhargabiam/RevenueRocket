import {
  executiveQuery,
  executiveListQuery,
  newExecutiveQuery,
  deleteExecutiveQuery,
} from "../../db/user/executiveQuerys.js";

const getExecutive = async (req, res) => {
  const executiveId = req.query.executiveId;
  try {
    const result = await executiveQuery(executiveId);
    res.status(200).json({ executive: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExecutiveList = async (req, res) => {
  try {
    const result = await executiveListQuery();
    res.status(200).json({ List: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createExecutive = async (req, res) => {
  const formData = req.body;
  try {
    const result = await newExecutiveQuery(formData);
    res.status(200).json({ newExecutive: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExecutive = async (req, res) => {
  const executiveId = req.query.executiveId;
  try {
    const result = await deleteExecutiveQuery(executiveId);
    res.status(200).json({ deletedExecutive: result[0].executive_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getExecutive, getExecutiveList, createExecutive, deleteExecutive };
