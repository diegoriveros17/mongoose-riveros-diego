import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/db_tlp_mongoose");
    console.log(`Conectado a la base de datos`);
  } catch (error) {
    console.log(`Error interno del servidor, error: ${error}`);
  }
};
