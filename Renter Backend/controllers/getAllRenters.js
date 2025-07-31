import rentalRequestModel from "../models/rentalRequestModel.js";

// Get All Products
export const getAllRenters = async (req, res) => {
  try {
    const products = await rentalRequestModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
