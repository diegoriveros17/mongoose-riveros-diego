import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_HOST}${process.env.DB_NAME}`);
    console.log(`Conectado a la base de datos`);
  } catch (error) {
    console.log(`Error interno del servidor, error: ${error}`);
  }
};
