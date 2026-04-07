/*
    Campos:
        name
        address
        schedule
        isActive
*/

import { Schema, model } from "mongoose";

const branchesSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  schedule: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
}, {
    timestamps: true, // Guardar el momento exacto en el que se guardo y cuantas versiones tiene 
    strict: false // Para lograr agregar campos nuevos
});

export default model("Branches", branchesSchema);