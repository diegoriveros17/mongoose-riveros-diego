import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
