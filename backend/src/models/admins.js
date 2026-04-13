/*
    Campos:
        name
        email
        password
        isVerified
*/

import { Schema, model } from "mongoose";

const adminsSchema = new Schema({
   name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
}, {
    timestamps: true, // Guardar el momento exacto en el que se guardo y cuantas versiones tiene 
    strict: false // Para lograr agregar campos nuevos
});

export default model("Admins", adminsSchema);