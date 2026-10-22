import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { userRouter } from "./src/routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

//configuracion de rutas
app.use("/api", userRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
