import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .custom(async (username) => {
      const user = await UserModel.findOne({ where: { username } });
      if (user) {
        throw new Error("El nombre de usuario ya se encuentra en uso");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .custom(async (email) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        throw new Error("El correo electrónico ya se encuentra registrado");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  body("first_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras"),
  body("last_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo debe contener letras"),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isMongoId()
    .withMessage("El id debe no tiene el formato correcto")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .custom(async (username) => {
      const user = await UserModel.findOne({ where: { username } });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Debe proporcionar un formato de correo electrónico válido")
    .isLength({ max: 100 })
    .withMessage("El correo no puede superar los 100 caracteres")
    .custom(async (email) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        throw new Error("El correo electrónico ya está en uso");
      }
      return true;
    }),
  body("password").optional().trim(),
];

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
];
