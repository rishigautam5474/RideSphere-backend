import BlacklistedToken from "../model/blacklistingToken.model.js";
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

// const loginUser = async (req, res) => {
//   const body = req?.body;

//   if (!body || !body.email || !body.password) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "All fields are required" });
//   }

//   const user = await User.findOne({ email: body.email });
//   if (!user) {
//     return res
//       .status(401)
//       .json({ status: "error", message: "Invalid email and password" });
//   }
//   const isMatched = user.comparePassword(body.password);
//   if (!isMatched) {
//     return res
//       .status(401)
//       .json({ status: "error", message: "Invalid  email and password" });
//   }

//   const token = jwt.sign(
//     { id: user._id, firstName: user.firstName, lastName: user.lastName },
//     process.env.JWT_SECRET_KEY,
//     { expiresIn: process.env.EXPIRE_DAY }
//   );

//   return res.status(200).json({
//     status: "success",
//     message: "User successfully login",
//     token: token,
//     userInfo: { id: user._id, name: [user.firstName, user.lastName].join(" ") },
//   });
// };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password", // Keep error generic for security reasons
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password", // Same generic message
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.EXPIRE_DAY || "1d" } // Default to 1 day if not set
    );

    res.cookie("token", token);
    // Return success response
    return res.status(200).json({
      status: "success",
      message: "User successfully logged in",
      token,
      userInfo: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.find();
  // if(!user) {
  //   return res.status(404).json({ status: "error", message: "User not found" });
  // }w

  if (user.length === 0) {
    return res
      .status(200)
      .json({ status: "success", message: "No user found" });
  }

  return res.status(200).json({ status: "success", users: user });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  const headers = req?.headers?.["authorization"];
  const token = req?.cookies?.token || req?.headers?.split(" ")[1];
  await BlacklistedToken.create({ token });

  return res.status(200).json({status: "success", message: "User logout successfully"})
};

export { createNewUser, loginUser, getUserProfile, logoutUser };
