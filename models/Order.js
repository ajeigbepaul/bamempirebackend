const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    
        userId: { type: String, required: true },
        orderNumber:{type:String},
        products: {type:Array,required:true},
        total: { type: Number, required: true },
        address: { type: Object},
        status: { type: String, default: "pending" },
      
    
},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema)