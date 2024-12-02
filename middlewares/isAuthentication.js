import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const IsAuthentication = async (req, res, next) => {
  const headers = req?.headers["authorization"];
  const token = req?.cookies?.token || headers?.split(" ")[1];
  // const token = headers?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", message: "Unauthorized user" });
  }

  const isBlacklisted = await User.findOne({token: token})

  if(isBlacklisted) {
    return res.status(401).json({status: "error", message: "Unauthorized user"})
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode.id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

export default IsAuthentication;
