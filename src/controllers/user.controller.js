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
        message: `El nombre de usuario o email ya se encuentra en uso`,
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
      message: `Error interno del servidor ${error}`,
    });
  }
};
