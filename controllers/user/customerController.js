import {
  customers,
  getCustomer,
  customerByMobile,
  addNewCustomer,
} from "../../db/user/customerQuery.js";

const customerList = async (req, res, next) => {
  try {
    const customerList = await customers();
    if (customerList.length > 0) {
      res.status(200).json({ customer_List: customerList });
    } else {
      res.status(404).json({ message: "No Data found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCustomerData = async (req, res) => {
  let customerId = req.query.id;
  try {
    const customer = await getCustomer(customerId);
    if (customer.length > 0) {
      res.status(200).json({ customer: customer });
    } else {
      res.status(404).json({ message: "No Data found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const customerMobile = async (req, res) => {
  const mobile = req.query.mobile;
  try {
    const customer = await customerByMobile(mobile);
    if (customer.length > 0) {
      res.status(200).json({ customer: customer });
    } else {
      res.status(404).json({ message: "No Data found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const newCustomer = async (req, res) => {
  const data = req.body;
  const customer = await customerByMobile(data.mobile);
  if (customer.length > 0) {
    res
      .status(403)
      .json({ message: "Customer is allredy exists", customer: customer });
  } else {
    try {
      const customer = await addNewCustomer(data);
      res.status(200).json({ customer: customer });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export { customerList, getCustomerData, customerMobile, newCustomer };
