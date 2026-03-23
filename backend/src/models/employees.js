/*
    Campos:
        name
        lastName
        salary
        DUI
        phone
        email
        password
        idBranches
        
*/

import mongoose, { Schema, model } from "mongoose";

const employeesSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  salary: {
    type: Number, // Trae enteros y double
  },
  DUI: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  idBranches: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branches"
  },
}, {
    timestamps: true, // Guardar el moemtno exacto en el que se guardo y cuantas versiones tiene 
    strict: false // Para lograr agregar campos nuevos
});

export default model("Employees", employeesSchema);