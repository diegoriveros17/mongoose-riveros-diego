import { UserModel } from "../models/user.model.js";

export const insertUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await UserModel.findOne(
      { username: username },
      { email: email },
    );

    if (userExist) {
      return res.status(409).json({
        msg: `El nombre de usuario o email ya se encuentra en uso`,
      });
    }

    const newUser = await UserModel.create({
      username,
      email,
      password,
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
    const users = await UserModel.find();

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
    const { id } = req.params;

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
    const userData = req.body;

    const { id } = req.params;

    const userExist = await UserModel.findById(id);

    if (!userExist) {
      return res
        .status(404)
        .json({ msg: "El usuario que intenta modificar no existe" });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true },
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
    const { id } = req.params;

    const userExist = await UserModel.findById(id);

    if (!userExist) {
      return res.status(404).json({
        message: "El usuario que intenta eliminar no existe",
      });
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Usuario eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};
