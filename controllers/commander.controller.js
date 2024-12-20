import BlacklistedToken from "../model/blacklistingToken.model.js";
import Commander from "../model/commander.model.js";
import jwt from "jsonwebtoken";

const createCommander = async (req, res) => {
  // console.log(req?.body)
  try {
    const { firstName, lastName, email, password, status, vehicleDetails } =
      req?.body;
    const { plateNumber, color, capacity, vehicleType } = vehicleDetails;
    //   console.log(vehicleDetails, "body++++++++++++++++++++");
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !status ||
      !vehicleDetails?.plateNumber ||
      !vehicleDetails?.color ||
      !vehicleDetails?.capacity ||
      !vehicleDetails?.vehicleType
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All field are required" });
    }

    const isCommanderAlreadyExist = await Commander.findOne({ email });
    if (isCommanderAlreadyExist) {
      return res
        .status(400)
        .json({ status: "error", message: "Commander already exist" });
    }
    const commander = await Commander.create({
      firstName,
      lastName,
      email,
      password,
      status,
      vehicleDetails: { plateNumber, color, capacity, vehicleType },
    });

    return res.status(201).json({
      status: "success",
      message: "New commander create",
      commander: commander,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const loginCommander = async (req, res) => {
  const { email, password } = req?.body;
  //   console.log(email)
  //   console.log(password)
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  // Find commander by email
  const commander = await Commander.findOne({ email });
  if (!commander) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid email and password" });
  }
  const isMatched = await commander.comparePassword(password);
  if (!isMatched) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid email and password" });
  }

  const token = jwt.sign(
    {
      id: commander._id,
      firstName: commander.firstName,
      lastName: commander.lastName,
      role: commander.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_DAY || "24h" }
  );
  //   console.log(token);

  res.cookie("token", token);

  return res.status(200).json({
    status: "success",
    message: "Commander login successfully",
    token,
    commanderInfo: {
      id: commander._id,
      name: `${[commander.firstName, commander.lastName].join(" ")}`,
    },
  });
};

const getAllCommander = async (req, res) => {
  const commander = await Commander.find({});
  if (!commander) {
    return res
      .status(400)
      .json({ status: "error", message: "Commander not found" });
  }
  return res.status(200).json({
    status: "success",
    message: "All user access",
    commanders: commander,
  });
};

const logoutCommander = async (req, res) => {
  try{
  // const commander = await Commander.
  const headers = req?.headers?.["authorization"];
  const token = req?.cookies?.token || req?.headers?.split(" ")[1];
  // console.log(token, "+++++++++++");
  await BlacklistedToken.create({ token });
  
  res.clearCookie("token");

  return res
    .status(200)
    .json({ status: "success", message: "Commander logout successfully" });
  }
  catch(error) {
    return res.status(500).json({status: "error", message: "Server error"})
  }
};

export { createCommander, loginCommander, getAllCommander, logoutCommander };
