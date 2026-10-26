import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new Error("El nombre de usuario ya se encuentra en uso");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .bail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("El correo electrónico ya se encuentra registrado");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  body("profile.first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras")
    .bail(),
  body("profile.last_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo debe contener letras"),
  body("profile.biography")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),
  body("profile.birth_date").optional(),
  // .isISO8601()
  // .withMessage("La fecha de nacimiento no es válida (AAAA-MM-DD)"),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .bail()
    .isMongoId()
    .withMessage("El id debe no tiene el formato correcto")
    .bail()
    .custom(async (id) => {
      const user = await UserModel.findOne({ _id: id, deleted: { $ne: true } });
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
  body("username")
    .optional()
    .trim()
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
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
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("El correo electrónico ya está en uso");
      }
      return true;
    }),
  body("password").optional().trim(),
  body("profile.first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras")
    .bail(),
  body("profile.last_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo debe contener letras"),
  body("profile.biography")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),
  body("profile.birth_date").optional(),
  // .isISO8601()
  // .withMessage("La fecha de nacimiento no es válida (AAAA-MM-DD)"),
];

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const user = await UserModel.findOne({
        _id: id,
        deleted: { $ne: true },
      });
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
];
