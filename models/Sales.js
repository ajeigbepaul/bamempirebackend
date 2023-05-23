const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderNumber: { type: String, required: true },
    products: { type: Array, required: true },
    total: { type: Number, required: true },
    address: { type: Object, required: true },
    // status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);
