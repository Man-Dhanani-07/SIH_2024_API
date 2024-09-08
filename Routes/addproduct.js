const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../Models/data");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    let filename = new Date().getTime().toString(36); 
    let extension = file.originalname.split(".").pop(); 
    cb(null, `${filename}.${extension}`);
  },
});
const upload = multer({ storage: storage });

router.get("/get-product", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/post-product", upload.any(), async (req, res) => {
    const image = req.files ? req.files.map(file => file.path) : [];
    const newProduct = new Product({
    product_id:req.body.product_id,
    productname: req.body.productname,
    category: req.body.category,
    subcategory: req.body.subcategory,
    quantity: req.body.quantity,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    address: req.body.address,
    image:image,
    sellerdetails: {
      seller_id: req.body.sellerdetails.seller_id,
      seller_name: req.body.sellerdetails.seller_name,
      seller_city: req.body.sellerdetails.seller_city,
      seller_contact_no: req.body.sellerdetails.seller_contact_no,
      seller_email: req.body.sellerdetails.seller_email,
      seller_language: req.body.sellerdetails.seller_language,
      seller_address: req.body.sellerdetails.seller_address,
      seller_occupation: req.body.sellerdetails.seller_occupation
    }
  });
  try {
    let result = await newProduct.save();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete("/delete-product/:product_id", async (req, res) => {
  try {
    let data = await Product.deleteOne({ product_id: req.params.product_id });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put("/update-product/:product_id", upload.any(), async (req, res) => {
  const updateData = {
    product_id:req.body.product_id,
    productname: req.body.productname,
    category: req.body.category,
    subcategory: req.body.subcategory,
    quantity: req.body.quantity,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    address: req.body.address,
    sellerdetails: {
      seller_id: req.body.sellerdetails.seller_id,
      seller_name: req.body.sellerdetails.seller_name,
      seller_city: req.body.sellerdetails.seller_city,
      seller_contact_no: req.body.sellerdetails.seller_contact_no,
      seller_email: req.body.sellerdetails.seller_email,
      seller_language: req.body.sellerdetails.seller_language,
      seller_address: req.body.sellerdetails.seller_address,
      seller_occupation: req.body.sellerdetails.seller_occupation
    }
  };
if (req.files && req.files.length > 0) {
    updateData.image = req.files.map(file => file.path);
  }
  try {
    let data = await Product.updateOne(
      { product_id: req.params.product_id },
      { $set: updateData }
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
