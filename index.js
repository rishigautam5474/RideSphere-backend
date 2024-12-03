import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.route.js"
import commanderRoutes from "./routes/commander.route.js"
import cookieParser from "cookie-parser"
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Connection MongoDb
connectToDb(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// PORT
const PORT = process.env.PORT || 3000;

// All Router
app.use('/api/admin/users', userRoutes)
app.use('/api/admin/commanders', commanderRoutes)

app.get("/", (req, res) => {
  res.send("Welcome Ridesphere");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
