const express = require("express");
const router = express.Router();
const Product = require("../Models/data")
router.get("/get-product", async (req, res) => {
    const data = await Product.find();
    res.json({ data });
});
router.post("/post-product", async (req, res) => {
    let data = new Product(req.body);
    let result = await data.save();
    res.send(result);
});
router.delete("/delete-product/:_id", async (req, resp) => {
    let data = await Product.deleteOne({_id:req.params._id});
    resp.send(data);
});
router.put("/update-product/:_id", async (req, resp) => {
    // let data = await Product.updateOne(req.params._id);
    let data = await Product.updateOne(
        { _id: req.params._id },
        {
            $set: { productname: req.body.productname,
            image : req.body.image,
            category : req.body.category,
            price:req.body.price,
            subcategory:req.body.subcategory,
            quantity:req.body.quantity,
            date:req.body.date,
            description:req.body.description,
            address:req.body.address
            },
        }
        );
    resp.send(data);
});
module.exports = router;
