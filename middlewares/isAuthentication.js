import jwt from "jsonwebtoken";
import BlacklistedToken from "../model/blacklistingToken.model.js";
import Commander from "../model/commander.model.js";

const IsAuthUser = async (req, res, next) => {
  const headers = req?.headers["authorization"];
  const token = req?.cookies?.token || headers?.split(" ")[1];
  // const token = headers?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", message: "Unauthorized user" });
  }

  const isBlacklistedUser = await BlacklistedToken.findOne({ token: token });

  if (isBlacklistedUser) {
    return res.status(401).json({
      status: "error",
      message: "Token is blacklisted. Please log in again.",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode.id;

    if(decode.role !== "USER") {
      return res.status(403).json({status: "Error", message: "Unauthorized"})
  }

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

const IsAuthCommander = async (req, res, next) => {
  const headers = req?.headers["authorization"];
  const token = req?.cookies?.token || headers?.split(" ")[1];
  // const token = headers?.split(" ")[1];
  // console.log(token, "----------------");
  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", message: "Unauthorized user" });
  }

  const isBlacklisted = await BlacklistedToken.findOne({ token: token });
  
  if (isBlacklisted) {
    // console.log(isBlacklisted)
    return res.status(401).json({
      status: "error",
      message: "Token is blacklisted. Please log in again.",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const commander = await Commander.findOne(decode._id);
    req.commander = commander;

    if(decode.role !== "COMMANDER") {
      return res.status(403).json({status: "Error", message: "Unauthorized"})
  }

    return next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

export { IsAuthUser, IsAuthCommander };
