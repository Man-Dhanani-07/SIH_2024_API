const mongoose = require("mongoose");
  const dataSchema = new mongoose.Schema({
      image: [{
          type: String,
          required: true
          }],
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
    sellerdetails:{
      seller_id: {
        type: String,
        required: true,
      },   
      seller_name: {
        type: String,
        required: true,
      },   
      seller_city: {
        type: String,
        required: true,
      },   
      seller_contact_no: {
        type: String,
        required: true,
      },   
      seller_email: {
        type: String,
        required: false,
      },   
      seller_language: {
        type: String,
        required: true,
      },   
      seller_address: {
        type: String,
        required: true,
      },   
      seller_occupation: {
        type: String,
        required: true,
      }
  }
  });
const dataModel = mongoose.model("data", dataSchema);
module.exports = dataModel;