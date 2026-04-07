/*
    Campos:
        idEmployee
        idProducts
        rating
        comment
*/

import mongoose, { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
  {
    idEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
    },
    idProducts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    rating: {
      type: Number, // Trae enteros y double
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true, // Guardar el momento exacto en el que se guardo y cuantas versiones tiene
    strict: false, // Para lograr agregar campos nuevos
  },
);

export default model("Reviews", reviewsSchema);
