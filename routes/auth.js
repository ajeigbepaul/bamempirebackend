const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSKEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(data);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Username");
    const passwordhashed = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSKEY
    );
    const OriginalPassword = passwordhashed.toString(CryptoJS.enc.Utf8);

    const accessToken = jwt.sign({
        id:user._id, isadmin:user.isadmin
    }, process.env.JWT_SECRET_KEY,{expiresIn:"3d"})

    OriginalPassword != req.body.password && res.status(401).json("Wrong Password");
    const {password,...others} = user._doc;
    res.status(200).json({...others,accessToken});
  } catch (error) {
    // res.status(500).json(error);
   console.log(error);

  }
});


// LOGIN
router.post("/adminlogin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Username");
    const passwordhashed = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSKEY
    );
    const OriginalPassword = passwordhashed.toString(CryptoJS.enc.Utf8);

    const accessToken = jwt.sign({
        id:user._id, isadmin:user.isadmin
    }, process.env.JWT_SECRET_KEY,{expiresIn:"3d"})

    OriginalPassword != req.body.password && res.status(401).json("Wrong Password");
    const {password,...others} = user._doc;
    res.status(200).json({...others,accessToken});
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
