const express = require("express");
const mongoose = require("mongoose");
// const request = require('request');
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const payRoute = require("./routes/paystack");
const statusRoute = require("./routes/status");

// APP CONNECTION
const app = express();

// DB CONNECTION
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
// MIDDLEWARE
app.use(morgan("tiny"));
app.use("/images", express.static(path.join(__dirname, "public")));
app.use(
  express.json({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(cors());
// TEST ROUTE
app.get("/",(req,res)=>{res.send("working fine")})
// ROUTES
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/payments", payRoute);
app.use("/status", statusRoute);

// LISTEN
connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("server running, listening for requests");
  });
});

// app.listen(process.env.PORT || 8000, () => {
//   console.log("server running");
// });
