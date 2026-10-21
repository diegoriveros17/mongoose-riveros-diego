import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/config.js";
import { UserModel } from "./src/models/user.model.js";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
