import http from "http";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { getDonateRoute } from "./routes/donate";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT;
if (!port) throw new Error("Provide PORT variable in .env");
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) throw new Error("Provide MONGO_URI variable in .env");

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const server = http.createServer(app);
app.use(cors());
app.use(express.json());
server.on("listening", () => {
  console.info(`Donation server started on port ${port}`);
});
server.on("error", (err) => {
  console.error(err);
});

app.use("/donate", getDonateRoute());

server.listen(port);
