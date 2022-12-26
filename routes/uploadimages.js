const Images = require("../models/Images");
const {
  verifyAuthorizationuser,
  verifyAuthorizationadmin,
} = require("./verifyToken");
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");

// POST
router.post('/add', verifyAuthorizationadmin, async(req, res, next) => {
    try {
      
        let images = [...req.body.images];
        let imagesBuffer = [];

        for (let i =0; i < images.length;  i++){
              const result = await cloudinary.uploader.upload(images[i], {
              folder: "bamempire",
              
        });

          imagesBuffer.push({
            public_id: result.public_id,
            url: result.secure_url
          })

        }

         req.body.images = imagesBuffer
         const banner = await Images.create(req.body)
         
        res.status(201).json({
            success: true,
            banner
        })
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


  // DELETE OTHER PRODUCT IMAGES
router.delete("/:id", verifyAuthorizationadmin, async (req, res) => {
  try {
    await Images.findByIdAndDelete(req.params.id);
    res.status(200).json("other product images has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});
  module.exports = router;