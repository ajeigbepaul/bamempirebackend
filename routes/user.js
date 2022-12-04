const User = require("../models/User");
const {
  verifyAuthorizationuser,
  verifyAuthorizationadmin,
} = require("./verifyToken");
const router = require("express").Router();

// UPDATE USER

router.put("/:id", verifyAuthorizationuser, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSKEY
    ).toString();
  }
  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyAuthorizationuser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER
router.get("/find/:id", verifyAuthorizationadmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USER
router.get("/", verifyAuthorizationadmin, async (req, res) => {
  const query = req.query.new;
  // : await User.find()
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET USER STATS
router.get("/stats", verifyAuthorizationadmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear }, }, },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
