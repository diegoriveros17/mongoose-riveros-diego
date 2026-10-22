import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { ArticleModel } from "./src/models/article.model.js";
import { userRouter } from "./src/routes/user.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

//configuracion de rutas
app.use("/api", userRouter);
app.use("/api", articleRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
