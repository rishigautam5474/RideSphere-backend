import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors"
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Welcome Ridesphere")
})

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`)
})