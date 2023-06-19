const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderNumber: { type: String, required: true, unique: true },
    products: { type: Array, required: true },
    total: { type: Number, required: true },
    address: { type: Object },
    customize: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
OrderSchema.virtual("orderId").get(function () {
  return this.orderNumber;
});

module.exports = mongoose.model("Order",OrderSchema)