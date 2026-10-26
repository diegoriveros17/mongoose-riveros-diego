import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const validateTagId = [
  param("id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const tag = await TagModel.findById(id);
      if (!tag) {
        throw new Error("La etiqueta especificada no existe");
      }
      return true;
    }),
];

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength()
    .withMessage("El nombre de la etiqueta debe tener entre 2 y 30 caracteres")
    .custom(async (name) => {
      const tag = await TagModel.findOne({ name });
      if (tag) {
        throw new Error("Ya existe una etiqueta con este nombre");
      }
      return true;
    }),
];

export const updateTagValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta no puede estar vacío")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener entre 2 y 30 caracteres")
    .custom(async (name) => {
      const tag = await TagModel.findOne({ name });
      if (tag) {
        throw new Error("Ya existe una etiqueta con este nombre");
      }
      return true;
    }),
];
