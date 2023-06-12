const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    // title:{type:String,required:true},
    productId: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Object, required: true },
    categories: { type: String, required: true },
    colors: { type: Array },
    size: { type: String},
    selectedSizes:{type:Array},
    price: { type: Number, required: true },
    // discount:{type:Number},
    availableqty:{type:Number},
    moq: { type: String, required: true },
    instock: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product",ProductSchema)