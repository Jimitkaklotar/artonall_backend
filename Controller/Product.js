const Product = require("../Model/Product");

const mongoose = require("mongoose");

const encodePath = (filePath) => encodeURIComponent(filePath);

exports.addproduct = async function (req, res) {
  try {
    const {
      product_name,
      product_size,
      product_material,
      product_frame,
      product_description,
      product_instructions,
      product_stock,
      product_price,
      product_action,
    } = req.body;

    // Check if all required fields are present
    if (
      !product_name ||
      !product_size ||
      !product_material ||
      !product_frame ||
      !product_description ||
      !product_instructions ||
      !product_stock ||
      !req.files.product_image_1 ||
      !req.files.product_image_2 ||
      !req.files.product_image_3 ||
      !req.files.product_image_4 ||
      !product_price ||
      !product_action
    ) {
      throw new Error("Please Enter your Fields");
    }

    // Create a new product object
    const newProduct = {
      product_name,
      product_size,
      product_material,
      product_frame,
      product_description,
      product_instructions,
      product_stock,
      product_image_1: encodePath(req.files.product_image_1[0].filename),
      product_image_2: encodePath(req.files.product_image_2[0].filename),
      product_image_3: encodePath(req.files.product_image_3[0].filename),
      product_image_4: encodePath(req.files.product_image_4[0].filename),
      product_price,
      product_action,
    };

    // Save the product to the database
    let ProductCreate = await Product.create(newProduct);
    res.status(201).json({
      status: "Success",
      message: "Product Add Successfully",
      data: ProductCreate,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getProduct = async function (req, res) {
  try {
    const { product_id } = req.body;

    // Validate ID
    if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid or missing product ID",
      });
    }

    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(404).json({
        status: "Fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.GetAllProducts = async function (req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: "Success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.updateProduct = async function (req, res) {
  try {
    const { id } = req.body;
    let updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid product ID",
      });
    }

    if (req.files) {
      if (req.files.product_image_1) {
        updateData.product_image_1 = encodePath(req.files.product_image_1[0].filename);
      }
      if (req.files.product_image_2) {
        updateData.product_image_2 = encodePath(req.files.product_image_2[0].filename);
      }
      if (req.files.product_image_3) {
        updateData.product_image_3 = encodePath(req.files.product_image_3[0].filename);
      }
      if (req.files.product_image_4) {
        updateData.product_image_4 = encodePath(req.files.product_image_4[0].filename);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      status: "Success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    const { id } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Fail",
        message: "Invalid product ID",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

