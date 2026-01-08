import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.listen("/", () => {
  console.log(`Server is running at port ${PORT}`);
});


