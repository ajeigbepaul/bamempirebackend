const Sales = require("../models/Sales");
const roles_list = require("../utils/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJwt = require("../middleware/verifyJwt");
const router = require("express").Router();

// CREATE ORDER
router.post("/", verifyJwt, verifyRoles(roles_list.user), async (req, res) => {
  const newsales = new Sales(req.body);
  try {
    const savesales = await newsales.save();
    res.status(201).json(savesales);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL SALES
router.get("/", verifyJwt, verifyRoles(roles_list.admin), async (req, res) => {
  try {
    const allsales = await Sales.find().sort({ _id: -1 });

    res.status(200).json(allsales);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MONTHLY INCOME
router.get(
  "/income",
  verifyJwt,
  verifyRoles(roles_list.admin),
  async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Sales.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports= router