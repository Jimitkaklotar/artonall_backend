
const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/Product');
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Get file extension
    const name = path.basename(file.originalname, ext); // Get the file name without extension
    const filename = `${name}-${uniqueSuffix}${ext}`; // Combine name, suffix, and extension
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })

router.post('/addproduct', upload.fields([
  { name: 'product_image_1', maxCount: 1 },
  { name: 'product_image_2', maxCount: 1 },
  { name: 'product_image_3', maxCount: 1 },
  { name: 'product_image_4', maxCount: 1 },
  { name: 'product_image_5', maxCount: 1 },
]), ProductController.addproduct);

router.get("/getproducts", ProductController.getAllProducts);
router.patch("/updateproduct", upload.fields([
  { name: 'product_image_1', maxCount: 1 },
  { name: 'product_image_2', maxCount: 1 },
  { name: 'product_image_3', maxCount: 1 },
  { name: 'product_image_4', maxCount: 1 },
  { name: 'product_image_5', maxCount: 1 },
]), ProductController.updateProduct);
router.delete("/deleteproduct", ProductController.deleteProduct);

module.exports = router;
