const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  images: [
    {
        image: {
            type: String,
            required: true,
          }
    },
  ],
  productname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const dataModel = mongoose.model("data", dataSchema);

module.exports = dataModel;
