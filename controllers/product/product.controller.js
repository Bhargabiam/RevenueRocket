import {
  product,
  productsList,
  newProduct,
  deleteProductQuery,
} from "../../db/product/productQuery.js";

const getProduct = async (req, res) => {
  const productId = req.query.productId;
  try {
    const result = await product(productId);
    res.status(200).json({ product: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const productList = async (req, res) => {
  try {
    const result = await productsList();
    res.status(200).json({ List: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  const formData = req.body;
  try {
    const result = await newProduct(formData);
    res.status(200).json({ New_Product: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.query.productId;
  try {
    const result = await deleteProductQuery(productId);
    res.status(200).json({ product: result[0].product_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getProduct, productList, createProduct, deleteProduct };
