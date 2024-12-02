import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js";
import userRouter from "./routes/user.route.js"
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
app.use('/api/users', userRouter)

app.get("/", (req, res) => {
  res.send("Welcome Ridesphere");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
