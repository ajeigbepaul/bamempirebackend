const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    image:{type:Object,required:true},
    categories:{type:String,required:true},
    colors:{type:String,required:true},
    size:{type:String},
    price:{type:Number,required:true},
    instock:{type:String, required:true},
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)