import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

//Database connection

await connectDB();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Live");
});



app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
