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
    productname: req.body.productname,
    category: req.body.category,
    subcategory: req.body.subcategory,
    quantity: req.body.quantity,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    address: req.body.address,
    image:image
  });
  try {
    let result = await newProduct.save();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete("/delete-product/:_id", async (req, res) => {
  try {
    let data = await Product.deleteOne({ _id: req.params._id });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put("/update-product/:_id", upload.any(), async (req, res) => {
  const updateData = {
    productname: req.body.productname,
    category: req.body.category,
    subcategory: req.body.subcategory,
    quantity: req.body.quantity,
    price: req.body.price,
    date: req.body.date,
    description: req.body.description,
    address: req.body.address,
  };
   if (req.files && req.files.length > 0) {
    updateData.image = req.files.map(file => file.path);
  }
  try {
    let data = await Product.updateOne(
      { _id: req.params._id },
      { $set: updateData }
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
