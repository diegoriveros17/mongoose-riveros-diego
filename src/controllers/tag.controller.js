import { TagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";

export const createTag = async (req, res) => {
  try {
    const { name } = matchedData(req, { locations: ["body"] });

    const tag = await TagModel.create({ name });

    return res.status(201).json({
      msg: "Etiqueta creada exitosamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();

    return res.status(200).json({
      msg: "Listado de etiquetas obtenido exitosamente",
      tags,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const tag = await TagModel.findById(id);

    if (!tag) {
      return res.status(404).json({
        msg: "La etiqueta solicitada no existe",
      });
    }

    return res.status(200).json({
      msg: "Etiqueta obtenida exitosamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const data = matchedData(req, { locations: ["body"] });

    const tag = await TagModel.findById(id);
    if (!tag) {
      return res.status(404).json({
        msg: "La etiqueta que intenta actualizar no existe",
      });
    }

    const updatedTag = await TagModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      msg: "Etiqueta actualizada exitosamente",
      tag: updatedTag,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const tag = await TagModel.findById(id);
    if (!tag) {
      return res.status(404).json({
        msg: "La etiqueta que intenta eliminar no existe",
      });
    }

    const deletedTag = await TagModel.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Etiqueta eliminada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor: ${error}`,
    });
  }
};
