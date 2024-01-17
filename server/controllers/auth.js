import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "working");
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ status: "FAILED", message: "User does't exist!" });

    if (!password)
      return res.json({ status: "FAILED", message: "Password not provided!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ status: "FAILED", message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    console.log(user, token);
    return res.status(200).json({ status: "SUCCESS", token, user });
  } catch (err) {
    return res.json({ status: "FAILED", message: err.message });
  }
};

// user register
const userRegister = async (req, res) => {
  const { name, email, password, imageUrl } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      imageUrl: imageUrl !== "" ? imageUrl : "",
      verified: false,
    });

    const response = await newUser.save();
    res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { userLogin, userRegister };
