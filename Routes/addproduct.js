const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../Models/data");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     let filename = new Date().getTime().toString(36); 
//     let extension = file.originalname.split(".").pop(); 
//     cb(null, `${filename}.${extension}`);
//   },
// });
// const upload = multer({ storage: storage });

router.get("/get-product", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/post-product", async (req, res) => {
    // const image = req.files ? req.files.map(file => file.path) : [];
    try {
      let data = new Product(req.body);
      let result = await data.save();
      res.send(result);
  } catch (error) {
      console.error("Error saving the product:", error);
      res.status(500).send({ message: "Failed to save the product", error });
  }
    // let data = new Product(req.body);
    // let result = await data.save();
    // res.send(result);
    // const newProduct = new Product({
    // product_id:req.body.product_id,
    // productname: req.body.productname,
    // category: req.body.category,
    // subcategory: req.body.subcategory,
    // quantity: req.body.quantity,
    // price: req.body.price,
    // date: req.body.date,
    // description: req.body.description,
    // address: req.body.address,
    // image:image,
    // sellerdetails: {
    //   seller_id: req.body.sellerdetails.seller_id,
    //   seller_name: req.body.sellerdetails.seller_name,
    //   seller_city: req.body.sellerdetails.seller_city,
    //   seller_contact_no: req.body.sellerdetails.seller_contact_no,
    //   seller_email: req.body.sellerdetails.seller_email,
    //   seller_language: req.body.sellerdetails.seller_language,
    //   seller_address: req.body.sellerdetails.seller_address,
    //   seller_occupation: req.body.sellerdetails.seller_occupation
    // }
  // });
  // try {
  //   let result = await newProduct.save();
  //   res.json(result);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
});
router.delete("/delete-product/:product_id", async (req, res) => {
  try {
    let data = await Product.deleteOne({ product_id: req.params.product_id });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put("/update-product/:product_id", async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ product_id: req.params.product_id });
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
  const updateData = {
    productname: req.body.productname || existingProduct.productname,
    category: req.body.category || existingProduct.category,
    subcategory: req.body.subcategory || existingProduct.subcategory,
    quantity: req.body.quantity || existingProduct.quantity,
    price: req.body.price || existingProduct.price,
    product_id : req.body.product_id||existingProduct.product_id,
    date: req.body.date || existingProduct.date,
    image : req.body.image||existingProduct.image,
    description: req.body.description || existingProduct.description,
    address: req.body.address || existingProduct.address,
    sellerdetails: req.body.sellerdetails ? {
      seller_id: req.body.sellerdetails.seller_id || existingProduct.sellerdetails.seller_id,
      seller_name: req.body.sellerdetails.seller_name || existingProduct.sellerdetails.seller_name,
      seller_city: req.body.sellerdetails.seller_city || existingProduct.sellerdetails.seller_city,
      seller_contact_no: req.body.sellerdetails.seller_contact_no || existingProduct.sellerdetails.seller_contact_no,
      seller_email: req.body.sellerdetails.seller_email || existingProduct.sellerdetails.seller_email,
      seller_language: req.body.sellerdetails.seller_language || existingProduct.sellerdetails.seller_language,
      seller_address: req.body.sellerdetails.seller_address || existingProduct.sellerdetails.seller_address,
      seller_occupation: req.body.sellerdetails.seller_occupation || existingProduct.sellerdetails.seller_occupation
    } : existingProduct.sellerdetails
  };
  const result = await Product.updateOne(
    { product_id: req.params.product_id },
    { $set: updateData }
  );

  const updatedProduct = await Product.findOne({ product_id: req.params.product_id });
  res.json(updatedProduct);
} catch (err) {
  console.error("Error updating product:", err);
  res.status(400).json({ error: err.message });
}
});
// router.get("/by-category/:category", async (req, res) => {
//   try {
//     const category = req.params.category;
//     const products = await Product.find({ category: category });
//     if (products.length === 0) {
//       return res.status(404).json({ message: "No products found in this category" });
//     }
//     res.json(products);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
  // try {
  //   let data = await Product.updateOne(
  //     { product_id: req.params.product_id },
  //     { $set: updateData }
  //   );
  //   // const updatedProduct = await Product.findOne({ product_id: req.params.product_id });
  //   res.json(updatedProduct);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
router.get("/by-category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
