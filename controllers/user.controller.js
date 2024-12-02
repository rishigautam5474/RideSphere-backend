import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

const createNewUser = async (req, res) => {
  const body = req?.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.password
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Required all field" });
  }

  const user = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  return res
    .status(201)
    .json({ status: "success", message: "successfully created new user" });
};

const loginUser = async (req, res) => {
  const body = req?.body;

  if (!body || !body.email || !body.password) {
    return res
      .status(400)
      .json({ status: "error", message: "Required all fields" });
  }

  const user = await User.findOne({ email: body?.email });
  if (!user) {
    return res.status(400).json({ status: "error", message: "Invalid user" });
  }
  const isMatched = user.comparePassword(body.password);
  if (!isMatched) {
    return res.status(400).json({ status: "error", message: "Invalid user" });
  }

  const token = jwt.sign(
    { id: user._id, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_DAY }
  );

  return res
    .status(200)
    .json({
      status: "success",
      message: "User successfully login",
      token: token,
      userInfo: { id: user._id, name: [user.firstName, user.lastName].join(" ") },
    });
};

export { createNewUser, loginUser };
