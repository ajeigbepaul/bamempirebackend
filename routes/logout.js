const { User } = require("../models/User");
const router = require("express").Router();
router.get("/", async(req, res) => {
  // const cookies = req.cookies;
  // if (!cookies?.jwt) return res.sendStatus(204);
  // const refreshToken = cookies.jwt;

//   IS REFRESH TOKEN IN DB
// const user = await User.findOne({refreshToken}).exec();
// if(!user){
//     res.clearCookie("jwt", { httpOnly: true, sameSite:'None', secure:true });
//     return res.sendStatus(204);
// }
// delete refresh token in db
// user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
// user.refreshToken = '';
// const result = await user.save()
// console.log(result)

// res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
// return res.sendStatus(204);
});

router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
      return res.status(401).send({ message: "User not logged in" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userEmail = decoded.email;

    // Find the user by email and remove the refresh token
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { refreshToken: null }
    );

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Clear the refresh token cookie
    res.clearCookie("jwt");

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
