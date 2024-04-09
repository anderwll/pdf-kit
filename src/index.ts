import express from "express";
import cors from "cors";
import "dotenv/config";
import { doc } from "./pdf";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({ success: true, message: "API is up! Example jsPDF" });
});

doc.save();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
