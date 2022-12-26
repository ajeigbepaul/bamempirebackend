const Images = require("../models/Images");
const {
  verifyAuthorizationuser,
  verifyAuthorizationadmin,
  verifyToken,
} = require("./verifyToken");
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");


// CREATE OTHER IMAGES
router.post("/", verifyAuthorizationadmin, async (req, res) => {
  const {
    image
  } = req.body;
 
  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "paulimg_bamempire",
      });
      if (uploadedResponse) {
        const product = new Images({
          image: uploadedResponse,
        });
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
      
    }
  } catch (error) {
    res.status(500).json(error);
  }
    // const {images} = req.body

    // try {
    //   if(images){
    //     console.log(`images: ${images} ` )
    //   }
    //   let imagesA = [...images];
    //   let imagesBuffer = [];

    //   for (let i = 0; i < imagesA.length;  i++){
    //     const uploadedResponse = await cloudinary.uploader.upload(imagesA[i], {
    //       upload_preset: "paulimg_bamempire",
    //     });
    //     console.log(uploadedResponse)
    //     imagesBuffer.push({
    //       public_id: uploadedResponse.public_id,
    //       url: uploadedResponse.secure_url
    //     })

    //   }

    //   if(imagesBuffer){
    //     const imagesnew = new Images({
    //       images: imagesBuffer,
    //     });
    //     const savedImages = await imagesnew.save();
    //     res.status(200).send(savedImages);
    //   }

      //  req.body.images = imagesBuffer
      //  const newimages = await Images.create(req.body)
       
      // res.status(201).json({
      //     success: true,
      //     newimages
      // })
      
    // } catch (error) {
    //   res.status(500).json(error);
    // }
  });

  module.exports = router;