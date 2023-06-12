const Product = require("../models/Product");
const {
  verifyAuthorizationuser,
  verifyAuthorizationadmin,
  verifyToken,
} = require("./verifyToken");
const router = require("express").Router();


// UPDATE STATUS
// router.put("/:id", verifyAuthorizationadmin, async (req, res) => {
//     try {
//       const updatedorder = await Order.updateOne(
//         req.params.id,
//         { set: { status: req.body.status } },
//         { new: true }
//       );
//       res.status(200).json(updatedorder);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedProduct = req.body;

      // Logic to update the product status in the database
      // Example: Assuming you have a products collection in MongoDB
      await Product.findByIdAndUpdate(
        id,
        {
          instock: updatedOrder.instock,
        },
        { new: true }
      );

      res.status(200).json({ message: "Product status updated successfully", updatedProduct });
    } catch (error) {
      console.log("Error updating product status:", error);
      res.status(500).json({ message: "Error updating product status" });
    }
  });
 
  module.exports = router;