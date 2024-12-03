import jwt from "jsonwebtoken";
import Commander from "../model/commander.model.js";

const IsAuthCommander = async (req, res, next) => {
  const headers = req?.headers["authorization"];
  const token = req?.cookies?.token || headers?.split(" ")[1];
  // const token = headers?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", message: "Unauthorized user" });
  }

  const isBlacklistedCommander = await Commander.findOne({token: token})

  if(isBlacklistedCommander) {
    return res.status(401).json({status: "error", message: "Token is blacklisted. Please log in again."})
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.Commander = decode.id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

export default IsAuthCommander;
