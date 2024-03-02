import { getCustomer } from "../../db/customer/customerQuery.js";

const getCustomerData = async (req, res) => {
  console.log(req.body);
  let customerId = req.body.id;
  try {
    const customer = await getCustomer(customerId);
    res.status(200).json({ customer: customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getCustomerData };
