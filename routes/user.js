const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
      return res.status(400).sendStatus({ message: "no users found" });
    }
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
// Register or Create
router.post("/", async (req, res) => {
  try {
    // Confirms the data
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    // Checks for duplicate
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exist" });
    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
// Update User
router.put("/update", async (req, res) => {
  const { id, firstname, lastname, username, roles, active, email, password } = req.body;
  if (
    !id ||
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !roles ||
    //   !Array.isArray(roles) ||
    //   !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.sendStatus(400).send({ message: "All fields are required" });
  }
  const user = await User.findById(id).exec();
  if (!user) return res.status(400).send({ message: "User not found" });
  // check for duplicate
  const duplicate = await User.findOne({ email });
  if (duplicate)
    return res
      .status(409)
      .send({ message: "User with given email already exist" });

  user.firstname = firstname;
  user.lastname = lastname;
  user.username = username;
  user.email = email;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  res.send({ message: `${updatedUser.email} updated` });
});

// UPDATE PASSWORD...
router.put("/update-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email (replace this with your own database query)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database (replace this with your own database update)
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;