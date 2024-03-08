import {
  processDataList,
  processData,
  addProcessData,
  visitedDate,
  editProcessData,
  deleteProcess,
  addSaleData,
  processLimitData,
  processToSale,
} from "../../db/sales/salesQuery.js";
import { customerByMobile } from "../../db/customer/customerQuery.js";

const processDataByMobile = async (req, res) => {
  const mobile = req.query.mobile;
  const customer = await customerByMobile(mobile);
  if (customer.length === 0) {
    res.status(404).json({ message: "Cutomer Not found" });
  } else {
    try {
      const processData = await processDataList(customer[0].customer_id);
      if (processData.length === 0) {
        res
          .status(404)
          .json({ message: "No Process data found for this customer" });
      } else {
        res.status(200).json({ processData: processData });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const processDataById = async (req, res) => {
  const id = req.query.processId;
  try {
    const data = await processData(id);
    if (data.length === 0) {
      res.status(404).json({ message: "No In Process data found" });
    } else {
      res.status(200).json({ processData: data });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addNewProcessData = async (req, res) => {
  const customerId = req.params.customerId;
  const formData = req.body;
  try {
    const data = await addProcessData(customerId, formData);
    if (data.length === 0) {
      res.status(400).json({ error: "Bad Request - Form data not submitted" });
    } else {
      res.status(200).json({ message: "Form data submitted sucsesfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const patchProcessData = async (req, res) => {
  const customerId = req.params.processId;
  const formData = req.body;
  try {
    const data = await editProcessData(customerId, formData);
    if (data.length === 0) {
      res.status(400).json({ error: "Bad Request - Form data not submitted" });
    } else {
      res.status(200).json({ message: "Process data updated sucsesfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const processDisable = async (req, res) => {
  const processId = req.params.processId;
  try {
    const response = await deleteProcess(processId);
    if (response === 0) {
      res.status(400).json({ error: "Something Was wrong" });
    } else {
      res.status(200).json({ message: "Process data deleted sucsesfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const newSaleData = async (req, res) => {
  const customerId = req.params.customerId;
  const formData = req.body;
  try {
    const response = await addSaleData(customerId, formData);
    if (response.length == 0) {
      res.status(400).json({ error: "Bad Request - Form data not submitted" });
    } else {
      res.status(200).json({ submittedData: response });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const processLimitedData = async (req, res) => {
  const processId = req.params.processId;
  try {
    const response = await processLimitData(processId);
    if (response.length == 0) {
      res.status(400).json({ error: "No Data Found" });
    } else {
      res.status(200).json({ inprocessData: response });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const inprocessToSale = async (req, res) => {
  const processId = req.params.processId;
  const formData = req.body;
  try {
    const response = await processToSale(processId, formData);
    if (response.length == 0) {
      res.status(400).json({ error: "No Data Found" });
    } else {
      res.status(200).json({ inprocessData: response });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  processDataByMobile,
  processDataById,
  addNewProcessData,
  patchProcessData,
  processDisable,
  newSaleData,
  processLimitedData,
  inprocessToSale,
};
