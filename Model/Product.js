const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_name: String,
  product_size: String,
  product_material: String,
  product_frame: String,
  product_description: String,
  product_instructions: String,
  product_stock: String,
  product_image_1: String,
  product_image_2: String,
  product_image_3: String,
  product_image_4: String,
  product_price: String,
  product_register_date_at: { type: Date, default: Date.now },
  product_action: {
    type: String,
    enum: ["active", "deactive"],
    default: "deactive",
  },
});

let Product = mongoose.model("Product", ProductSchema);
module.exports = Product;