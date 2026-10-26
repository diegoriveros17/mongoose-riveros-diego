import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const insertUser = async (req, res) => {
  try {
    const { username, email, password, profile } = matchedData(req, {
      locations: ["body"],
    });

    // const { first_name, last_name, biography, birth_date } = profile;

    const newUser = await UserModel.create({
      username,
      email,
      password,
      profile,
    });

    return res.status(201).json({ message: `Usuario creado correctamente` });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deleted: { $ne: true } }).populate(
      "articles",
    );

    return res.status(200).json({
      msg: "Listado de usuarios obtenido correctamente",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const users = await UserModel.findById(id);

    return res.status(200).json({
      msg: "Usuario obtenido correctamente",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const data = matchedData(req, { locations: ["body"] });

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      message: "Usuario modificado",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    await UserModel.findByIdAndUpdate(id, { deleted: true });

    await ArticleModel.deleteMany({ author: id });

    return res.status(200).json({
      msg: "Usuario eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};
